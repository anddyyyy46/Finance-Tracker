package com.finance_tracker.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.finance_tracker.backend.dto.CreateTransaction;
import com.finance_tracker.backend.dto.ReadTransactionDto;
import com.finance_tracker.backend.model.Transaction;
import com.finance_tracker.backend.model.User;
import com.finance_tracker.backend.service.TransactionService;

@RestController
public class TransactionController {

    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @GetMapping("/transaction/{id}")
    public ResponseEntity<ReadTransactionDto> getTransaction(@PathVariable Integer id) {
        ReadTransactionDto readTransactionDto = transactionService.getTransaction(id);
        return ResponseEntity.ok(readTransactionDto);
    }

    @GetMapping("/transaction")
    public List<ReadTransactionDto> getTransactionsFromUser(@AuthenticationPrincipal User user) {
        return transactionService.getTransactionsFromUser(user);
    }

    @PostMapping("/transaction")
    public ReadTransactionDto createTransaction(@AuthenticationPrincipal User user,
            @RequestBody CreateTransaction transaction) {
        return transactionService.createTransaction(transaction, user);
    }

}
