-- Backfill venue contact info, locations, Instagram, and Google Maps URLs
-- Data sourced from official websites, Google, Tripadvisor, Zomato

-- ═══════════════════════════════════════════════
-- A - G venues
-- ═══════════════════════════════════════════════

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97144986200',
  instagram_url = 'https://instagram.com/adalinedubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Adaline+DIFC+Dubai'
WHERE title = 'Adaline' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 1', contact_phone = '+97145705546',
  instagram_url = 'https://instagram.com/africanqueen_dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=African+Queen+J1+Beach+Dubai'
WHERE title = 'African Queen' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97145706289',
  instagram_url = 'https://instagram.com/alayadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Alaya+DIFC+Gate+Village+Dubai'
WHERE title = 'Alaya' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97145713999',
  instagram_url = 'https://instagram.com/amazonicodubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Amazonico+DIFC+Dubai'
WHERE title = 'Amazonico' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97143282805',
  instagram_url = 'https://instagram.com/amelia.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Amelia+Address+Sky+View+Dubai'
WHERE title = 'Amelia' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97148805242',
  instagram_url = 'https://instagram.com/arethadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Aretha+St+Regis+Palm+Jumeirah+Dubai'
WHERE title = 'Aretha' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97145703653',
  instagram_url = 'https://instagram.com/arrogantedubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Arrogante+Address+Opera+Dubai'
WHERE title = 'Arrogante' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Sheikh Zayed Road', contact_phone = '+971527812222',
  instagram_url = 'https://instagram.com/theavenueclubdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Avenue+Club+Shangri-La+Dubai'
WHERE title = 'Avenue' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 1', contact_phone = '+97144915500',
  instagram_url = 'https://instagram.com/baoli.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Baoli+Beach+J1+Dubai'
WHERE title = 'Baoli' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97144981616',
  instagram_url = 'https://instagram.com/bardespres.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Bar+Des+Pres+ICD+Brookfield+DIFC+Dubai'
WHERE title = 'Bar De Pres' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97148343803',
  instagram_url = 'https://instagram.com/bchclbdxb',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=BCH+CLB+W+Dubai+Palm+Jumeirah'
WHERE title = 'BCH:CLB' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97144559999',
  instagram_url = 'https://instagram.com/beachbyfive',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Beach+by+FIVE+Palm+Jumeirah+Dubai'
WHERE title = 'Beach by FIVE' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+971566783357',
  instagram_url = 'https://instagram.com/billionairedubaiofficial',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Billionaire+Mandarin+Oriental+Downtown+Dubai'
WHERE title = 'Billionaire' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Dubai Marina', contact_phone = '+97144957888',
  instagram_url = 'https://instagram.com/blume_dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Blume+Dubai+Marina'
WHERE title = 'Blume' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97144559989',
  instagram_url = 'https://instagram.com/bohemiabyfive',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Bohemia+FIVE+Palm+Jumeirah+Dubai'
WHERE title = 'Bohemia' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+971522424262',
  instagram_url = 'https://instagram.com/carnivalbytresind',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Carnival+by+Tresind+DIFC+Dubai'
WHERE title = 'Carnival' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 1', contact_phone = '+97147772223',
  instagram_url = 'https://instagram.com/casaamordubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Casa+Amor+Mandarin+Oriental+Jumeira+Dubai'
WHERE title = 'Casa Amor' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97145826111',
  instagram_url = 'https://instagram.com/celavidubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Ce+La+Vi+Address+Sky+View+Dubai'
WHERE title = 'Ce La Vi' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97146052000',
  instagram_url = 'https://instagram.com/chicnonnadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Chic+Nonna+Gate+Avenue+DIFC+Dubai'
WHERE title = 'Chic Nonna' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97144559989',
  instagram_url = 'https://instagram.com/cinquedubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Cinque+FIVE+Palm+Jumeirah+Dubai'
WHERE title = 'Cinque' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'JBR', contact_phone = '+971504546920',
  instagram_url = 'https://instagram.com/covebeachdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Cove+Beach+JBR+Dubai'
WHERE title = 'CoveBeach' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97145653244',
  instagram_url = 'https://instagram.com/coucourooftop',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Cou+Cou+Palm+Tower+Dubai'
