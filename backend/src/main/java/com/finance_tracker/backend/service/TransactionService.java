package com.finance_tracker.backend.service;

import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.finance_tracker.backend.dto.CreateTransactionDateDto;
import com.finance_tracker.backend.dto.CreateTransactionDto;
import com.finance_tracker.backend.dto.ReadTransactionDto;
import com.finance_tracker.backend.model.Transaction;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.repository.TransactionRepository;
import com.finance_tracker.backend.response.StatusResponse;
import com.finance_tracker.backend.utils.CategoryCount;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

import jakarta.persistence.EntityManager;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ModelMapper modelMapper;
    private final CategoryService categoryService;
    private final PaymentPartnerService partnerService;
    private final EntityManager entityManager;

    public TransactionService(TransactionRepository transactionRepository, 
                                ModelMapper modelMapper,
                                CategoryService categoryService,
                                PaymentPartnerService partnerService,
                                EntityManager entityManager) {
        this.transactionRepository = transactionRepository;
        this.modelMapper = modelMapper;
        this.categoryService = categoryService;
        this.partnerService = partnerService;
        this.entityManager = entityManager;
    }

    public Transaction getTransaction(Integer id, User user) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow();
        if(Objects.equals(transaction.getUser().getId(), user.getId())){
            return transaction;
        }
        return null;
    }

    public ReadTransactionDto getTransactionDto(Integer id, User user) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow();
        if(Objects.equals(transaction.getUser().getId(), user.getId())){
            ReadTransactionDto readTransactionDto = modelMapper.map(transaction, ReadTransactionDto.class);
            return readTransactionDto;
        }
        return null;
    } 

    public ReadTransactionDto createTransaction(CreateTransactionDto createTransaction, User user) {
        Integer tempCategoryId = createTransaction.getCategoryId();
        createTransaction.setCategoryId(null);
        Transaction createTransactionMapped = modelMapper.map(createTransaction, Transaction.class);
        createTransactionMapped.setUser(user);
        if(tempCategoryId != null) {//createTransaction.getCategoryId() != null){
            createTransactionMapped.setCategory(categoryService.getCategory(tempCategoryId, user));
        }
        
        if(createTransaction.getPaymentPartnerId() != null){
            createTransactionMapped.setPaymentPartner(partnerService.getPaymentPartner(createTransaction.getPaymentPartnerId(), user));
        }
        Transaction savedTransaction = this.saveTransaction(createTransactionMapped);
        ReadTransactionDto readTransactionDto = modelMapper.map(savedTransaction, ReadTransactionDto.class);
        
        return readTransactionDto;
    }

    public Transaction saveTransaction(Transaction transaction) {
        Transaction savedTransaction = transactionRepository.save(transaction);
        return savedTransaction;
    }

    public List<ReadTransactionDto> getTransactionsFromUser(User user) {
        List<Transaction> transactions = transactionRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        List<ReadTransactionDto> readTransactionDtos = transactions.stream()
                .map(t -> modelMapper.map(t, ReadTransactionDto.class)).toList();

        return readTransactionDtos;
    }

    public ReadTransactionDto updateTransaction(Integer transactionId, CreateTransactionDto createTransactionDto, User user) {
        Transaction oldTransaction = this.getTransaction(transactionId, user);
        BeanUtils.copyProperties(createTransactionDto, oldTransaction);
        Transaction transactionMapped = modelMapper.map(oldTransaction, Transaction.class);
        Transaction updatedTransaction = this.saveTransaction(transactionMapped);
        ReadTransactionDto readUpdatedTransactionDto = modelMapper.map(updatedTransaction, ReadTransactionDto.class);
        return readUpdatedTransactionDto;
    }

    public StatusResponse deleteTransaction(User user, Integer id){
        transactionRepository.deleteById(id);
        return new StatusResponse(StatusResponse.Status.SUCCESS, "Deleted transaction with id: " + id);
    }

    public List<ReadTransactionDto> uploadTransactionFile(MultipartFile file, User user) {
        try {
            CsvToBean<CreateTransactionDto> csvToBean = new CsvToBeanBuilder<CreateTransactionDto>(
                    new InputStreamReader(file.getInputStream()))
                    .withType(CreateTransactionDto.class)
                    .withIgnoreLeadingWhiteSpace(true)
                    .withSeparator(';')
                    .build();
            
            List<CreateTransactionDto> uploadTransactions = csvToBean.parse();
            List<ReadTransactionDto> transactions = new ArrayList<>();
            for (int i = 0; i < uploadTransactions.size(); i++) {
                //transactions.get(i).setUser(user);
                transactions.add(createTransaction(uploadTransactions.get(i), user));

            }
            return transactions;
        } catch (Exception e) {
            System.out.println("Error: " + e);
            return null;
        }
    }

    public List<CategoryCount> categoryCount(User user) {
        List<CategoryCount> categoryCounts = this.transactionRepository.countByCategoryForUser(user.getId());
        
        return categoryCounts;
    }

    public List<ReadTransactionDto> getTransactionsBetweenDate(User user, CreateTransactionDateDto createTransactionDateDto) {
        List<Transaction> transactions = this.transactionRepository.findByUserIdAndDateBetween(user.getId(), createTransactionDateDto.getStartDate(), createTransactionDateDto.getEndDate());
        List<ReadTransactionDto> readTransactionDtos = transactions.stream()
                .map(t -> modelMapper.map(t, ReadTransactionDto.class)).toList();
        return readTransactionDtos;

    }
}