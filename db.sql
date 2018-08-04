/*

 Source Server         : Local
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : xcloud

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for bgp_states
-- ----------------------------
DROP TABLE IF EXISTS `bgp_states`;
CREATE TABLE `bgp_states` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `port_id` int(10) unsigned NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `uptime` varchar(255) DEFAULT NULL,
  `prefix` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ports_bgp_states_port_id` (`port_id`),
  CONSTRAINT `ports_bgp_states_port_id` FOREIGN KEY (`port_id`) REFERENCES `ports` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for ip_assignments
-- ----------------------------
DROP TABLE IF EXISTS `ip_assignments`;
CREATE TABLE `ip_assignments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(15) DEFAULT NULL,
  `server_id` int(10) unsigned NOT NULL,
  `type` enum('anycast','unicast') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `servers_ip_assignments_server_id` (`server_id`),
  CONSTRAINT `servers_ip_assignments_server_id` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ip_assignments
-- ----------------------------
BEGIN;
INSERT INTO `ip_assignments` VALUES (1, '1.0.1.1', 1, 'unicast');
INSERT INTO `ip_assignments` VALUES (2, '1.0.1.99', 2, 'unicast');
INSERT INTO `ip_assignments` VALUES (3, '1.0.1.222', 3, 'unicast');
INSERT INTO `ip_assignments` VALUES (4, '1.0.2.222', 3, 'anycast');
COMMIT;

-- ----------------------------
-- Table structure for ports
-- ----------------------------
DROP TABLE IF EXISTS `ports`;
CREATE TABLE `ports` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `switch_id` int(10) unsigned NOT NULL,
  `server_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `servers_ports_server_id` (`server_id`),
  KEY `switches_ports_switch_id` (`switch_id`),
  CONSTRAINT `servers_ports_server_id` FOREIGN KEY (`server_id`) REFERENCES `servers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `switches_ports_switch_id` FOREIGN KEY (`switch_id`) REFERENCES `switches` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ports
-- ----------------------------
BEGIN;
INSERT INTO `ports` VALUES (1, 1, NULL, 'Port 1_1', NULL);
INSERT INTO `ports` VALUES (2, 1, NULL, 'Port 1_2', NULL);
INSERT INTO `ports` VALUES (3, 1, 3, 'Port 1_3', NULL);
INSERT INTO `ports` VALUES (4, 1, 1, 'Port 1_4', NULL);
INSERT INTO `ports` VALUES (5, 1, NULL, 'Port 1_5', NULL);
INSERT INTO `ports` VALUES (6, 1, NULL, 'Port 1_6', NULL);
INSERT INTO `ports` VALUES (7, 1, NULL, 'Port 1_7', NULL);
INSERT INTO `ports` VALUES (8, 1, NULL, 'Port 1_8', NULL);
INSERT INTO `ports` VALUES (9, 1, NULL, 'Port 1_9', NULL);
INSERT INTO `ports` VALUES (10, 1, NULL, 'Port 1_10', NULL);
INSERT INTO `ports` VALUES (11, 2, 2, 'Port 2_1', NULL);
INSERT INTO `ports` VALUES (12, 2, 3, 'Port 2_2', NULL);
INSERT INTO `ports` VALUES (13, 2, NULL, 'Port 2_3', NULL);
INSERT INTO `ports` VALUES (14, 2, NULL, 'Port 2_4', NULL);
INSERT INTO `ports` VALUES (15, 2, NULL, 'Port 2_5', NULL);
INSERT INTO `ports` VALUES (16, 2, NULL, 'Port 2_6', NULL);
INSERT INTO `ports` VALUES (17, 2, NULL, 'Port 2_7', NULL);
INSERT INTO `ports` VALUES (18, 2, NULL, 'Port 2_8', NULL);
INSERT INTO `ports` VALUES (19, 2, NULL, 'Port 2_9', NULL);
INSERT INTO `ports` VALUES (20, 2, NULL, 'Port 2_10', NULL);
COMMIT;

-- ----------------------------
-- Table structure for servers
-- ----------------------------
DROP TABLE IF EXISTS `servers`;
CREATE TABLE `servers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of servers
-- ----------------------------
BEGIN;
INSERT INTO `servers` VALUES (1, 'Server 1');
INSERT INTO `servers` VALUES (2, 'Server 2');
INSERT INTO `servers` VALUES (3, 'Server 3');
COMMIT;

-- ----------------------------
-- Table structure for switches
-- ----------------------------
DROP TABLE IF EXISTS `switches`;
CREATE TABLE `switches` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of switches
-- ----------------------------
BEGIN;
INSERT INTO `switches` VALUES (1, 'Switch 1');
INSERT INTO `switches` VALUES (2, 'Switch 2');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
