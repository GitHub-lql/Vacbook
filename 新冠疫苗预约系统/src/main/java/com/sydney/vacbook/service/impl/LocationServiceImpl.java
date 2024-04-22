package com.sydney.vacbook.service.impl;

import com.sydney.vacbook.entity.Location;
import com.sydney.vacbook.mapper.LocationMapper;
import com.sydney.vacbook.service.ILocationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;


@Service
public class LocationServiceImpl extends ServiceImpl<LocationMapper, Location> implements ILocationService {

}
