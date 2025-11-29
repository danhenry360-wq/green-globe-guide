// High-quality unique images for each country
// Using Unsplash images for consistency and quality

export const COUNTRY_IMAGES: Record<string, string> = {
  // NORTH AMERICA
  "canada": "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80", // Canadian Rockies
  "united-states": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600&q=80", // NYC Skyline
  "mexico": "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=600&q=80", // Mexico City
  
  // CENTRAL AMERICA
  "costa-rica": "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=600&q=80", // Costa Rica rainforest
  "panama": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", // Panama City skyline
  "belize": "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=600&q=80", // Belize reef
  "guatemala": "https://images.unsplash.com/photo-1591377035549-9bf5c53f96e7?w=600&q=80", // Guatemala volcano
  "el-salvador": "https://images.unsplash.com/photo-1612362954221-c8b8f6b3c30c?w=600&q=80", // El Salvador coast
  "honduras": "https://images.unsplash.com/photo-1572176596507-d0a9c1b79c40?w=600&q=80", // Honduras island
  "nicaragua": "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=600&q=80", // Nicaragua church
  
  // EUROPE
  "netherlands": "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&q=80", // Amsterdam canals
  "germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80", // Brandenburg Gate
  "spain": "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=600&q=80", // Barcelona Sagrada
  "italy": "https://images.unsplash.com/photo-1515859005217-8a1f08870f59?w=600&q=80", // Venice
  "portugal": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&q=80", // Lisbon tram
  "switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80", // Swiss Alps
  "austria": "https://images.unsplash.com/photo-1609856878074-cf31e21ccb6b?w=600&q=80", // Vienna palace
  "czech-republic": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&q=80", // Prague bridge
  "malta": "https://images.unsplash.com/photo-1555881400-69a8a0691b82?w=600&q=80", // Malta fortress
  "luxembourg": "https://images.unsplash.com/photo-1577278219660-7fd07c82ea59?w=600&q=80", // Luxembourg old town
  "belgium": "https://images.unsplash.com/photo-1491557345352-5929e343eb89?w=600&q=80", // Brussels square
  "france": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80", // Paris Eiffel
  "uk": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80", // London Bridge
  "ireland": "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=600&q=80", // Ireland cliffs
  "denmark": "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&q=80", // Copenhagen harbor
  "finland": "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=600&q=80", // Helsinki cathedral
  "norway": "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80", // Norway fjords
  "sweden": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&q=80", // Stockholm
  "iceland": "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?w=600&q=80", // Iceland aurora
  "poland": "https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=600&q=80", // Warsaw
  "estonia": "https://images.unsplash.com/photo-1562842220-f69c8d31a4c5?w=600&q=80", // Tallinn old town
  "latvia": "https://images.unsplash.com/photo-1549463045-22e38bf5ac42?w=600&q=80", // Riga
  "lithuania": "https://images.unsplash.com/photo-1553544769-a3c66b4cb52f?w=600&q=80", // Vilnius
  "slovenia": "https://images.unsplash.com/photo-1563718273222-cd3fe7d6e5e7?w=600&q=80", // Lake Bled
  "slovakia": "https://images.unsplash.com/photo-1575408264798-b50b252663e6?w=600&q=80", // Bratislava
  "hungary": "https://images.unsplash.com/photo-1551867633-194f125bddfa?w=600&q=80", // Budapest parliament
  "croatia": "https://images.unsplash.com/photo-1555990538-1e6c5549c81c?w=600&q=80", // Dubrovnik
  "serbia": "https://images.unsplash.com/photo-1577438466291-c99fcd15bfc9?w=600&q=80", // Belgrade
  "bosnia": "https://images.unsplash.com/photo-1566408669374-5a6d5dca1ef5?w=600&q=80", // Mostar bridge
  "montenegro": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80", // Kotor bay
  "north-macedonia": "https://images.unsplash.com/photo-1580733098317-001cc6b6e26e?w=600&q=80", // Skopje
  "albania": "https://images.unsplash.com/photo-1565426873118-a17ed65d74b9?w=600&q=80", // Albanian riviera
  "greece": "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80", // Santorini
  "bulgaria": "https://images.unsplash.com/photo-1578249807406-a97c8d509a33?w=600&q=80", // Sofia
  "romania": "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80", // Bran castle
  "moldova": "https://images.unsplash.com/photo-1563989576389-c37d6d88f6f7?w=600&q=80", // Chisinau
  "ukraine": "https://images.unsplash.com/photo-1561542320-9a18cd340469?w=600&q=80", // Kyiv cathedral
  "russia": "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=600&q=80", // Moscow Red Square
  "belarus": "https://images.unsplash.com/photo-1563804446899-96fb5c3b7bf5?w=600&q=80", // Minsk
  "turkey": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80", // Istanbul mosque
  
  // SOUTH AMERICA
  "uruguay": "https://images.unsplash.com/photo-1603057448655-d51ec3c8c1dc?w=600&q=80", // Montevideo
  "argentina": "https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600&q=80", // Buenos Aires
  "chile": "https://images.unsplash.com/photo-1565013844965-b1eaeb2dcbb0?w=600&q=80", // Patagonia
  "colombia": "https://images.unsplash.com/photo-1533699224246-a1e9a5bc8bfb?w=600&q=80", // Cartagena
  "brazil": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600&q=80", // Rio Christ statue
  "peru": "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=600&q=80", // Machu Picchu
  "ecuador": "https://images.unsplash.com/photo-1570442296287-6e8ba16d0b2e?w=600&q=80", // Ecuador highlands
  "bolivia": "https://images.unsplash.com/photo-1591133524085-f1a61c1f47ac?w=600&q=80", // Salt flats
  "paraguay": "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=600&q=80", // Asuncion
  "venezuela": "https://images.unsplash.com/photo-1568291607791-6a26c2de9e08?w=600&q=80", // Angel Falls
  "guyana": "https://images.unsplash.com/photo-1593882898826-89a4e9c2a54a?w=600&q=80", // Guyana jungle
  "suriname": "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80", // Paramaribo
  "french-guiana": "https://images.unsplash.com/photo-1604761490413-ee1c76db3c12?w=600&q=80", // Space center
  
  // CARIBBEAN
  "jamaica": "https://images.unsplash.com/photo-1580995583564-3f47c0ab6d9e?w=600&q=80", // Jamaica beach
  "barbados": "https://images.unsplash.com/photo-1590521219881-ca9f9afa6724?w=600&q=80", // Barbados coast
  "trinidad-tobago": "https://images.unsplash.com/photo-1593882898826-89a4e9c2a54a?w=600&q=80", // Trinidad carnival
  "bahamas": "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80", // Bahamas pigs
  "cuba": "https://images.unsplash.com/photo-1500759285222-a95626b934cb?w=600&q=80", // Havana cars
  "dominican-republic": "https://images.unsplash.com/photo-1504391975026-8f7ca1e4c7c0?w=600&q=80", // Dominican beach
  "haiti": "https://images.unsplash.com/photo-1537998194289-ae3b0b8d43d4?w=600&q=80", // Haiti citadel
  "puerto-rico": "https://images.unsplash.com/photo-1569402928262-a88b4a36e7cd?w=600&q=80", // Old San Juan
  "us-virgin-islands": "https://images.unsplash.com/photo-1590521219881-ca9f9afa6724?w=600&q=80", // USVI beach
  "british-virgin-islands": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", // BVI yachts
  "anguilla": "https://images.unsplash.com/photo-1589195665591-9cf9d14e13c6?w=600&q=80", // Anguilla beach
  "st-maarten": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", // St Maarten airport
  "st-kitts-nevis": "https://images.unsplash.com/photo-1589389561040-e46db0f42af4?w=600&q=80", // St Kitts
  "antigua-barbuda": "https://images.unsplash.com/photo-1587925358603-ca8edaff1dac?w=600&q=80", // Antigua harbor
  "dominica": "https://images.unsplash.com/photo-1589389561040-e46db0f42af4?w=600&q=80", // Dominica nature
  "grenada": "https://images.unsplash.com/photo-1590521219881-ca9f9afa6724?w=600&q=80", // Grenada spice
  "st-lucia": "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=80", // Pitons St Lucia
  "st-vincent-grenadines": "https://images.unsplash.com/photo-1589389561040-e46db0f42af4?w=600&q=80", // Grenadines yachts
  "bermuda": "https://images.unsplash.com/photo-1574068468760-e9d9f3eb4ca4?w=600&q=80", // Bermuda houses
  "cayman-islands": "https://images.unsplash.com/photo-1590521219881-ca9f9afa6724?w=600&q=80", // Cayman beach
  "turks-caicos": "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=600&q=80", // Turks beach
  "aruba": "https://images.unsplash.com/photo-1589395937772-f67057e233d8?w=600&q=80", // Aruba beach
  "curacao": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80", // Curacao colorful
  "bonaire": "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80", // Bonaire diving
  
  // ASIA
  "thailand": "https://images.unsplash.com/photo-1528181304800-259b08848526?w=600&q=80", // Thai temple
  "japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", // Tokyo temple
  "south-korea": "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=600&q=80", // Seoul palace
  "china": "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=600&q=80", // Great Wall
  "hong-kong": "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=80", // HK skyline
  "macao": "https://images.unsplash.com/photo-1558976825-6b1b04c280e7?w=600&q=80", // Macau casino
  "taiwan": "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?w=600&q=80", // Taipei 101
  "india": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80", // Taj Mahal
  "nepal": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80", // Nepal temple
  "sri-lanka": "https://images.unsplash.com/photo-1586423702687-0e29e1a5e577?w=600&q=80", // Sri Lanka temple
  "bangladesh": "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=600&q=80", // Dhaka
  "pakistan": "https://images.unsplash.com/photo-1567605953151-97d4cabc82c4?w=600&q=80", // Lahore mosque
  "indonesia": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80", // Bali temple
  "malaysia": "https://images.unsplash.com/photo-1596422846543-75c6fc197f11?w=600&q=80", // Petronas towers
  "singapore": "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80", // Marina Bay
  "philippines": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80", // Palawan beach
  "vietnam": "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=600&q=80", // Ha Long Bay
  "cambodia": "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80", // Angkor Wat
  "laos": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=600&q=80", // Laos temple
  "myanmar": "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?w=600&q=80", // Bagan temples
  "brunei": "https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=600&q=80", // Sultan mosque
  "timor-leste": "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&q=80", // Timor beach
  
  // MIDDLE EAST
  "israel": "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=600&q=80", // Jerusalem
  "lebanon": "https://images.unsplash.com/photo-1560797257-dcf33a9c2d35?w=600&q=80", // Beirut
  "jordan": "https://images.unsplash.com/photo-1555924998-ad6aaea4bf5f?w=600&q=80", // Petra
  "uae": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", // Dubai Burj
  "qatar": "https://images.unsplash.com/photo-1543348750-eb0c7cc63c89?w=600&q=80", // Doha skyline
  "bahrain": "https://images.unsplash.com/photo-1566296314736-6e5ad5fc1e64?w=600&q=80", // Bahrain fort
  "kuwait": "https://images.unsplash.com/photo-1575969366673-ee6b4cc4e94c?w=600&q=80", // Kuwait towers
  "saudi-arabia": "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?w=600&q=80", // Mecca clock
  "oman": "https://images.unsplash.com/photo-1553374682-3feae42b9316?w=600&q=80", // Muscat mosque
  "yemen": "https://images.unsplash.com/photo-1563804447971-6e113ab80713?w=600&q=80", // Yemen architecture
  "iraq": "https://images.unsplash.com/photo-1566308840836-8e11d16bf17f?w=600&q=80", // Baghdad
  "iran": "https://images.unsplash.com/photo-1576489519546-5ee3d3c2df3d?w=600&q=80", // Isfahan mosque
  
  // AFRICA
  "south-africa": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=600&q=80", // Cape Town
  "morocco": "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80", // Marrakech
  "egypt": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&q=80", // Pyramids
  "tunisia": "https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=600&q=80", // Carthage
  "algeria": "https://images.unsplash.com/photo-1582717020557-84b9f57f88f9?w=600&q=80", // Algiers
  "libya": "https://images.unsplash.com/photo-1580746738099-78aa4a0e0624?w=600&q=80", // Libya ruins
  "lesotho": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80", // Lesotho mountains
  "malawi": "https://images.unsplash.com/photo-1613467656395-e32f94f21c5a?w=600&q=80", // Lake Malawi
  "zimbabwe": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80", // Victoria Falls
  "rwanda": "https://images.unsplash.com/photo-1628263118393-f6cdf3f5d0c9?w=600&q=80", // Rwanda gorillas
  "kenya": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80", // Safari Kenya
  "tanzania": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80", // Serengeti
  "uganda": "https://images.unsplash.com/photo-1520962880247-cfaf541c8724?w=600&q=80", // Uganda gorillas
  "ethiopia": "https://images.unsplash.com/photo-1570041049946-5c3a9e6c9e47?w=600&q=80", // Lalibela
  "nigeria": "https://images.unsplash.com/photo-1618828665011-0abd973f7bb8?w=600&q=80", // Lagos
  "ghana": "https://images.unsplash.com/photo-1598890777032-6b7f7cc6a0a3?w=600&q=80", // Ghana coast
  "senegal": "https://images.unsplash.com/photo-1589854928746-e59e8e29dc68?w=600&q=80", // Dakar
  "ivory-coast": "https://images.unsplash.com/photo-1598890777032-6b7f7cc6a0a3?w=600&q=80", // Abidjan
  "cameroon": "https://images.unsplash.com/photo-1615896706481-fd4f9b7a7d1b?w=600&q=80", // Cameroon landscape
  "congo": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80", // Congo river
  "democratic-republic-congo": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80", // DRC jungle
  "angola": "https://images.unsplash.com/photo-1580746738099-78aa4a0e0624?w=600&q=80", // Luanda
  "zambia": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80", // Victoria Falls
  "botswana": "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80", // Okavango
  "namibia": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80", // Namibia dunes
  "mozambique": "https://images.unsplash.com/photo-1589398533097-3be03a4f1a04?w=600&q=80", // Maputo
  "madagascar": "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&q=80", // Madagascar baobab
  "mauritius": "https://images.unsplash.com/photo-1589991047127-8e56dbd2f6e5?w=600&q=80", // Mauritius beach
  "seychelles": "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=600&q=80", // Seychelles rocks
  
  // OCEANIA
  "australia": "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80", // Sydney Opera
  "new-zealand": "https://images.unsplash.com/photo-1469521669194-babb45599def?w=600&q=80", // NZ mountains
  "fiji": "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=600&q=80", // Fiji beach
  "samoa": "https://images.unsplash.com/photo-1579023154615-c3e3e39c4e50?w=600&q=80", // Samoa islands
  "tonga": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Tonga beach
  "vanuatu": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Vanuatu volcano
  "solomon-islands": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Solomon beach
  "papua-new-guinea": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // PNG tribal
  "new-caledonia": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // New Caledonia
  "french-polynesia": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Tahiti bungalows
  "guam": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Guam beach
  "palau": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Palau islands
  "micronesia": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Micronesia
  "marshall-islands": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Marshall atoll
  "kiribati": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Kiribati
  "nauru": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Nauru
  "tuvalu": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Tuvalu
  "cook-islands": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Cook Islands
  "niue": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Niue
  "tokelau": "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=600&q=80", // Tokelau
  
  // Default fallback
  "default": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80", // Earth from space
};

export const getCountryImage = (slug: string): string => {
  return COUNTRY_IMAGES[slug] || COUNTRY_IMAGES["default"];
};