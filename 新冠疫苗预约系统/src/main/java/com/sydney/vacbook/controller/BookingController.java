package com.sydney.vacbook.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.StringUtils;
import com.sydney.vacbook.entity.*;
import com.sydney.vacbook.mapper.BookingMapper;
import com.sydney.vacbook.service.*;
import com.sydney.vacbook.service.impl.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/vacbook/booking")
@Controller
public class BookingController {
    @Autowired
    private BookingMapper bookingMapper;
    @Autowired
    private IBookingService ibookingService;
    @Autowired
    private IUserService userService;
    @Autowired
    private IVaccineService vaccineService;
    @Autowired
    private IAdminService adminService;
    @Autowired
    private ILocationService locationService;
    @Autowired
    private SendEmailService sendEmailService;

    private JavaMailSender javaMailSender;

//    理论上insert不需要的ID的 数据库里已经设置的ID自增 test里测试似乎也不需要ID
//    框架里写的是动态sql
//    尝试用service层的接口
    @GetMapping("/add")
    public boolean bookingAdd(Booking booking){
        boolean bookingAdd = ibookingService.save(booking);
        return bookingAdd;
    }

    //删除booking by id
    @GetMapping("/delete")
    public boolean bookingDelete(Booking booking){
        boolean bookingDelete = ibookingService.removeById(booking);
        return bookingDelete;
    }
    //更新booking by id
    @GetMapping("/update")
    public boolean bookingUpdate(Booking booking){
        boolean bookingUpdate = ibookingService.updateById(booking);
        return bookingUpdate;
    }
    @PostMapping(value = "/update")
    public ModelAndView updateSetting(@RequestParam String date, String time,Integer userID) {

//        System.out.println("Here is update booking");
        // here can be updated by user in myBooking page
        QueryWrapper<Booking> findBookingByUserId = new QueryWrapper<>();
        findBookingByUserId.lambda().eq(Booking::getUserId, userID);
        List<Booking> bookingList = ibookingService.list(findBookingByUserId);
        Booking booking = bookingList.get(0);
        //set new date and time
        booking.setDate(date);
        booking.setBookingTimezone(time);
        System.out.println(booking);
        ibookingService.saveOrUpdate(booking);
        return this.getUserBookingInfo(userID);
    }

    //检查用户是否已经booking了
    @GetMapping("/check")
    public boolean bookingCheck(Integer userId){
        Booking booking = ibookingService.getOne(new QueryWrapper<Booking>().eq("user_id", userId));
        if(booking==null){
            return false;
        }else {
            return true;
        }
    }

    //obtain the booking data of user
    @PostMapping("/fetch")
    public boolean fetchBooking(Booking booking){
        Booking b = ibookingService.getOne(new QueryWrapper<Booking>().eq("user_id",booking.getUserId()));
        if(b!=null){
            return false;
        }
        if(booking.getVaccineId()!=null){
            Vaccine vaccine = vaccineService.getById(booking.getVaccineId());
            System.out.println("Vaccine:"+vaccine.getVaccineName());
            if(vaccine!=null){
                booking.setVaccine_name(vaccine.getVaccineName());
                Admin admin = adminService.getById(vaccine.getAdminId());
                if(admin!=null){
                    Location location = locationService.getById(admin.getLocationId());
                    System.out.println("Location:"+location.getLocation());
                }
            }
        }
        if(booking.getUserId()!=null){
            User user = userService.getById(booking.getUserId());
            System.out.println("Name:"+user.getUserFirstname()+" "+user.getUserLastname());
        }
        ibookingService.save(booking);
        return true;
    }

    /**
     * reject method interface
     * @param booking
     * @return
     */
    @GetMapping("/reject/{bookingId}")
    public boolean reject(Booking booking){
        boolean confirmBooking = ibookingService.removeById(booking);
        return confirmBooking;
    }

    @GetMapping("/confirm")
    public boolean confirmBooking(Booking booking){
        boolean confirmBooking = ibookingService.updateById(booking);
        return confirmBooking;
    }


    @GetMapping("/edit/{id}")
    public boolean editBooking(Booking booking){
        boolean editBooking = ibookingService.updateById(booking);
        return editBooking;
    }

    @GetMapping("/user/{id}")
    public ModelAndView getUserBookingInfo(@PathVariable("id") int id){
        //find Booking info by userID
        QueryWrapper<Booking> findBookingByUserId = new QueryWrapper<>();
        findBookingByUserId.lambda().eq(Booking::getUserId, id);
        List<Booking> bookingList = ibookingService.list(findBookingByUserId);
        if(bookingList.size()==0){

            ModelAndView modelAndView = new ModelAndView( "userPages/booking-edit","result",false);
            return modelAndView;
        }

        Integer bookingId = bookingList.get(0).getBookingId();
        //get vaccine name by id
        Integer vaccineId = bookingList.get(0).getVaccineId();
        Vaccine vaccine = vaccineService.getById(vaccineId);

        //get user name by id
        Integer userId = bookingList.get(0).getUserId();
        User user = userService.getById(userId);

        //get Booking date and time
        String date = bookingList.get(0).getDate();
        String time = bookingList.get(0).getBookingTimezone();

        //get Location name
        Admin admin = adminService.getById(vaccine.getAdminId());
        Location location = locationService.getById(admin.getLocationId());

        // new map to front end
        Map<String, Object> result = new LinkedHashMap<>();
        result.put("bookingId",bookingId);
        result.put("userId",userId);
        result.put("Vaccine", vaccine.getVaccineName());
        result.put("firstName", user.getUserFirstname());
        result.put("lastName", user.getUserLastname());
        result.put("date", date);
        result.put("time", time);
        result.put("location", location.getLocation());

        ModelAndView modelAndView = new ModelAndView( "userPages/booking-edit","bookingInfo",result);
        modelAndView.addObject("result",true);
        return modelAndView;
    }

