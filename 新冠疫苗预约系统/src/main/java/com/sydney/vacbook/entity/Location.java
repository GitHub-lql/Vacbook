package com.sydney.vacbook.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import java.io.Serializable;
import lombok.Data;
import lombok.EqualsAndHashCode;


@Data
@EqualsAndHashCode(callSuper = false)
public class Location implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId(value = "location_id", type = IdType.AUTO)
    private Integer locationId;

    private String location;


}
