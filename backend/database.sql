CREATE DATABASE  IF NOT EXISTS `indie_world` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `indie_world`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: indie_world
-- ------------------------------------------------------
-- Server version	8.0.33

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
  `text` mediumtext NOT NULL,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`,`user_id`,`product_id`),
  KEY `fk_comment_user2_idx` (`user_id`),
  KEY `fk_comment_product1_idx` (`product_id`),
  CONSTRAINT `fk_comment_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_comment_user2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (42,'youpi\n',3,29),(43,'ce jeu est genial',2,30),(44,'je trouve que la finition aurait pu être meilleure',4,30),(45,'Génial attention aux escargots',4,34),(47,'Génial , attention aux escargots , Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius sed nisl vitae fringilla. Suspen Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius sed nisl vitae fringilla. SuspenLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius sed nisl vitae fringilla. Suspen\ntoto',2,34),(48,'Génial , attention aux escargots , Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius sed nisl vitae fringilla. Suspen Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius sed nisl vitae fringilla. SuspenLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed varius sed nisl vitae fringilla. Suspen\ntoto',2,34),(49,'Je m\'appelle chichi et je suis la meilleure et j adore les grenouilles',5,34),(50,'quelle torture ...',2,42),(53,'C\'est trop mignon',19,42);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `short_description` tinytext NOT NULL,
  `description` mediumtext NOT NULL,
  `price` float NOT NULL,
  `title` varchar(255) NOT NULL,
  `photo` varchar(500) NOT NULL,
  `studio` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `release` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idgame_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (29,'Vous êtes invité à une fête comme nulle autre','Grimace organise une fête ! Et VOUS êtes invité(e) !\nQuelque chose ne tourne pas rond à la fête. Après avoir pris conscience de cela, vous devez vous échapper de son domaine tout en étant traqué(e).',0,'GRIMACE\'S BIRTHDAY','https://img.itch.zone/aW1nLzEyNzAwNDg4LnBuZw==/315x250%23c/UyTJex.png','Blank Dream Studios','Action','8 juillet 2023'),(30,'? Capture de drapeau dans un  style Medieval Style ?','Affrontez des joueurs du monde entier avec votre arc et vos flèches. Défendez votre château contre des envahisseurs. Volez le drapeau avec l\'aide de vos coéquipiers et remportez la bataille. Narrow One est un jeu de tir à l\'arc multijoueur de style médiéval en 5 contre 5. Explorez les différentes cartes et découvrez les raccourcis cachés.\n\n    6 arcs différents avec des skins personnalisables.\n    Plus de 50 armes de mêlée différentes.\n    17 cartes uniques.\n    Plus de 200 articles vestimentaires déblocables.\n    Contenu saisonnier.\n    Prise en charge de l\'écran tactile et des manettes de jeu.\n    Formez une équipe avec vos amis en mode escouade.',0,'Narrow One','https://img.itch.zone/aW1nLzExMDY1NTg4LnBuZw==/315x250%23c/SxYAbI.png','Pelican Party','Shooter','nc'),(33,'Ces robots sont obsédés par les sushis, et vous êtes celui qui les leur sert.','  Un puzzle game original qui se joue entièrement à la souris.',4.99,'Sushi For Robots','https://img.itch.zone/aW1nLzEzMDExMDQxLnBuZw==/315x250%23c/GVE9Sr.png','Ludipe','Puzzle','nc'),(34,'un point and click déssiné entierement à la main','L\'aventure de la Grenouille est un jeu d\'aventure point-and-click mettant en scène une grenouille à qui l\'on a donné un cerveau ! Poursuivez une farfadette espiègle et essayez de la convaincre de vous retransformer en une grenouille ordinaire.\n\nAu cours de votre aventure, vous rencontrerez de nombreux animaux qui partagent le même destin... Pouvez-vous lever la malédiction et rendre à tous leur véritable nature ?',5,'Frog\'s Adventure','https://img.itch.zone/aW1nLzEyOTQxNDczLnBuZw==/315x250%23c/fZa0pg.png','Sokpop Collective','Adventure , action','nc'),(42,'Imaginons que vous ayez un jeu dans lequel vous vous occupez d\'un personnage. Mais pourriez-vous ima','\"MiSide\" est un jeu d\'aventure avec des éléments d\'horreur racontant l\'histoire d\'un simple gars qui, pour des raisons mystiques, se retrouve dans une simulation mobile. Apparaissant dans la maison qu\'il vient d\'observer sur l\'écran de son smartphone, le héros est déconcerté. Le jeune homme abasourdi suit les instructions d\'un certain appareil qu\'il a découvert dans la chambre. Quelques instants plus tard, il est accueilli par une jolie fille, dont l\'image est également familière au jeune homme à partir de ce jeu mobile.',0,'miside demo','https://img.itch.zone/aW1nLzEyOTQzOTYzLnBuZw==/315x250%23c/uY7ctb.png','Mita Aihasto','Simulation','nc'),(43,'Apprenez au héro comment jouer !','Un héros courageux doit conquérir un donjon. Mais vous n\'êtes pas le héros, vous êtes le compagnon du héros ! Apprenez au héros comment jouer au jeu et guidez-le à travers le donjon en construisant des tutoriels qu\'il peut suivre.',0,'Hey, Listen!','https://img.itch.zone/aW1nLzEzMTUyNDA0LnBuZw==/315x250%23c/OlQxJx.png','André Cardoso','puzzle','beta'),(51,'Emmenez votre animal de compagnie faire une promenade jusqu\'au sommet du Sunset Peak.','Il y a quelques jours, grand-mère est décédée, laissant derrière elle son animal de compagnie bien-aimé : un lézard à trois têtes nommé Thaw, Tea et Tooth. Grand-mère écrivait qu\'ils avaient le jappement le plus mignon, mais qu\'il ne restait qu\'un petit gémissement à présent.\n\nLa mort de grand-mère doit être difficile pour eux.\n\nEmmenez Thaw, Tea et Tooth se promener au Sunset Park.\n\nEn chemin, vous pouvez trouver des cadeaux pour égayer leur moral. Soyez attentif, car chacun a des goûts uniques, et un cadeau mal adapté pourrait aggraver leur tristesse.\n\nLorsque vous atteindrez le sommet de Sunset Peak, la promenade du soir avec Thaw, Tea et Tooth se terminera. Il vous appartient de les faire retrouver leur joie de japper ou non. Si ce n\'est pas lors de la première promenade, peut-être qu\'ils se réchaufferont à vous lors de la suivante.',0,'Tail & Trails','https://img.itch.zone/aW1nLzEyOTUwMDMyLnBuZw==/315x250%23c/Z2xPeD.png','Mojiken Studio','puzzle','juillet 2023'),(55,'\"Une Journée en 10 Minutes\"','Little Man se réveille et ne sait pas quoi faire de sa journée.\n\nIncarnez Petit Homme et aidez-le à traverser sa journée en se promenant, en parlant à des amis (ou à des ennemis) et en écrivant un peu dans son journal, dans ce court jeu loufoque sur le sentiment de \'bof\'.\n\n Jeu court (15 minutes) !\n\nParlez aux humains. Ou au chien.\nnote de l\'auteur :\nCeci est mon premier projet de jeu en solo. Ce n\'est pas long ni rien, mais je trouve que c\'est mignon.\nSi vous l\'avez tellement aimé que vous avez souri plus de trois fois, envisagez de laisser un don ! De cette façon, je pourrai faire un jeu sur le fait d\'avoir une semaine ou quelque chose du genre.\n(mosman on twitter: https://twitter.com/iMischaP)\n\n\n',0,'Little Man Has A Day','https://img.itch.zone/aW1nLzEyNTE3MTg3LnBuZw==/315x250%23c/C4q%2Blb.png','Mosman','aventure','16 aout 2023'),(57,'Courir ! Sauter ? Nager ?! Monsieur Plateforme peut tout faire !','Cours ! Sauter ? Nager ?! Monsieur Plateforme peut tout faire ! Evitez de nombreux pièges et ennemis dans ce jeu de plateforme aux graphismes very old school ',0,'Mr. Platformer','https://img.itch.zone/aW1nLzEzMzM1MDI5LnBuZw==/315x250%23c/JE5PKl.png','Terry Cavanagh','plateformes , aventure ','9 septembre 2023');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `iduser_UNIQUE` (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `name_2` (`name`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'david','david.abruzzo@sfr.fr','$argon2id$v=19$m=65536,t=5,p=1$7Ipo0NKn5cW5B0oGW74PXQ$37NJDutbDfZH5AXnC67S+6pyxlKhylg82OqQWr2jswY','admin'),(3,'toto','toto@toto.fr','$argon2id$v=19$m=65536,t=5,p=1$b4Ya3rGGR3nq1QtxrIIbbg$lhRFpuRP3Nx8l39Rd+5ngyEW3f4V8eWXzXDiDlIT4hE','user'),(4,'titi','titi@titi.fr','$argon2id$v=19$m=65536,t=5,p=1$JqKRcBum70ur+GrKuX2/aQ$eCT4/4/jKCLUNIwstUMdQaLts4EUg4Ob3J41x32r58w','user'),(5,'CHchi','chichi@chichi.fr','$argon2id$v=19$m=65536,t=5,p=1$nnjUKXuXKKGbxx+PoKjlNw$7AapiUhslJvrkF7gAK/3YEwoobxnI1QmgByGofR5jQ4','user'),(6,'Mateo','mateo@mateo.fr','$argon2id$v=19$m=65536,t=5,p=1$cEJHBBdngbR0c+oWsRcibg$TDs5LEchEjteqWoy8qe8oYEbcDo7NPqF/RikKBaTJiE','user'),(7,'tutu','tutu@tutu.fr','$argon2id$v=19$m=65536,t=5,p=1$NJ9DszcCCK7NrpbFWmHh8g$lUEHtYeY8aA34pc+wcqgx186J0CnlCForsuev3StWTU','user'),(9,'capitaineFlam','david@david.fr','$argon2id$v=19$m=65536,t=5,p=1$ED7enKOfXYK77ySuEK52og$pyZbMgJel4TTLj+rJJ2TfXIDCPfPrmM/OVTXlEmbZ5w','user'),(11,'albator','albator@sfr.fr','$argon2id$v=19$m=65536,t=5,p=1$aPdrXQnIkJUNosiLEhs2hw$+RIAhfDHKZRO2lEP+k2EX6/UU1TSi4bb/F2+XPYT3uI','user'),(12,'maxime','maxime@maxime.fr','$argon2id$v=19$m=65536,t=5,p=1$zHTw6Xojo4vvaiDHuxgwLQ$+nhxPepVNUgGo9DWzp0DcYGfT0GpXHeJ1PjTP14/M9k','user'),(19,'chichi','lersy.jessica@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$5xYYaksj0ggd4yzc5XzWnQ$nUydtniQdUEizH0JSHwKQG/Hrt2R4Qi+eWhJmZc/2Ww','user'),(37,'truc','machin.abruzzo@sfr.fr','$argon2id$v=19$m=65536,t=5,p=1$27+AYyzlWdwxFS6mgUlFXg$p25NqDEUq9ZO4PPtMzZbOIq9Q41bXWeZvPto2iyo27g','user'),(38,'jean','jean@chichi.fr','$argon2id$v=19$m=65536,t=5,p=1$NzHYmOPPsvIMVd87ddf/Lg$cKJdUzCWZV5lWW2MItSK9KjJnKM+Lgdzgekzod38DYc','user'),(39,'Toto la cerise','totoLaCerise@gmail.com','$argon2id$v=19$m=65536,t=5,p=1$GLlM7MHUGIbw3wz/wp4a6g$0VQbUQNFwtJcJ5u02QYf351IkE2ERo6mMbmmtBC9Ltw','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-10 15:49:14
