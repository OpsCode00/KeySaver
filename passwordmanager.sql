-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ago 16, 2022 alle 16:44
-- Versione del server: 10.4.24-MariaDB
-- Versione PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `passwordmanager`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `login`
--

CREATE TABLE `login` (
  `ID` int(11) NOT NULL,
  `EMail` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `IV` varchar(255) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Surname` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `login`
--

INSERT INTO `login` (`ID`, `EMail`, `Password`, `IV`, `Name`, `Surname`) VALUES
(15, 'info@info.it', '921818d2a264b738', 'e5be33318bb8601db6a37fa955af8251', 'Prova', 'Thei'),
(16, 'andreaoppici2000@gmail.com', '97c452054f', '5a4af2501f0aff3736d7cc81b487112f', 'Andrea', 'Oppici'),
(18, 'andrea.oppici@gmail.com', 'ba50a555', 'eba93acb8268d7b539f736302d1b7c86', 'sdasdas', 'dsada'),
(19, 'andrea@andrea.it', 'c72ff9d32111', 'ed3f926a819f3b10a42288ba8415e072', 'Andrea', 'Oppici'),
(20, 'password@prova.it', 'fb0bd02d14', '3c2550bf8ce45193cb85e7469ece4b9f', 'Prova', 'Prova');

-- --------------------------------------------------------

--
-- Struttura della tabella `passwords`
--

CREATE TABLE `passwords` (
  `ID` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Web` varchar(45) NOT NULL,
  `Mail` varchar(45) DEFAULT NULL,
  `User` varchar(45) NOT NULL,
  `Password` varchar(225) NOT NULL,
  `IV` varchar(225) NOT NULL,
  `UniqueID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `passwords`
--

INSERT INTO `passwords` (`ID`, `Name`, `Web`, `Mail`, `User`, `Password`, `IV`, `UniqueID`) VALUES
(7, 'Facebook', 'www.Facebook.It', 'info@pollame.it', 'FacePoll', '3057d507acff31fbdce5b09cd0dd9f20', '9dc712992d10b6e1b36f4daa4f238e02', 16),
(8, 'Spotify', 'www.spotify.it', 'lecosebelle@gmail.com', 'siamoBelli', '93c4c5a82c8f7d7f40b11a567cc784975aad0ed3f104d533', '2afe16fb7a62d4256111d59884f7eb40', 16),
(12, 'birrificiogregorio', 'https://www.birrificiogregorio.it/', 'andreaoppici2000@gmail.com', 'andreaoppici2000@gmail.com', '7d938a6059457aeb63', '8676575119870a2b15a9529745d6d58a', 16),
(13, 'birrificiogregorio', 'https://www.birrificiogregorio.it/', 'andreaoppici2000@gmail.com', 'andreaoppici2000@gmail.com', '036879944ca1', 'b9f2ed0ee418bd504a1de9d700cad852', 19),
(21, 'birrificioargo', 'https://birrificioargo.com/', 'andreaoppici2000@gmail.com', 'andreaoppici2000@gmail.com', 'ffd37f934c', '1c8961b5c405eb2b167b6bb115c24399', 16),
(22, 'w3schools', 'https://www.w3schools.com/', 'andreaoppici2000@gmail.com', 'andreaoppici2000@gmail.com', 'c44e538e1e', 'f07646ee021da7c07e5b7fc698f6f262', 16),
(23, 'github', 'www.github.it', 'andreaoppici2000@gmail.com', 'andreaoppici2000@gmail.com', '840b61992c', '0a94b6cb493dc9cb74e7c2b6e55e68b0', 16);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`ID`);

--
-- Indici per le tabelle `passwords`
--
ALTER TABLE `passwords`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PW` (`UniqueID`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `login`
--
ALTER TABLE `login`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT per la tabella `passwords`
--
ALTER TABLE `passwords`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `passwords`
--
ALTER TABLE `passwords`
  ADD CONSTRAINT `PW` FOREIGN KEY (`UniqueID`) REFERENCES `login` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
