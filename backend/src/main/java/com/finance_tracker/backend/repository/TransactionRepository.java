package com.finance_tracker.backend.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.finance_tracker.backend.model.Transaction;
import com.finance_tracker.backend.utils.CategoryCount;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findByUserIdOrderByCreatedAtDesc(Integer userId);

    @Query("SELECT new com.finance_tracker.backend.utils.CategoryCount(t.category, COUNT(t)) " +
           "FROM Transaction t " +
           "WHERE t.user.id = :userId " +
           "GROUP BY t.category")
    List<CategoryCount> countByCategoryForUser(@Param("userId") Integer userId);

    List<Transaction> findByUserIdAndDateBetween(
        Integer userId, Date start, Date end
    );
}
