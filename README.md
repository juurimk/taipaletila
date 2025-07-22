# juuriai

# Lisää seuraavat tekstit Claude projectin kontekstin kuvaukseen
-Your task is to create new hugo template sections based on user requirements. 
The hugo site files are in path **/home/agent/juuriai/** (vaihda polku hugo site hakemistoon), you can read them and analyze them, but you're not allowed to edit any of the files by your own. You only suggest the changes or produce required files that user then can use.

-All sections have to be fully responsive style

in general use the existing site directory structure and propose any new file additions to be placed in those at fist place. However it is ok and recommended to create new subfolders as needed to follow hugo site templating style.  

-Use css style files in folder **/home/agent/juuriai/assets/css/**  files when creating new sections. Show any new style definitions required to be placed in the end of custom.css and comment which section type they're intended. Use section name in any new style definitions to maintain clear name spaces. 

-Create hugo section templates so that they can have variable number of inputs from data files (yml), there should be one yml file per html section template. There can be several data items per yml file.

- If new page or section template is needed check templates in folder **/home/agent/juuriai/layout** and its subfolders of as starting point at first place. This is important to maintain the whole template consistency and templating coding style coherent. 

Here is one example of the team.yml file for  team.html template:
############################### team ############################
team:
  enable : true
  title : Tiimimme
  team_description: Juuri.ai:n perustajat, Marko ja Marianne, yhdistävät markkinoinnin, automaation ja muotoilun osaamisen yhdeksi palveluksi. Meitä ajaa yksinkertainen ajatus - yrityksillä pitäisi olla vähemmän teknistä säätöä ja enemmän aikaa siihen, mikä vie liiketoimintaa eteenpäin.
  team_member :
    
    # team member loop
    - name : Marko Kari
      image_webp : images/team/team-marko-kari.webp
      image : images/team/team-marko-kari.jpg
      designation : Perustaja, automaatioarkkitehti & sisältöstrategi
      content : Markolla on taukymmenien vuosien tausta markkinoinnissa, sisällöntuotannossa ja tekoäly-pohjaisissa työnkuluissa. Hän rakentaa järjestelmät, jotka tekevät monimutkaisesta yksinkertaista ja varmistaa, että markkinointi toimii myös maanantaisin.
      social :
        - icon : ti-facebook # themify icon pack : https://themify.me/themify-icons
          link : "#"
        - icon : ti-twitter-alt # themify icon pack : https://themify.me/themify-icons
          link : "#"
        - icon : ti-linkedin # themify icon pack : https://themify.me/themify-icons
          link : "#"
        - icon : ti-dribbble # themify icon pack : https://themify.me/themify-icons
          link : "#"
        
    # team member loop
    - name : Marianne Littow
      image_webp : images/team/team-marianne-littow.webp
      image : images/team/team-marianne-littow.png
      designation : Perustaja, AD & brändimuotoilija
      content : Marianne tuo Juuri.ai:hin visuaalisen osaamisen ja tekee brändistäsi tunnistettavan ja luotettavan. Hänen käsissään viestit kiteytyvät kuviksi, jotka tukevat liiketoiminnan tavoitteita ja näyttävät hyvältä.
      social :
        - icon : ti-facebook # themify icon pack : https://themify.me/themify-icons
          link : "#"
        - icon : ti-twitter-alt # themify icon pack : https://themify.me/themify-icons
          link : "#"
        - icon : ti-linkedin # themify icon pack : https://themify.me/themify-icons
          link : "#"
        - icon : ti-dribbble # themify icon pack : https://themify.me/themify-icons
          link : "#"


and here is respective team.html template file:
{{ $data := index site.Data site.Language.Lang }}

{{ if $data.team.team.enable }}
{{ with $data.team.team }}
{{"<!-- Start Our Team -->" | safeHTML}}
<section id="team" class="section">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        {{"<!-- section title -->" | safeHTML}}
        <div class="title text-center wow fadeInUp" data-wow-duration="500ms">
          <h2>{{ with .title }} {{ index (split . " ") 0 | safeHTML }} {{ end }}<span class="color">
            {{ with .title }} {{ after (len (index (split . " ") 0)) . | safeHTML }} {{ end }}</span></h2>
          <div class="border-meghna"></div>
        
          {{ if .team_description }}
          {{"<!-- team description -->" | safeHTML}}

          <div class="team-description text-center wow fadeInUp" data-wow-duration="700ms" data-wow-delay="200ms">
          </br><p>{{ .team_description | safeHTML }}</p>
          </div>
          {{"<!-- /team description -->" | safeHTML}}
          {{ end }}
        
        </div>
      </div>
      {{"<!-- /section title -->" | safeHTML}}

      {{ range .team_member}}
      {{"<!-- team member -->" | safeHTML}}
      <div class="col-lg-3 col-md-6 col-12 wow fadeInDown" data-wow-duration="500ms">
        <div class="team-member">
          <div class="member-photo">
            {{"<!-- member photo -->" | safeHTML}}
            <img class="img-fluid lozad" data-src="{{ .image_webp | absURL }}" onerror="this.onerror=null;this.src='{{ .image | absURL }}'" alt="{{ .name }}">

            {{"<!-- member social profile -->" | safeHTML}}
            <div class="mask">
              <ul class="list-inline">
                {{ range .social }}
                <li class="list-inline-item"><a href="{{ .link | safeURL }}"><i class="{{ .icon }}"></i></a></li>
                {{ end }}
              </ul>
            </div>
          </div>

          {{"<!-- member name & designation -->" | safeHTML}}
          <div class="member-meta">
            <h4>{{ .name }}</h4>
            <span>{{ .designation | markdownify}}</span>
            <p>{{ .content | markdownify }}</p>
          </div>
        </div>
      </div>
      {{"<!-- end team member -->" | safeHTML}}
      {{ end }}
    </div>
  </div>
</section>
{{"<!-- /team -->" | safeHTML}}
{{ end }}
{{ end }}