    @RequestMapping("/sendRejectEmail")
    public void sendRejectEmailToUser(@RequestParam Integer booking_id){
        // get reject booking list
        Booking booking = ibookingService.getById(booking_id);

        // get reject user info by booking list
        User user = userService.getById(booking.getUserId());

        //get vaccine name by booking list's vaccine ID
        Vaccine vaccine = vaccineService.getById(booking.getVaccineId());
        String vaccineName = vaccine.getVaccineName();

        //set email param
        String toEmail = user.getEmail();
        String topic = "来自vacBook的预订消息！";
        String msg = "亲爱的 "+ user.getUserFirstname() +":\n"+
                "抱歉，您的预订被拒绝了！\n"+
                "以下是您的预订详情:\n\n"+
                "预订用户名字:       "+ user.getUserFirstname()+"\n"+
                "预订用户姓氏:        "+ user.getUserLastname()+"\n"+
                "预订日期:                      "+ booking.getDate()+"\n"+
                "预订期间:                    "+ booking.getBookingTimezone()+"\n"+
                "已预订的疫苗名称:          "+ vaccineName+"\n\n"+
                "最后，我再次为由于一些无法控制的原因取消您的疫苗预约而道歉。\n\n" +
                "您可以再次登录我们的 VacBook 系统，选择其他时间段的疫苗预约。\n\n " +
                "如果您对上述信息有任何疑问，请随时与我们联系：L1194382512@163.com";

        sendEmailService.sendEmail(toEmail,msg,topic);
        System.out.println("发送拒绝电子邮件成功！");
    }

    @RequestMapping("/sendCancelEmail")
    public void sendCancelEmailToUser(@RequestParam Integer booking_id){
        // get reject booking list
        Booking booking = ibookingService.getById(booking_id);

        // get reject user info by booking list
        User user = userService.getById(booking.getUserId());

        //get vaccine name by booking list's vaccine ID
        Vaccine vaccine = vaccineService.getById(booking.getVaccineId());
        String vaccineName = vaccine.getVaccineName();

        //set email param
        String toEmail = user.getEmail();
        String topic = "取消来自vacBook的预订消息！";
        String msg = "亲爱的 "+ user.getUserFirstname() +":\n"+
                "您的预订已被您自己取消！\n"+
                "以下是您的预订详情:\n\n"+
                "预订用户名字:       "+ user.getUserFirstname()+"\n"+
                "预订用户姓氏:        "+ user.getUserLastname()+"\n"+
                "预订日期:                      "+ booking.getDate()+"\n"+
                "预订期间:                    "+ booking.getBookingTimezone()+"\n"+
                "已预订的疫苗名称:          "+ vaccineName+"\n\n"+
                "如果您对上述信息有任何疑问，请随时与我们联系：L1194382512@163.com";

        sendEmailService.sendEmail(toEmail,msg,topic);
        System.out.println("发送取消电子邮件成功！");
    }

    @RequestMapping("/sendConfirmEmail")
    public void sendConfirmEmailToUser(@RequestParam Integer userId, Integer vaccineId, String date, String bookingTimezone){


        // get user id
        User user = userService.getById(userId);

        //get vaccine name by user ID
        Vaccine vaccine = vaccineService.getById(vaccineId);
        String vaccineName = vaccine.getVaccineName();

        //set email param
        String toEmail = user.getEmail();
        String topic = "成功预订消息来自vacbook预订！";
        String msg = "亲爱的 "+ user.getUserFirstname() +":\n"+
                "祝贺！您的预订成功!\n"+
                "以下是您的预订详情:\n\n"+
                "预订用户名字:       "+ user.getUserFirstname()+"\n"+
                "预订用户姓氏:        "+ user.getUserLastname()+"\n"+
                "预订日期:                      "+ date+"\n"+
                "预订期间:                    "+ bookingTimezone+"\n"+
                "已预订的疫苗名称:          "+ vaccineName+"\n\n"+
                "如果您对上述信息有任何疑问，请随时与我们联系：L1194382512@163.com";

        sendEmailService.sendEmail(toEmail,msg,topic);
        System.out.println("sent confirm email success!");
    }

    @RequestMapping("/sendUpdateEmail")
    public void sendUpdateEmailToUser(@RequestParam Integer booking_id, String date, String bookingTimezone){
        // get reject booking list
        Booking booking = ibookingService.getById(booking_id);

        // get reject user info by booking list
        User user = userService.getById(booking.getUserId());

        //get vaccine name by booking list's vaccine ID
        Vaccine vaccine = vaccineService.getById(booking.getVaccineId());
        String vaccineName = vaccine.getVaccineName();

        //set email param
        String toEmail = user.getEmail();
        String topic = "成功更新预订消息来自vacbook！";
        String msg = "亲爱的 "+ user.getUserFirstname() +":\n"+
                "祝贺！您的预订已更新！\n"+
                "以下是您的预订详情:\n\n"+
                "预订用户名字:       "+ user.getUserFirstname()+"\n"+
                "预订用户姓氏:        "+ user.getUserLastname()+"\n"+
                "预订日期:                      "+ date+"\n"+
                "预订期间:                    "+ bookingTimezone+"\n"+
                "已预订的疫苗名称:          "+ vaccineName+"\n\n"+
                "如果您对上述信息有任何疑问，请随时与我们联系：L1194382512@163.com";

        sendEmailService.sendEmail(toEmail,msg,topic);
        System.out.println("发送更新电子邮件成功！");
    }









}
