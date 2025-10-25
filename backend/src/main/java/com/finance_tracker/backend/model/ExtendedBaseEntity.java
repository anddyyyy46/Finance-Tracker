package com.finance_tracker.backend.model;

import java.util.Date;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class ExtendedBaseEntity extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {

        this.user = user;
    }

    public ExtendedBaseEntity(Integer id, Date createdAt, Date updatedAt, User user) {
        super(id, createdAt, updatedAt);
        this.user = user;
    }

    public ExtendedBaseEntity() {

    }

}