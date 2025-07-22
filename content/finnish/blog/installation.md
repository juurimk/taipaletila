---
title: "Kuinka Asentaa Meghna Hugo"
date: 2018-09-12T14:51:12+06:00
author: Mark Dinn
image_webp: images/blog/meghna.webp
image: images/blog/meghna.jpg
description : "Tämä on meta-kuvaus"
---

## Asenna tämä malli seuraamalla näitä yksinkertaisia vaiheita:

### VAIHE-1 : Hugo asennus

Tarkista tämä linkki alta Hugo:n asentamiseksi tietokoneellesi.
[hugo asennusohjeet](https://gohugo.io/getting-started/installing/)

### VAIHE-2 : Luo projektisi

Hugo tarjoaa `new` komennon uuden verkkosivuston luomiseen.

```
hugo new site <uusi_projekti>
```

### VAIHE-3 : Asenna teema
Aja tämä komento
```
hugo new site meghna-hugo
```
ja mene sitten themes-kansioon meghna-hugo kansion sisällä. Voit myös käyttää tätä komentoa ```cd meghna-hugo/themes``` mennäksesi tähän kansioon.
Aja sitten komento 
```
git clone git@github.com:themefisher/meghna-hugo.git
```

Vaihtoehtoisesti voit [ladata teeman .zip tiedostona](https://github.com/themefisher/meghna-hugo/archive/master.zip) ja purkaa sen `themes` hakemistoon

Sen jälkeen sinun täytyy mennä `meghna-hugo/exampleSite` kansioon ja kopioida tai leikata kaikki elementit, ja nyt palata takaisin juurikansioon ja liittää se tänne.

avaa komentokehote uudelleen ja aja `cd ../` komento palataksesi juurikansioon.

### VAIHE-4 : Isännöi paikallisesti

Käynnistä verkkosivusto paikallisesti käyttämällä seuraavaa komentoa:

```
hugo serve
```

Mene osoitteeseen `http://localhost:1313`

Tai voit tarkistaa tämän video-ohjeen tämän mallin asentamiseen:
{{< youtube 3O3qvDoVp5g >}}

### VAIHE-5 : Peruskonfiguraatio

Kun rakennat verkkosivustoa, voit asettaa teeman käyttämällä `--theme` vaihtoehtoa. Suosittelemme kuitenkin, että muokkaat konfiguraatiotiedostoa (`config.toml`) ja asetat teeman oletukseksi.

```toml
# Vaihda oletusteema käytettäväksi kun rakennat sivustoa Hugolla
theme = "meghna-hugo"
```

### VAIHE-6 : Luo ensimmäiset sisältösivusi

```
hugo new blog/artikkelin-nimi.md
```

### VAIHE-7 : Rakenna verkkosivusto

Kun sivustosi on valmis julkaistavaksi, aja seuraava komento:

```
hugo

# Voit myös luoda minifoidun version käyttämällä tätä komentoa:
hugo--minify

```

`public` kansio luodaan, sisältäen kaiken staattisen sisällön ja resurssit verkkosivustollesi. Se voidaan nyt julkaista missä tahansa verkkopalvelimessa.