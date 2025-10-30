package com.finance_tracker.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.finance_tracker.backend.dto.CreateTransactionDateDto;
import com.finance_tracker.backend.dto.CreateTransactionDto;
import com.finance_tracker.backend.dto.ReadTransactionDto;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.response.StatusResponse;
import com.finance_tracker.backend.service.TransactionService;
import com.finance_tracker.backend.utils.CategoryCount;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    
    @GetMapping("/categorycount")
    public List<CategoryCount> getCategoryCount(@AuthenticationPrincipal User user) {
        return this.transactionService.categoryCount(user);
    }

    @GetMapping("")
    public List<ReadTransactionDto> getTransactionsFromUser(@AuthenticationPrincipal User user) {
        return transactionService.getTransactionsFromUser(user);
    }

    

    @GetMapping("/{id}")
    public ResponseEntity<ReadTransactionDto> getTransaction(@PathVariable Integer id, @AuthenticationPrincipal User user) {
        ReadTransactionDto readTransactionDto = transactionService.getTransactionDto(id, user);
        return ResponseEntity.ok(readTransactionDto);
    }

    @PostMapping("/betweendate")
    public List<ReadTransactionDto> getTransactionsBetweenDate(@AuthenticationPrincipal User user, @RequestBody CreateTransactionDateDto createTransactionDateDto) {
        return this.transactionService.getTransactionsBetweenDate(user, createTransactionDateDto);
    }

    @PostMapping("")
    public ReadTransactionDto createTransaction(@AuthenticationPrincipal User user,
            @RequestBody CreateTransactionDto transaction) {
        return transactionService.createTransaction(transaction, user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StatusResponse> deleteTransaction(@AuthenticationPrincipal User user, @PathVariable Integer id){
        StatusResponse statusResponse = transactionService.deleteTransaction(user, id);
        return ResponseEntity.ok(statusResponse);
    }

    @PostMapping("/upload")
    public List<ReadTransactionDto> uploadTransactionFile(@AuthenticationPrincipal User user,
            @RequestParam("file") MultipartFile file){
        List<ReadTransactionDto> uploadTransactions = transactionService.uploadTransactionFile(file, user);
        return uploadTransactions;
    }


}
