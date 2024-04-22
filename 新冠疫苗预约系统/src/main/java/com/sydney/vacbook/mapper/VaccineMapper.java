package com.sydney.vacbook.mapper;

import com.sydney.vacbook.entity.Vaccine;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.io.Serializable;


@Repository
@Mapper
public interface VaccineMapper extends BaseMapper<Vaccine> {


}
