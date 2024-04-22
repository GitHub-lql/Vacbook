package com.sydney.vacbook.mapper;

import com.baomidou.mybatisplus.core.toolkit.Constants;
import com.sydney.vacbook.entity.Admin;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;


@Repository
@Mapper
//相当于自动扫描（mapperScan）
public interface AdminMapper extends BaseMapper<Admin> {


}