WHERE title = 'Cou Cou' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 2', contact_phone = '+97143169600',
  instagram_url = 'https://instagram.com/coyadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Coya+Four+Seasons+Jumeirah+Dubai'
WHERE title = 'Coya' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'JBR', contact_phone = '+97142200224',
  instagram_url = 'https://instagram.com/dreamdubaiofficial',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Dream+Dubai+Address+Beach+Resort+JBR'
WHERE title = 'Dream' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97145104800',
  instagram_url = 'https://instagram.com/evabeachclub',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Eva+Beach+Club+Palm+Jumeirah+Dubai'
WHERE title = 'Eva' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97144559999',
  instagram_url = 'https://instagram.com/fivepalmjumeirah',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=FIVE+Palm+Jumeirah+Dubai'
WHERE title = 'FIVE Venues' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97145897883',
  instagram_url = 'https://instagram.com/galdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=GAL+Address+Downtown+Dubai'
WHERE title = 'GAL' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97145549418',
  instagram_url = 'https://instagram.com/gatsbydubaiofficial',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Gatsby+Nakheel+Mall+Palm+Jumeirah+Dubai'
WHERE title = 'Gatsby' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 1', contact_phone = '+97144983900',
  instagram_url = 'https://instagram.com/gigi_beach_dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Gigi+J1+Beach+Dubai'
WHERE title = 'Gigi' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 1', contact_phone = '+971585662320',
  instagram_url = 'https://instagram.com/gitano.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Gitano+J1+Beach+Dubai'
WHERE title = 'Gitano' AND category IN ('DINING','CLUB');

-- ═══════════════════════════════════════════════
-- H - N venues
-- ═══════════════════════════════════════════════

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97142784844',
  instagram_url = 'https://instagram.com/hanu_dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Hanu+St+Regis+Gardens+Palm+Jumeirah+Dubai'
WHERE title = 'Hanu' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97144981727',
  instagram_url = 'https://instagram.com/gattopardodubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Il+Gattopardo+ICD+Brookfield+DIFC+Dubai'
WHERE title = 'Il''Gatto Pardo' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Umm Suqeim', contact_phone = '+971800323232',
  instagram_url = 'https://instagram.com/ilianadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Iliana+Jumeirah+Marsa+Al+Arab+Dubai'
WHERE title = 'Iliana' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97142433633',
  instagram_url = 'https://instagram.com/kaspia.dxb',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Caviar+Kaspia+DIFC+Dubai'
WHERE title = 'Kaspia' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Umm Suqeim', contact_phone = '+97145408875',
  instagram_url = 'https://instagram.com/kinugawadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Kinugawa+Jumeirah+Marsa+Al+Arab+Dubai'
WHERE title = 'Kinugawa' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97144331258',
  instagram_url = 'https://instagram.com/krasota.restaurant.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Krasota+Address+Downtown+Dubai'
WHERE title = 'Krasota' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Dubai Harbour', contact_phone = '+97142784800',
  instagram_url = 'https://instagram.com/lamobistrodelmare',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=L%27Amo+Bistro+del+Mare+Dubai+Harbour'
WHERE title = 'L''amo Bistro' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97143951300',
  instagram_url = 'https://instagram.com/laninadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=La+Nina+ICD+Brookfield+DIFC+Dubai'
WHERE title = 'La Nina' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Trade Centre', contact_phone = '+97143527105',
  instagram_url = 'https://instagram.com/lacantinedubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=La+Cantine+du+Faubourg+Emirates+Towers+Dubai'
WHERE title = 'La Cantine' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+971566800430',
  instagram_url = 'https://instagram.com/lyladxb',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Ly-La+DIFC+Gate+Village+Dubai'
WHERE title = 'Ly-La' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97144559989',
  instagram_url = 'https://instagram.com/maidenshanghaidubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Maiden+Shanghai+FIVE+Palm+Jumeirah+Dubai'
WHERE title = 'Maiden Shanghai' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+971524066183',
  instagram_url = 'https://instagram.com/maisondecurry',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Maison+De+Curry+Souk+Al+Bahar+Dubai'
WHERE title = 'Maison De Curry' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97143659441',
  instagram_url = 'https://instagram.com/maisondelaplage_',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Maison+de+la+Plage+Palm+West+Beach+Dubai'
