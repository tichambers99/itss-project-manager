-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: project_management
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` mediumtext NOT NULL,
  `title` varchar(45) NOT NULL,
  `deleted` tinyint NOT NULL,
  `date` date NOT NULL,
  `user_id` int NOT NULL,
  `task_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_user1_idx` (`user_id`),
  KEY `fk_comment_task1_idx` (`task_id`),
  CONSTRAINT `fk_comment_task1` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`),
  CONSTRAINT `fk_comment_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',1,1),(2,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',2,9),(3,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',3,2),(4,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',4,7),(5,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',5,3),(6,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',1,6),(7,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',2,4),(8,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',3,8),(9,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',2,5),(10,'Bạn đã vẫn dụng được rất nhiều kiến thức','good chóp',0,'2020-12-25',3,6);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `date` datetime NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `github` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES ('1999-05-08 00:00:00','canducloi99@gmail.com','số nhà 4d','loiin99@gmail.com',1),('1999-05-08 00:00:00','canducloi99@gmail.com','số nhà 4d','loiin99@gmail.com',2),('1999-05-08 00:00:00','canducloi99@gmail.com','số nhà 4d','loiin99@gmail.com',3),('1999-05-08 00:00:00','canducloi99@gmail.com','số nhà 4d','loiin99@gmail.com',4);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `leader_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint NOT NULL,
  `work_counts` int NOT NULL,
  `deadline` date NOT NULL,
  `introduction` longtext NOT NULL,
  `deleted` tinyint NOT NULL,
  `created_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (1,2,'Project Management',0,3,'2020-12-31','Project môn lập trình web',0,'2020-01-11'),(2,1,'Battle ship game',0,3,'2020-12-31','Project môn lập trình mạng',0,'2020-01-11'),(3,5,'Mouse Touch',0,3,'2020-12-31','Project môn hệ quản trị Linux theo chuẩn ITSS',0,'2020-01-11');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` tinyint NOT NULL,
  `introduction` mediumtext NOT NULL,
  `deadline` date NOT NULL,
  `deleted` tinyint NOT NULL,
  `created_date` date NOT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`id`,`project_id`),
  KEY `fk_task_project1_idx` (`project_id`),
  CONSTRAINT `fk_task_project1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Xây dựng ý tưởng',1,'introduction','2020-11-10',0,'2020-11-01',1),(2,'Dựng database',1,'introduction','2020-11-30',0,'2020-11-10',1),(3,'Dựng front-end',0,'introduction','2020-12-20',0,'2020-11-20',1),(4,'Xây dựng ý tưởng',1,'introduction','2020-11-10',0,'2020-11-01',2),(5,'Dựng database',1,'introduction','2020-11-30',0,'2020-11-10',2),(6,'Dựng front-end',0,'introduction','2020-12-20',0,'2020-11-20',2),(7,'Xây dựng ý tưởng',1,'introduction','2020-11-10',0,'2020-11-01',3),(8,'Dựng database',1,'introduction','2020-11-30',0,'2020-11-10',3),(9,'Dựng front-end',0,'introduction','2020-12-20',0,'2020-11-20',3);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `deleted` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'LoiCan','123',0),(2,'LoiLe','123',0),(3,'KhanhNguyen','123',0),(4,'KhangMai','123',0),(5,'HungTruong','123',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_project`
--

DROP TABLE IF EXISTS `user_project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `joined_date` date NOT NULL,
  `leader` tinyint NOT NULL,
  `user_id` int NOT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`id`,`project_id`),
  KEY `fk_user_project_user1_idx` (`user_id`),
  KEY `fk_user_project_project1_idx` (`project_id`),
  CONSTRAINT `fk_user_project_project1` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  CONSTRAINT `fk_user_project_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_project`
--

LOCK TABLES `user_project` WRITE;
/*!40000 ALTER TABLE `user_project` DISABLE KEYS */;
INSERT INTO `user_project` VALUES (1,'2020-11-02',0,1,1),(2,'2020-11-01',1,2,1),(3,'2020-11-02',0,3,1),(4,'2020-11-01',1,1,2),(5,'2020-11-02',0,5,2),(6,'2020-11-01',1,5,3),(7,'2020-11-02',0,4,3),(8,'2020-11-03',0,1,3);
/*!40000 ALTER TABLE `user_project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'project_management'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-03 13:26:11
