package com.finance_tracker.backend.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import com.finance_tracker.backend.Util;
import com.finance_tracker.backend.dto.CreateTransaction;
import com.finance_tracker.backend.dto.ReadTransactionDto;
import com.finance_tracker.backend.dto.ReadUserDto;
import com.finance_tracker.backend.model.Transaction;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.repository.TransactionRepository;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final ModelMapper modelMapper;

    public TransactionService(TransactionRepository transactionRepository, ModelMapper modelMapper) {
        this.transactionRepository = transactionRepository;
        this.modelMapper = modelMapper;
    }

    public ReadTransactionDto getTransaction(Integer id) {
        Transaction transaction = transactionRepository.findById(id).orElseThrow();
        ReadTransactionDto readTransactionDto = modelMapper.map(transaction, ReadTransactionDto.class);
        return readTransactionDto;
    }

    public ReadTransactionDto createTransaction(CreateTransaction createTransaction, User user) {
        Transaction createTransactionMapped = modelMapper.map(createTransaction, Transaction.class);
        createTransactionMapped.setUser(user);
        Transaction savedTransaction = this.saveTransaction(createTransactionMapped);
        ReadTransactionDto readTransactionDto = modelMapper.map(savedTransaction, ReadTransactionDto.class);
        return readTransactionDto;
    }

    public Transaction saveTransaction(Transaction transaction) {
        Transaction savedTransaction = transactionRepository.save(transaction);
        return savedTransaction;
    }

    public List<ReadTransactionDto> getTransactionsFromUser(User user) {
        List<Transaction> transactions = transactionRepository.findByUserId(user.getId());
        List<ReadTransactionDto> readTransactionDtos = transactions.stream()
                .map(t -> modelMapper.map(t, ReadTransactionDto.class)).toList();
        return readTransactionDtos;
    }

    public ReadTransactionDto updateTransaction(Integer transactionId, Transaction transaction) {
        ReadTransactionDto oldReadTransactionDto = this.getTransaction(transactionId);
        BeanUtils.copyProperties(transaction, oldReadTransactionDto);
        Transaction transactionMapped = modelMapper.map(oldReadTransactionDto, Transaction.class);
        Transaction updatedTransaction = this.saveTransaction(transactionMapped);
        ReadTransactionDto readUpdatedTransactionDto = modelMapper.map(updatedTransaction, ReadTransactionDto.class);
        return readUpdatedTransactionDto;
    }
}