WHERE title = 'Maison De La Page' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Bluewaters Island', contact_phone = '+97145432900',
  instagram_url = 'https://instagram.com/maisonrevka_dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Maison+Revka+Delano+Bluewaters+Dubai'
WHERE title = 'Maison Revka' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97144308999',
  instagram_url = 'https://instagram.com/mamabelladubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Mamabella+Kempinski+Boulevard+Dubai'
WHERE title = 'Mamabella' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 2', contact_phone = '+97143794811',
  instagram_url = 'https://instagram.com/mimikakushi',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Mimi+Kakushi+Four+Seasons+Jumeirah+Dubai'
WHERE title = 'Mimi Kakushi' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'JBR', contact_phone = '+97142784832',
  instagram_url = 'https://instagram.com/mott32dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Mott+32+Address+Beach+Resort+JBR+Dubai'
WHERE title = 'Mott 32' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+971522080007',
  instagram_url = 'https://instagram.com/nahate_dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Nahate+DIFC+Gate+Village+Dubai'
WHERE title = 'Nahate' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 2', contact_phone = '+97143401002',
  instagram_url = 'https://instagram.com/nammos.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Nammos+Four+Seasons+Jumeirah+Beach+Dubai'
WHERE title = 'Nammos' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97145424200',
  instagram_url = 'https://instagram.com/nazcaadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Nazcaa+Address+Dubai+Mall'
WHERE title = 'Nazcaa' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Pearl Jumeira', contact_phone = '+97143766000',
  instagram_url = 'https://instagram.com/nikkibeachdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Nikki+Beach+Resort+Pearl+Jumeira+Dubai'
WHERE title = 'Nikki Beach' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 1', contact_phone = '+97144984200',
  instagram_url = 'https://instagram.com/ninivebeachdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Ninive+Beach+J1+Jumeirah+Dubai'
WHERE title = 'Ninive beach' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97144260760',
  instagram_url = 'https://instagram.com/nobudubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Nobu+Atlantis+The+Palm+Dubai'
WHERE title = 'Nobu' AND category IN ('DINING','CLUB');

-- ═══════════════════════════════════════════════
-- O - Z venues
-- ═══════════════════════════════════════════════

UPDATE catalog_items SET
  location = 'Dubai Marina', contact_phone = '+971528580464',
  instagram_url = 'https://instagram.com/obeachdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=O+Beach+Dubai+Marina'
WHERE title = 'O Beach' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Trade Centre', contact_phone = '+97143570557',
  instagram_url = 'https://instagram.com/opadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Opa+Fairmont+Dubai+Sheikh+Zayed+Road'
WHERE title = 'Opa' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Al Habtoor City', contact_phone = '+971507705159',
  instagram_url = 'https://instagram.com/cluboradubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Ora+Club+Hilton+Al+Habtoor+City+Dubai'
WHERE title = 'Ora' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'JBR', contact_phone = '+97142759999',
  instagram_url = 'https://instagram.com/pachaicons',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Pacha+Icons+FIVE+LUXE+JBR+Dubai'
WHERE title = 'Pacha Icons' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Business Bay',
  instagram_url = 'https://instagram.com/parisparadis.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Paris+Paradis+Taj+Dubai+Business+Bay'
WHERE title = 'Paris Paradis' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'JBR', contact_phone = '+97144559989',
  instagram_url = 'https://instagram.com/playapachadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Playa+Pacha+FIVE+LUXE+JBR+Dubai'
WHERE title = 'Playa Pacha' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97144559999',
  instagram_url = 'https://instagram.com/fivepalmjumeirah',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Pool+by+FIVE+Palm+Jumeirah+Dubai'
WHERE title = 'Pool by FIVE' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97144308222',
  instagram_url = 'https://instagram.com/ramenrolldubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Ram+Roll+Kempinski+Boulevard+Dubai'
WHERE title = 'Ram & Roll' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97142725373',
  instagram_url = 'https://instagram.com/raspoutine.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Raspoutine+DIFC+Dubai'
WHERE title = 'Raspoutine' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Dubai Hills', contact_phone = '+971521432426',
  instagram_url = 'https://instagram.com/revelry.ae',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Revelry+Dubai+Hills'
