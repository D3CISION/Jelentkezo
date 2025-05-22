-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Máj 21. 17:06
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `jelentkezesek`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `esemeny`
--

CREATE TABLE `esemeny` (
  `id` int(11) NOT NULL,
  `terem` varchar(10) NOT NULL,
  `kezd` time NOT NULL,
  `veg` time NOT NULL,
  `tema` varchar(60) DEFAULT NULL,
  `eloado` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `esemeny`
--

INSERT INTO `esemeny` (`id`, `terem`, `kezd`, `veg`, `tema`, `eloado`) VALUES
(117, 'F1', '08:00:00', '08:20:00', 'Teljesítménytúra élmények', 'Kovács Viktor és a Vasi Vándorok Sportegyesülete'),
(118, 'F1', '08:30:00', '08:50:00', 'Teljesítménytúra élmények', 'Kovács Viktor és a Vasi Vándorok Sportegyesülete'),
(119, 'F1', '09:00:00', '09:20:00', 'Teljesítménytúra élmények', 'Kovács Viktor és a Vasi Vándorok Sportegyesülete'),
(120, 'F1', '09:30:00', '09:50:00', 'Teljesítménytúra élmények', 'Kovács Viktor és a Vasi Vándorok Sportegyesülete'),
(121, 'F1', '10:00:00', '10:20:00', 'Teljesítménytúra élmények', 'Kovács Viktor és a Vasi Vándorok Sportegyesülete'),
(122, 'F1', '10:30:00', '10:50:00', 'Teljesítménytúra élmények', 'Kovács Viktor és a Vasi Vándorok Sportegyesülete'),
(123, 'F1', '11:00:00', '11:20:00', 'Teljesítménytúra élmények', 'Kovács Viktor és a Vasi Vándorok Sportegyesülete'),
(124, 'F1', '11:30:00', '11:50:00', 'Teljesítménytúra élmények', 'Kovács Viktor és a Vasi Vándorok Sportegyesülete'),
(125, '10.C', '08:00:00', '08:20:00', 'Diákmunka-PannonWork', 'Osztrosits Ákos'),
(126, '10.C', '08:30:00', '08:50:00', 'Diákmunka-PannonWork', 'Osztrosits Ákos'),
(127, '10.C', '09:00:00', '09:20:00', 'Diákmunka-PannonWork', 'Osztrosits Ákos'),
(128, '10.C', '09:30:00', '09:50:00', 'Diákmunka-PannonWork', 'Osztrosits Ákos'),
(129, '10.C', '10:00:00', '10:20:00', 'Diákmunka-PannonWork', 'Osztrosits Ákos'),
(130, '10.C', '10:30:00', '10:50:00', 'Diákmunka-PannonWork', 'Osztrosits Ákos'),
(131, '10.C', '11:00:00', '11:20:00', 'Diákmunka-PannonWork', 'Osztrosits Ákos'),
(132, '10.C', '11:30:00', '11:50:00', 'Diákmunka-PannonWork', 'Osztrosits Ákos'),
(133, 'A1', '08:00:00', '08:20:00', 'Játékos Pedagógia', 'Király Brigitta-gyógypedagógus'),
(134, 'A1', '08:30:00', '08:50:00', 'Játékos Pedagógia', 'Király Brigitta-gyógypedagógus'),
(135, 'A1', '09:00:00', '09:20:00', 'Játékos Pedagógia', 'Király Brigitta-gyógypedagógus'),
(136, 'A1', '09:30:00', '09:50:00', 'Játékos Pedagógia', 'Király Brigitta-gyógypedagógus'),
(137, 'A1', '10:00:00', '10:20:00', 'Játékos Pedagógia', 'Király Brigitta-gyógypedagógus'),
(138, 'A1', '10:30:00', '10:50:00', 'Játékos Pedagógia', 'Király Brigitta-gyógypedagógus'),
(139, 'A1', '11:00:00', '11:20:00', 'Játékos Pedagógia', 'Király Brigitta-gyógypedagógus'),
(140, 'A1', '11:30:00', '11:50:00', 'Játékos Pedagógia', 'Király Brigitta-gyógypedagógus'),
(141, '12.B', '08:00:00', '08:20:00', 'Föld körüli utazások', 'Kovács Anna'),
(142, '12.B', '08:30:00', '08:50:00', 'Föld körüli utazások', 'Kovács Anna'),
(143, '12.B', '09:00:00', '09:20:00', 'Föld körüli utazások', 'Kovács Anna'),
(144, '12.B', '09:30:00', '09:50:00', 'Föld körüli utazások', 'Kovács Anna'),
(145, '12.B', '10:00:00', '10:20:00', 'Föld körüli utazások', 'Kovács Anna'),
(146, '12.B', '10:30:00', '10:50:00', 'Föld körüli utazások', 'Kovács Anna'),
(147, '12.B', '11:00:00', '11:20:00', 'Föld körüli utazások', 'Kovács Anna'),
(148, '12.B', '11:30:00', '11:50:00', 'Föld körüli utazások', 'Kovács Anna'),
(149, '9.C', '08:00:00', '08:40:00', 'Horgolj velem!', 'Varga-Kató Anikó'),
(150, '9.C', '09:00:00', '09:40:00', 'Horgolj velem!', 'Varga-Kató Anikó'),
(151, '9.C', '10:00:00', '10:40:00', 'Horgolj velem!', 'Varga-Kató Anikó'),
(152, '9.C', '11:00:00', '11:40:00', 'Horgolj velem!', 'Varga-Kató Anikó'),
(153, '11.B', '08:00:00', '08:20:00', 'A Magyar Államkincstár működése', 'Magyar Államkincstár'),
(154, '11.B', '08:30:00', '08:50:00', 'A Magyar Államkincstár működése', 'Magyar Államkincstár'),
(155, '11.B', '09:00:00', '09:20:00', 'A Magyar Államkincstár működése', 'Magyar Államkincstár'),
(156, '11.B', '09:30:00', '09:50:00', 'A Magyar Államkincstár működése', 'Magyar Államkincstár'),
(157, '11.B', '10:00:00', '10:20:00', 'A Magyar Államkincstár működése', 'Magyar Államkincstár'),
(158, '11.B', '10:30:00', '10:50:00', 'A Magyar Államkincstár működése', 'Magyar Államkincstár'),
(159, '11.B', '11:00:00', '11:20:00', 'A Magyar Államkincstár működése', 'Magyar Államkincstár'),
(160, '11.B', '11:30:00', '11:50:00', 'A Magyar Államkincstár működése', 'Magyar Államkincstár'),
(161, '9.A', '08:00:00', '08:20:00', 'AI és az infokommunikációs szektor: drónok, űrkutatás, kvant', 'Maszlov Leon'),
(162, '9.A', '08:30:00', '08:50:00', 'AI és az infokommunikációs szektor: drónok, űrkutatás, kvant', 'Maszlov Leon'),
(163, '9.A', '09:00:00', '09:20:00', 'AI és az infokommunikációs szektor: drónok, űrkutatás, kvant', 'Maszlov Leon'),
(164, '9.A', '09:30:00', '09:50:00', 'AI és az infokommunikációs szektor: drónok, űrkutatás, kvant', 'Maszlov Leon'),
(165, '9.A', '10:00:00', '10:20:00', 'AI és az infokommunikációs szektor: drónok, űrkutatás, kvant', 'Maszlov Leon'),
(166, '9.A', '10:30:00', '10:50:00', 'AI és az infokommunikációs szektor: drónok, űrkutatás, kvant', 'Maszlov Leon'),
(167, '9.A', '11:00:00', '11:20:00', 'AI és az infokommunikációs szektor: drónok, űrkutatás, kvant', 'Maszlov Leon'),
(168, '9.A', '11:30:00', '11:50:00', 'AI és az infokommunikációs szektor: drónok, űrkutatás, kvant', 'Maszlov Leon'),
(169, '10.A', '08:00:00', '08:20:00', 'Irány Franciaország! - kerékpárral', 'Király Bernadett'),
(170, '10.A', '08:30:00', '08:50:00', 'Irány Franciaország! - kerékpárral', 'Király Bernadett'),
(171, '10.A', '09:00:00', '09:20:00', 'Irány Franciaország! - kerékpárral', 'Király Bernadett'),
(172, '10.A', '09:30:00', '09:50:00', 'Irány Franciaország! - kerékpárral', 'Király Bernadett'),
(173, '10.A', '10:00:00', '10:20:00', 'Irány Franciaország! - kerékpárral', 'Király Bernadett'),
(174, '10.A', '10:30:00', '10:50:00', 'Irány Franciaország! - kerékpárral', 'Király Bernadett'),
(175, '10.A', '11:00:00', '11:20:00', 'Irány Franciaország! - kerékpárral', 'Király Bernadett'),
(176, '10.A', '11:30:00', '11:50:00', 'Irány Franciaország! - kerékpárral', 'Király Bernadett'),
(177, '10.B', '08:00:00', '08:20:00', 'Egyetemi tanulmányok, karrierlehetőségek, munkatapasztalatok', 'Molnár Levente és Zsigrai Hanna'),
(178, '10.B', '08:30:00', '08:50:00', 'Egyetemi tanulmányok, karrierlehetőségek, munkatapasztalatok', 'Molnár Levente és Zsigrai Hanna'),
(179, '10.B', '09:00:00', '09:20:00', 'Egyetemi tanulmányok, karrierlehetőségek, munkatapasztalatok', 'Molnár Levente és Zsigrai Hanna'),
(180, '10.B', '09:30:00', '09:50:00', 'Egyetemi tanulmányok, karrierlehetőségek, munkatapasztalatok', 'Molnár Levente és Zsigrai Hanna'),
(181, '10.B', '10:00:00', '10:20:00', 'Egyetemi tanulmányok, karrierlehetőségek, munkatapasztalatok', 'Molnár Levente és Zsigrai Hanna'),
(182, '10.B', '10:30:00', '10:50:00', 'Egyetemi tanulmányok, karrierlehetőségek, munkatapasztalatok', 'Molnár Levente és Zsigrai Hanna'),
(183, '10.B', '11:00:00', '11:20:00', 'Egyetemi tanulmányok, karrierlehetőségek, munkatapasztalatok', 'Molnár Levente és Zsigrai Hanna'),
(184, '10.B', '11:30:00', '11:50:00', 'Egyetemi tanulmányok, karrierlehetőségek, munkatapasztalatok', 'Molnár Levente és Zsigrai Hanna'),
(185, '12.A', '08:00:00', '08:20:00', 'Interaktív játékok', 'Pálos Károly Családsegítő Központ és munkatársai'),
(186, '12.A', '08:30:00', '08:50:00', 'Interaktív játékok', 'Pálos Károly Családsegítő Központ és munkatársai'),
(187, '12.A', '09:00:00', '09:20:00', 'Interaktív játékok', 'Pálos Károly Családsegítő Központ és munkatársai'),
(188, '12.A', '09:30:00', '09:50:00', 'Interaktív játékok', 'Pálos Károly Családsegítő Központ és munkatársai'),
(189, '12.A', '10:00:00', '10:20:00', 'Interaktív játékok', 'Pálos Károly Családsegítő Központ és munkatársai'),
(190, '12.A', '10:30:00', '10:50:00', 'Interaktív játékok', 'Pálos Károly Családsegítő Központ és munkatársai'),
(191, '12.A', '11:00:00', '11:20:00', 'Interaktív játékok', 'Pálos Károly Családsegítő Központ és munkatársai'),
(192, '12.A', '11:30:00', '11:50:00', 'Interaktív játékok', 'Pálos Károly Családsegítő Központ és munkatársai'),
(193, '9.B', '08:00:00', '08:20:00', 'Élj tudatosan és felelősségteljesen!', 'Hívásfogadó Központ'),
(194, '9.B', '08:30:00', '08:50:00', 'Élj tudatosan és felelősségteljesen!', 'Hívásfogadó Központ'),
(195, '9.B', '09:00:00', '09:20:00', 'Élj tudatosan és felelősségteljesen!', 'Hívásfogadó Központ'),
(196, '9.B', '09:30:00', '09:50:00', 'Élj tudatosan és felelősségteljesen!', 'Hívásfogadó Központ'),
(197, '9.B', '10:00:00', '10:20:00', 'Élj tudatosan és felelősségteljesen!', 'Hívásfogadó Központ'),
(198, '9.B', '10:30:00', '10:50:00', 'Élj tudatosan és felelősségteljesen!', 'Hívásfogadó Központ'),
(199, '9.B', '11:00:00', '11:20:00', 'Élj tudatosan és felelősségteljesen!', 'Hívásfogadó Központ'),
(200, '9.B', '11:30:00', '11:50:00', 'Élj tudatosan és felelősségteljesen!', 'Hívásfogadó Központ'),
(201, '10.D', '08:00:00', '08:20:00', 'Corvinus Egyetem, TDK, munkatapasztalat', 'Horváth Balázs'),
(202, '10.D', '08:30:00', '08:50:00', 'Corvinus Egyetem, TDK, munkatapasztalat', 'Horváth Balázs'),
(203, '10.D', '09:00:00', '09:20:00', 'Corvinus Egyetem, TDK, munkatapasztalat', 'Horváth Balázs'),
(204, '10.D', '09:30:00', '09:50:00', 'Corvinus Egyetem, TDK, munkatapasztalat', 'Horváth Balázs'),
(205, '10.D', '10:00:00', '10:20:00', 'Corvinus Egyetem, TDK, munkatapasztalat', 'Horváth Balázs'),
(206, '10.D', '10:30:00', '10:50:00', 'Corvinus Egyetem, TDK, munkatapasztalat', 'Horváth Balázs'),
(207, '10.D', '11:00:00', '11:20:00', 'Corvinus Egyetem, TDK, munkatapasztalat', 'Horváth Balázs'),
(208, '10.D', '11:30:00', '11:50:00', 'Corvinus Egyetem, TDK, munkatapasztalat', 'Horváth Balázs'),
(209, '11.A', '08:00:00', '08:20:00', 'Egyetemi tanulmányok, munkatapasztalatok – Pannon Egyetem', 'Németh Roland'),
(210, '11.A', '08:30:00', '08:50:00', 'Egyetemi tanulmányok, munkatapasztalatok – Pannon Egyetem', 'Németh Roland'),
(211, '11.A', '09:00:00', '09:20:00', 'Egyetemi tanulmányok, munkatapasztalatok – Pannon Egyetem', 'Németh Roland'),
(212, '11.A', '09:30:00', '09:50:00', 'Egyetemi tanulmányok, munkatapasztalatok – Pannon Egyetem', 'Németh Roland'),
(213, '11.A', '10:00:00', '10:20:00', 'Egyetemi tanulmányok, munkatapasztalatok – Pannon Egyetem', 'Németh Roland'),
(214, '11.A', '10:30:00', '10:50:00', 'Egyetemi tanulmányok, munkatapasztalatok – Pannon Egyetem', 'Németh Roland'),
(215, '11.A', '11:00:00', '11:20:00', 'Egyetemi tanulmányok, munkatapasztalatok – Pannon Egyetem', 'Németh Roland'),
(216, '11.A', '11:30:00', '11:50:00', 'Egyetemi tanulmányok, munkatapasztalatok – Pannon Egyetem', 'Németh Roland'),
(217, '11.C', '08:00:00', '08:20:00', 'Erasmus - Prága', '11.C osztály tanulói'),
(218, '11.C', '08:30:00', '08:50:00', 'Erasmus - Prága', '11.C osztály tanulói'),
(219, '11.C', '09:00:00', '09:20:00', 'Erasmus - Prága', '11.C osztály tanulói'),
(220, '11.C', '09:30:00', '09:50:00', 'Erasmus - Prága', '11.C osztály tanulói'),
(221, '11.C', '10:00:00', '10:20:00', 'Erasmus - Prága', '11.C osztály tanulói'),
(222, '11.C', '10:30:00', '10:50:00', 'Erasmus - Prága', '11.C osztály tanulói'),
(223, '11.C', '11:00:00', '11:20:00', 'Erasmus - Prága', '11.C osztály tanulói'),
(224, '11.C', '11:30:00', '11:50:00', 'Erasmus - Prága', '11.C osztály tanulói'),
(225, 'Udvari gép', '08:00:00', '08:20:00', 'A rejtélyes pszichológia', 'Tóth Mariann - pszichológus'),
(226, 'Udvari gép', '08:30:00', '08:50:00', 'A rejtélyes pszichológia', 'Tóth Mariann - pszichológus'),
(227, 'Udvari gép', '09:00:00', '09:20:00', 'A rejtélyes pszichológia', 'Tóth Mariann - pszichológus'),
(228, 'Udvari gép', '09:30:00', '09:50:00', 'A rejtélyes pszichológia', 'Tóth Mariann - pszichológus'),
(229, 'Udvari gép', '10:00:00', '10:20:00', 'A rejtélyes pszichológia', 'Tóth Mariann - pszichológus'),
(230, 'Udvari gép', '10:30:00', '10:50:00', 'A rejtélyes pszichológia', 'Tóth Mariann - pszichológus'),
(231, 'Udvari gép', '11:00:00', '11:20:00', 'A rejtélyes pszichológia', 'Tóth Mariann - pszichológus'),
(232, 'Udvari gép', '11:30:00', '11:50:00', 'A rejtélyes pszichológia', 'Tóth Mariann - pszichológus');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `jelentkezesek`
--

CREATE TABLE `jelentkezesek` (
  `id` int(11) NOT NULL,
  `esemenyId` int(11) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `jelentkezesek`
--

INSERT INTO `jelentkezesek` (`id`, `esemenyId`, `email`) VALUES
(37, 117, 'zoldalma@gmail.com'),
(38, 117, 'kekcsillag@freemail.hu'),
(39, 117, 'pirosnap@citromail.hu'),
(40, 117, 'sargasugar@gmail.com'),
(41, 117, 'lilafelho@outlook.com'),
(42, 117, 'narancslang@yahoo.com'),
(43, 117, 'ezusthold@freemail.hu'),
(44, 117, 'bronztukor@gmail.com'),
(45, 117, 'gyemantpor@citromail.hu'),
(46, 117, 'smaragdvirag@outlook.com'),
(47, 117, 'rubinfeny@gmail.com'),
(48, 117, 'opalcsepp@freemail.hu'),
(49, 117, 'zafirkristaly@yahoo.com'),
(50, 117, 'turmalinszikra@citromail.hu'),
(51, 117, 'ametisztkod@gmail.com');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szemelyek`
--

CREATE TABLE `szemelyek` (
  `email` varchar(30) NOT NULL,
  `nev` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `szemelyek`
--

INSERT INTO `szemelyek` (`email`, `nev`) VALUES
('ametisztkod@gmail.com', 'ametisztköd'),
('asd@gamil.com', 'Molnár Benedek'),
('bronztukor@gmail.com', 'bronztükör'),
('ezusthold@freemail.hu', 'ezüsthold'),
('gyemantpor@citromail.hu', 'gyémántpor'),
('kekcsillag@freemail.hu', 'kékcsillag'),
('lilafelho@outlook.com', 'lilafelhő'),
('molbe05@gmail.com', 'valami'),
('narancslang@yahoo.com', 'narancsláng'),
('opalcsepp@freemail.hu', 'opálcsepp'),
('pirosnap@citromail.hu', 'pirosnap'),
('rubinfeny@gmail.com', 'rubinfény'),
('sargasugar@gmail.com', 'sárgasugár'),
('smaragdvirag@outlook.com', 'smaragdvirág'),
('turmalinszikra@citromail.hu', 'turmalinszikra'),
('zafirkristaly@yahoo.com', 'zafírkristály'),
('zoldalma@gmail.com', 'zöldalma');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `esemeny`
--
ALTER TABLE `esemeny`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `jelentkezesek`
--
ALTER TABLE `jelentkezesek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `szemelyek`
--
ALTER TABLE `szemelyek`
  ADD PRIMARY KEY (`email`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `esemeny`
--
ALTER TABLE `esemeny`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=233;

--
-- AUTO_INCREMENT a táblához `jelentkezesek`
--
ALTER TABLE `jelentkezesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
