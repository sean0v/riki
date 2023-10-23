# Grupu sadalītājs

Grupu sadalītājs ir rīks, kas palīdz sadalīt cilvēkus, pēc to vēlmes strādāt vienam ar otru pamatojoties uz datiem, kuri tiek iegūti no Google forms aplikācijas.

# Kā izveidot config.json

1. Izveidot aplikāciju https://console.cloud.google.com/
2. Pievienot Google Sheets un Google Forms API
3. Izveidot OAuth2 identifikācijas atslēgu
    3.1. Obligāti jānorāda redirect_uri - to jānorāda configā
4. Lejupielādēt OAuth2 klientu.
    4.1 To atverot iekopet client_id un redirect_uri failā config.json

Pēc config.json izveides ir jāizveido forma, piemērs - https://forms.gle/XbnkNir1cDg5uw2t8

# Darba autori
* Emīls A. Sležis
* Dāvis R. Strīķkalējs
* Gustavs Brālītis