WHERE title = 'Revelry' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Umm Suqeim', contact_phone = '+971800323232',
  instagram_url = 'https://instagram.com/rialtodubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Rialto+Jumeirah+Marsa+Al+Arab+Dubai'
WHERE title = 'Rialto' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah 1', contact_phone = '+97144951600',
  instagram_url = 'https://instagram.com/sakhalin.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Sakhalin+J1+Beach+Dubai'
WHERE title = 'Sakhalin' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97145703653',
  instagram_url = 'https://instagram.com/salvaje.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Salvaje+Address+Opera+Downtown+Dubai'
WHERE title = 'Salvaje' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Madinat Jumeirah', contact_phone = '+971588142936',
  instagram_url = 'https://instagram.com/sana_restaurantdxb',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Sana+Madinat+Jumeirah+Dubai'
WHERE title = 'Sana' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC', contact_phone = '+97143819000',
  instagram_url = 'https://instagram.com/sexyfishdxb',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Sexy+Fish+Innovation+One+DIFC+Dubai'
WHERE title = 'Sexy Fish' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97142784848',
  instagram_url = 'https://instagram.com/signorsassidubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Signor+Sassi+St+Regis+Gardens+Palm+Jumeirah+Dubai'
WHERE title = 'Signor Sassi' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97145895444',
  instagram_url = 'https://instagram.com/surfclubdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Surf+Club+Palm+West+Beach+Dubai'
WHERE title = 'Surf Club' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Palm Jumeirah', contact_phone = '+97142784888',
  instagram_url = 'https://instagram.com/sushisambadubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Sushi+Samba+St+Regis+Palm+Jumeirah+Dubai'
WHERE title = 'Sushi Samba' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+971556633071',
  instagram_url = 'https://instagram.com/tang_dubai_downtown',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Tang+Palace+Downtown+Dubai'
WHERE title = 'Tang' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Dubai Marina', contact_phone = '+97144985400',
  instagram_url = 'https://instagram.com/tattudubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Tattu+Ciel+Tower+Dubai+Marina'
WHERE title = 'Tattu' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jebel Ali', contact_phone = '+971509352344',
  instagram_url = 'https://instagram.com/terrasolisdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Terra+Solis+by+Tomorrowland+Dubai'
WHERE title = 'Terra Solis' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Sheikh Zayed Road', contact_phone = '+97142222268',
  instagram_url = 'https://instagram.com/thetheaterdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Theater+Fairmont+Dubai+Sheikh+Zayed+Road'
WHERE title = 'Theater' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Sheikh Zayed Road', contact_phone = '+97143080440',
  instagram_url = 'https://instagram.com/tresinddubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Tresind+Studio+Dubai'
WHERE title = 'Trésind' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+971525545997',
  instagram_url = 'https://instagram.com/urla',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Urla+Address+Downtown+Dubai'
WHERE title = 'Urla' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Umm Suqeim', contact_phone = '+97142285053',
  instagram_url = 'https://instagram.com/verdebeachdubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Verde+Beach+Jumeirah+Beach+Hotel+Dubai'
WHERE title = 'Verde Beach' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Jumeirah Beach', contact_phone = '+97143338025',
  instagram_url = 'https://instagram.com/verde.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Verde+Restaurant+Four+Seasons+Jumeirah+Dubai'
WHERE title = 'Verde Restaurant' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'DIFC',
  instagram_url = 'https://instagram.com/villa.coconutdifc',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Villa+Coconut+Gate+Avenue+DIFC+Dubai'
WHERE title = 'Villa Coconut' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97144308111',
  instagram_url = 'https://instagram.com/woohoo.dubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Woohoo+Kempinski+Boulevard+Dubai'
WHERE title = 'Woohoo' AND category IN ('DINING','CLUB');

UPDATE catalog_items SET
  location = 'Downtown Dubai', contact_phone = '+97148377222',
  instagram_url = 'https://instagram.com/zenondubai',
  google_maps_url = 'https://www.google.com/maps/search/?api=1&query=Zenon+Kempinski+Central+Avenue+Dubai'
WHERE title = 'Zenon' AND category IN ('DINING','CLUB');
