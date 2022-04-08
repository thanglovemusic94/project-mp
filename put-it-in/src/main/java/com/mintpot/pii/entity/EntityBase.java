package com.mintpot.pii.entity;

import com.mintpot.pii.entity.constant.CrudStatus;
import javax.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * @author linhnc@mintpot.vn
 */
@Getter
@Setter
@MappedSuperclass
public abstract class EntityBase {
    protected CrudStatus crudStatus = CrudStatus.CREATED;
}
