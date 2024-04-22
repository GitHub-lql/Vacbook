# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# Host: 127.0.0.1 (MySQL 5.7.34)
# Database: Vacbook
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table admin
# ------------------------------------------------------------

DROP TABLE IF EXISTS `admin`;

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_account` varchar(25) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`admin_id`) USING BTREE,
  UNIQUE KEY `admin_account` (`admin_account`) USING BTREE,
  KEY `location_id` (`location_id`) USING BTREE,
  CONSTRAINT `location_id` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;

INSERT INTO `admin` (`admin_id`, `admin_account`, `admin_password`, `admin_name`, `location_id`)
VALUES
	(1,'Admin_1','3e6c7d141e32189c917761138b026b74','大连市中山区青泥洼桥街道社区卫生服务中心预防接种门诊',1),
	(2,'Admin_2','3e6c7d141e32189c917761138b026b74','大连市西岗人民广场石道街社区卫生服务中心人民广场预防保健部',2),
	(3,'Admin_3','3e6c7d141e32189c917761138b026b74','大连市西岗人民广场石道街社区卫生服务中心八一路预防保健部',3),
	(4,'Admin_4','3e6c7d141e32189c917761138b026b74','大连市沙河口区李家预防保健所',4),
	(5,'Admin_5','3e6c7d141e32189c917761138b026b74','大连甘井子龙畔金泉社区卫生服务中心',5),
	(6,'Admin_6','3e6c7d141e32189c917761138b026b74','大连高新区七贤岭社区卫生服务中心',6);

/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table booking
# ------------------------------------------------------------

DROP TABLE IF EXISTS `booking`;

CREATE TABLE `booking` (
  `booking_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `vaccine_id` int(11) NOT NULL,
  `booking_timezone` varchar(255) NOT NULL,
  `date` varchar(11) NOT NULL,
  PRIMARY KEY (`booking_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `booking_ibfk_1` (`vaccine_id`) USING BTREE,
  CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`vaccine_id`) REFERENCES `vaccine` (`vaccine_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;

INSERT INTO `booking` (`booking_id`, `user_id`, `vaccine_id`, `booking_timezone`, `date`)
VALUES
	(1,1,1,'15:00','2022-12-11'),
	(2,2,2,'23:00','2022-12-11'),
	(3,3,3,'10:00','2022-12-11'),
	(4,4,4,'11:00','2022-12-11');

/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table location
# ------------------------------------------------------------

DROP TABLE IF EXISTS `location`;

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`location_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;

INSERT INTO `location` (`location_id`, `location`)
VALUES
	(1,'河北省'),
	(8,'山西省'),
	(9,'辽宁省'),
	(10,'吉林省'),
	(11,'黑龙江省'),
	(12,'江苏省'),
	(13,'浙江省'),
	(14,'安徽省'),
	(15,'福建省'),
	(16,'江西省'),
	(17,'山东省'),
	(18,'河南省'),
	(19,'湖北省'),
	(20,'湖南省'),
	(21,'广东省'),
	(22,'海南省'),
	(23,'四川省'),
	(24,'贵州省'),
	(25,'云南省'),
	(26,'陕西省'),
	(27,'甘肃省'),
	(28,'青海省'),
	(29,'台湾省'),
	(30,'内蒙古自治区'),
	(31,'广西壮族自治区'),
	(32,'西藏自治区'),
	(33,'宁夏回族自治区'),
	(34,'新疆维吾尔自治区'),
	(35,'北京市'),
	(36,'天津市'),
	(37,'上海市'),
	(38,'重庆市'),
	(39,'香港特别行政区'),
	(40,'澳门特别行政区');

/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_number` char(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `user_lastname` varchar(20) NOT NULL,
  `user_firstname` varchar(20) NOT NULL,
  `gender` varchar(7) NOT NULL,
  `address` varchar(255) NOT NULL,
  `age` int(3) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_account` varchar(25) NOT NULL,
  `user_question` varchar(255) NOT NULL,
  `user_safe_key` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE KEY `user_account` (`user_account`) USING BTREE,
  KEY `age` (`age`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`user_id`, `phone_number`, `email`, `user_lastname`, `user_firstname`, `gender`, `address`, `age`, `user_password`, `user_account`, `user_question`, `user_safe_key`)
VALUES
	(1,'12345','L1194382512@163.com','12345','aa','Male','四川省',23,'3e6c7d141e32189c917761138b026b74','12345','1','1'),
	(2,'123456','L1194382512@163.com','123456','bb','Male','北京市',23,'3e6c7d141e32189c917761138b026b74','123456','1','1'),
	(3,'1234567','L1194382512@163.com','1234567','cc','Female','黑龙江省',23,'3e6c7d141e32189c917761138b026b74','1234567','1','1'),
	(4,'12345678','L1194382512@163.com','12345678','dd','Female','辽宁省',23,'3e6c7d141e32189c917761138b026b74','12345678','1','1'),
	(5,'123456789','L1194382512@163.com','123456789','ee','Male','云南省',23,'3e6c7d141e32189c917761138b026b74','123456789','1','1');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table vaccine
# ------------------------------------------------------------

DROP TABLE IF EXISTS `vaccine`;

CREATE TABLE `vaccine` (
  `vaccine_id` int(11) NOT NULL AUTO_INCREMENT,
  `vaccine_type` varchar(255) NOT NULL,
  `vaccine_name` varchar(255) NOT NULL,
  `admin_id` int(11) NOT NULL,
  `vaccine_amount` int(11) NOT NULL,
  PRIMARY KEY (`vaccine_id`) USING BTREE,
  KEY `admin_id1` (`admin_id`) USING BTREE,
  CONSTRAINT `admin_id1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

LOCK TABLES `vaccine` WRITE;
/*!40000 ALTER TABLE `vaccine` DISABLE KEYS */;

INSERT INTO `vaccine` (`vaccine_id`, `vaccine_type`, `vaccine_name`, `admin_id`, `vaccine_amount`)
VALUES
	(1,'mRNA','国药中生北京公司的新冠灭活疫苗',1,100),
	(2,'mRNA','北京科兴中维新冠病毒灭活疫苗',2,20),
	(3,'mRNA','国药中生武汉所新冠灭活疫苗',3,90),
	(4,'mRNA','北京科兴中维新冠病毒灭活疫苗',3,100),
	(5,'mRNA','北京科兴中维新冠病毒灭活疫苗',4,10),
	(6,'mRNA','国药中生武汉所新冠灭活疫苗',4,10),
	(7,'mRNA','北京科兴中维新冠病毒灭活疫苗',5,100),
	(8,'mRNA','安徽智飞生物重组亚单位疫苗',5,10),
	(9,'mRNA','北京科兴中维新冠病毒灭活疫苗',6,10);

/*!40000 ALTER TABLE `vaccine` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
