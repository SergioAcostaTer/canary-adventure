-- INSERT statements for 10 popular places in the Canary Islands

-- 1. Teide National Park, Tenerife
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'teide-national-park-tenerife',
    ST_GeogFromText('POINT(-16.6291 28.2722)'),
    'Teide National Park, 38300 La Orotava, Santa Cruz de Tenerife, Spain',
    '+34 922 92 23 71',
    'https://www.reservasparquesnacionales.es/real/parquesnac/usu/html/detalle-actividad-oapn.aspx?ii=6ENG&cen=2&act=1',
    'low',
    4.65,
    15420,
    ARRAY['parking', 'visitor_center', 'hiking_trails', 'cable_car', 'restaurant'],
    ARRAY['national_park', 'volcano', 'hiking', 'nature', 'unesco_world_heritage'],
    ARRAY['adventure', 'peaceful', 'inspiring', 'majestic'],
    ARRAY['https://example.com/teide1.jpg', 'https://example.com/teide2.jpg'],
    true,
    true
);

-- 2. Maspalomas Dunes, Gran Canaria
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'maspalomas-dunes-gran-canaria',
    ST_GeogFromText('POINT(-15.5857 27.7456)'),
    'Maspalomas Dunes, 35100 San Bartolomé de Tirajana, Las Palmas, Spain',
    NULL,
    'https://www.grancanaria.com/turismo/en/nature/beaches/maspalomas-beach/',
    'free',
    4.45,
    8930,
    ARRAY['parking', 'beach_access', 'restaurants_nearby', 'restrooms'],
    ARRAY['beach', 'dunes', 'nature_reserve', 'swimming', 'photography'],
    ARRAY['relaxing', 'romantic', 'peaceful', 'stunning'],
    ARRAY['https://example.com/maspalomas1.jpg', 'https://example.com/maspalomas2.jpg'],
    true,
    true
);

-- 3. Timanfaya National Park, Lanzarote
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'timanfaya-national-park-lanzarote',
    ST_GeogFromText('POINT(-13.8312 29.0308)'),
    'Timanfaya National Park, 35570 Yaiza, Las Palmas, Spain',
    '+34 928 11 80 42',
    'https://www.reservasparquesnacionales.es/real/parquesnac/usu/html/detalle-actividad-oapn.aspx?ii=6ENG&cen=8&act=1',
    'medium',
    4.55,
    12340,
    ARRAY['visitor_center', 'guided_tours', 'bus_tours', 'restaurant', 'parking'],
    ARRAY['national_park', 'volcanic', 'geology', 'tours', 'unique_landscape'],
    ARRAY['otherworldly', 'fascinating', 'dramatic', 'memorable'],
    ARRAY['https://example.com/timanfaya1.jpg', 'https://example.com/timanfaya2.jpg'],
    true,
    true
);

-- 4. Playa de las Canteras, Las Palmas
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'playa-las-canteras-las-palmas',
    ST_GeogFromText('POINT(-15.4500 28.1350)'),
    'Playa de Las Canteras, 35007 Las Palmas de Gran Canaria, Spain',
    NULL,
    'https://www.lpavisit.com/en/beaches/canteras-beach',
    'free',
    4.35,
    6780,
    ARRAY['beach_bars', 'restaurants', 'promenade', 'water_sports', 'parking'],
    ARRAY['urban_beach', 'swimming', 'surfing', 'dining', 'nightlife'],
    ARRAY['vibrant', 'lively', 'social', 'energetic'],
    ARRAY['https://example.com/canteras1.jpg', 'https://example.com/canteras2.jpg'],
    true,
    true
);

-- 5. Garajonay National Park, La Gomera
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'garajonay-national-park-la-gomera',
    ST_GeogFromText('POINT(-17.2356 28.0856)'),
    'Garajonay National Park, 38830 Agulo, Santa Cruz de Tenerife, Spain',
    '+34 922 92 01 29',
    'https://www.reservasparquesnacionales.es/real/parquesnac/usu/html/detalle-actividad-oapn.aspx?ii=6ENG&cen=4&act=1',
    'low',
    4.70,
    5450,
    ARRAY['hiking_trails', 'visitor_center', 'viewpoints', 'parking'],
    ARRAY['national_park', 'laurel_forest', 'hiking', 'unesco_world_heritage', 'endemic_species'],
    ARRAY['mystical', 'ancient', 'serene', 'magical'],
    ARRAY['https://example.com/garajonay1.jpg', 'https://example.com/garajonay2.jpg'],
    true,
    true
);

-- 6. Roque Nublo, Gran Canaria
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'roque-nublo-gran-canaria',
    ST_GeogFromText('POINT(-15.6089 27.9689)'),
    'Roque Nublo, 35328 Tejeda, Las Palmas, Spain',
    NULL,
    'https://www.grancanaria.com/turismo/en/nature/natural-monuments/roque-nublo/',
    'free',
    4.60,
    7890,
    ARRAY['hiking_trails', 'viewpoints', 'parking'],
    ARRAY['natural_monument', 'hiking', 'photography', 'volcanic_rock', 'panoramic_views'],
    ARRAY['inspiring', 'majestic', 'challenging', 'rewarding'],
    ARRAY['https://example.com/roque_nublo1.jpg', 'https://example.com/roque_nublo2.jpg'],
    true,
    true
);

-- 7. Loro Parque, Tenerife
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'loro-parque-tenerife',
    ST_GeogFromText('POINT(-16.5650 28.4089)'),
    'Av. Loro Parque, s/n, 38400 Puerto de la Cruz, Santa Cruz de Tenerife, Spain',
    '+34 922 37 38 41',
    'https://www.loroparque.com/',
    'high',
    4.25,
    18760,
    ARRAY['parking', 'restaurants', 'gift_shop', 'shows', 'wheelchair_accessible'],
    ARRAY['zoo', 'family', 'shows', 'animals', 'conservation'],
    ARRAY['exciting', 'educational', 'fun', 'family_friendly'],
    ARRAY['https://example.com/loro_parque1.jpg', 'https://example.com/loro_parque2.jpg'],
    true,
    true
);

-- 8. Playa de Papagayo, Lanzarote
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'playa-papagayo-lanzarote',
    ST_GeogFromText('POINT(-13.7889 28.8556)'),
    'Playa de Papagayo, 35580 Yaiza, Las Palmas, Spain',
    NULL,
    'https://www.turismolanzarote.com/en/beaches/papagayo-beaches',
    'medium',
    4.55,
    9120,
    ARRAY['beach_restaurant', 'parking', 'boat_access', 'snorkeling'],
    ARRAY['beach', 'crystal_clear_water', 'protected_area', 'swimming', 'snorkeling'],
    ARRAY['pristine', 'turquoise', 'secluded', 'paradise'],
    ARRAY['https://example.com/papagayo1.jpg', 'https://example.com/papagayo2.jpg'],
    true,
    true
);

-- 9. Anaga Rural Park, Tenerife
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'anaga-rural-park-tenerife',
    ST_GeogFromText('POINT(-16.1956 28.5489)'),
    'Anaga Rural Park, Santa Cruz de Tenerife, Spain',
    '+34 922 21 50 17',
    'https://www.webtenerife.com/what-to-visit/nature/natural-parks/anaga-rural-park/',
    'low',
    4.65,
    8340,
    ARRAY['hiking_trails', 'viewpoints', 'visitor_center', 'traditional_villages'],
    ARRAY['rural_park', 'laurel_forest', 'hiking', 'biosphere_reserve', 'endemic_flora'],
    ARRAY['wild', 'ancient', 'mysterious', 'untouched'],
    ARRAY['https://example.com/anaga1.jpg', 'https://example.com/anaga2.jpg'],
    true,
    true
);

-- 10. Cueva de los Verdes, Lanzarote
INSERT INTO public.places (
    id, slug, location, address, phone, website_url, price_level, 
    average_rating, total_reviews, amenities, tags, emotion_tags, 
    image_urls, is_featured, is_active
) VALUES (
    uuid_generate_v4(),
    'cueva-los-verdes-lanzarote',
    ST_GeogFromText('POINT(-13.4389 29.1556)'),
    'Cueva de los Verdes, 35520 Haría, Las Palmas, Spain',
    '+34 928 84 84 84',
    'https://www.cactlanzarote.com/en/cact-centres/cueva-de-los-verdes/',
    'medium',
    4.40,
    6870,
    ARRAY['guided_tours', 'lighting', 'parking', 'gift_shop'],
    ARRAY['cave', 'volcanic_tube', 'geology', 'underground', 'guided_tours'],
    ARRAY['mysterious', 'spectacular', 'underground', 'fascinating'],
    ARRAY['https://example.com/cueva_verdes1.jpg', 'https://example.com/cueva_verdes2.jpg'],
    true,
    true
);

-- INSERT translations for the places (Spanish and English)

-- Place translations for Teide National Park
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Parque Nacional del Teide', 
'El Parque Nacional del Teide es un parque nacional español situado en la isla de Tenerife. Su superficie abarca 18.990 hectáreas siendo el mayor y más antiguo de los parques nacionales de las Islas Canarias y el tercero más visitado del mundo.',
'El volcán más alto de España y Patrimonio de la Humanidad',
'Lleva ropa de abrigo, el clima puede ser frío en la cumbre. Reserva con antelación para el teleférico.'
FROM public.places WHERE slug = 'teide-national-park-tenerife';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Teide National Park', 
'Teide National Park is a Spanish national park located on the island of Tenerife. It covers 18,990 hectares and is the largest and oldest of the national parks of the Canary Islands and the third most visited in the world.',
'Spain''s highest volcano and UNESCO World Heritage Site',
'Bring warm clothing, it can be cold at the summit. Book cable car tickets in advance.'
FROM public.places WHERE slug = 'teide-national-park-tenerife';

-- Place translations for Maspalomas Dunes
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Dunas de Maspalomas', 
'Las Dunas de Maspalomas son una reserva natural situada en el sur de Gran Canaria. Comprende un área de dunas, una laguna salobre y un palmeral, creando un ecosistema único en las Islas Canarias.',
'Espectacular reserva natural de dunas doradas',
'Mejor visitarlas al amanecer o atardecer. Lleva protector solar y agua.'
FROM public.places WHERE slug = 'maspalomas-dunes-gran-canaria';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Maspalomas Dunes', 
'The Maspalomas Dunes are a natural reserve located in the south of Gran Canaria. It comprises an area of dunes, a brackish lagoon and a palm grove, creating a unique ecosystem in the Canary Islands.',
'Spectacular natural reserve of golden sand dunes',
'Best visited at sunrise or sunset. Bring sunscreen and water.'
FROM public.places WHERE slug = 'maspalomas-dunes-gran-canaria';

-- Place translations for Timanfaya National Park
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Parque Nacional de Timanfaya', 
'El Parque Nacional de Timanfaya se encuentra en la isla de Lanzarote. Representa un paisaje volcánico de extraordinaria belleza donde el fuego interior de la tierra se palpa en la superficie.',
'Paisaje volcánico único conocido como las Montañas del Fuego',
'Solo se puede visitar en tour guiado. Reserva con antelación, especialmente en temporada alta.'
FROM public.places WHERE slug = 'timanfaya-national-park-lanzarote';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Timanfaya National Park', 
'Timanfaya National Park is located on the island of Lanzarote. It represents a volcanic landscape of extraordinary beauty where the inner fire of the earth can be felt on the surface.',
'Unique volcanic landscape known as the Fire Mountains',
'Can only be visited on guided tours. Book in advance, especially during high season.'
FROM public.places WHERE slug = 'timanfaya-national-park-lanzarote';

-- Place translations for Playa de las Canteras
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Playa de Las Canteras', 
'La Playa de Las Canteras es una playa urbana situada en Las Palmas de Gran Canaria. Con más de 3 kilómetros de longitud, es considerada una de las mejores playas urbanas del mundo.',
'Una de las mejores playas urbanas del mundo',
'Perfecto para caminar por el paseo marítimo. Muchos restaurantes y bares cercanos.'
FROM public.places WHERE slug = 'playa-las-canteras-las-palmas';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Las Canteras Beach', 
'Las Canteras Beach is an urban beach located in Las Palmas de Gran Canaria. With more than 3 kilometers in length, it is considered one of the best urban beaches in the world.',
'One of the world''s best urban beaches',
'Perfect for walking along the promenade. Many restaurants and bars nearby.'
FROM public.places WHERE slug = 'playa-las-canteras-las-palmas';

-- Place translations for Garajonay National Park
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Parque Nacional de Garajonay', 
'El Parque Nacional de Garajonay se encuentra en La Gomera. Alberga la mejor representación de bosque de laurisilva de las Islas Canarias, un ecosistema que se remonta a la Era Terciaria.',
'Bosque de laurisilva prehistórico y Patrimonio de la Humanidad',
'Lleva ropa impermeable, puede estar húmedo. Ideal para senderismo y observación de aves.'
FROM public.places WHERE slug = 'garajonay-national-park-la-gomera';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Garajonay National Park', 
'Garajonay National Park is located in La Gomera. It houses the best representation of laurel forest in the Canary Islands, an ecosystem that dates back to the Tertiary Era.',
'Prehistoric laurel forest and UNESCO World Heritage Site',
'Bring waterproof clothing, it can be humid. Great for hiking and bird watching.'
FROM public.places WHERE slug = 'garajonay-national-park-la-gomera';

-- Place translations for Roque Nublo
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Roque Nublo', 
'El Roque Nublo es un monumento natural situado en el centro de Gran Canaria. Con 80 metros de altura, es uno de los roques naturales más grandes del mundo y símbolo de la isla.',
'Monumento natural icónico y símbolo de Gran Canaria',
'La caminata dura unos 30 minutos. Mejor visitarlo al amanecer o atardecer para las mejores vistas.'
FROM public.places WHERE slug = 'roque-nublo-gran-canaria';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Roque Nublo', 
'Roque Nublo is a natural monument located in the center of Gran Canaria. At 80 meters high, it is one of the largest natural rocks in the world and symbol of the island.',
'Iconic natural monument and symbol of Gran Canaria',
'The hike takes about 30 minutes. Best visited at sunrise or sunset for the best views.'
FROM public.places WHERE slug = 'roque-nublo-gran-canaria';

-- Place translations for Loro Parque
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Loro Parque', 
'Loro Parque es un zoológico y parque de atracciones situado en Puerto de la Cruz, Tenerife. Famoso por sus espectáculos de orcas, delfines y leones marinos, así como por su trabajo en conservación.',
'Zoológico de renombre mundial con espectáculos de animales marinos',
'Llega temprano para evitar multitudes. Los espectáculos tienen horarios fijos, planifica tu visita.'
FROM public.places WHERE slug = 'loro-parque-tenerife';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Loro Parque', 
'Loro Parque is a zoo and amusement park located in Puerto de la Cruz, Tenerife. Famous for its orca, dolphin and sea lion shows, as well as its conservation work.',
'World-renowned zoo with marine animal shows',
'Arrive early to avoid crowds. Shows have fixed schedules, plan your visit accordingly.'
FROM public.places WHERE slug = 'loro-parque-tenerife';

-- Place translations for Playa de Papagayo
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Playa de Papagayo', 
'Las Playas de Papagayo son un conjunto de calas de arena dorada situadas en el sur de Lanzarote. Protegidas del viento por acantilados volcánicos, ofrecen aguas cristalinas ideales para el baño.',
'Conjunto de calas paradisíacas con aguas cristalinas',
'Acceso por carretera de tierra, lleva agua y comida. Parking de pago. Ideal para snorkel.'
FROM public.places WHERE slug = 'playa-papagayo-lanzarote';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Papagayo Beach', 
'Papagayo Beaches are a set of golden sand coves located in the south of Lanzarote. Protected from the wind by volcanic cliffs, they offer crystal clear waters ideal for swimming.',
'Set of paradisiacal coves with crystal clear waters',
'Access via dirt road, bring water and food. Paid parking. Great for snorkeling.'
FROM public.places WHERE slug = 'playa-papagayo-lanzarote';

-- Place translations for Anaga Rural Park
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Parque Rural de Anaga', 
'El Parque Rural de Anaga ocupa la península noreste de Tenerife. Alberga el bosque de laurisilva mejor conservado de las islas, pueblos tradicionales y senderos espectaculares.',
'Reserva de la biosfera con bosque de laurisilva milenario',
'Carreteras estrechas y serpenteantes. Lleva ropa de abrigo, puede hacer frío y estar nublado.'
FROM public.places WHERE slug = 'anaga-rural-park-tenerife';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Anaga Rural Park', 
'Anaga Rural Park occupies the northeastern peninsula of Tenerife. It houses the best preserved laurel forest of the islands, traditional villages and spectacular trails.',
'Biosphere reserve with ancient laurel forest',
'Narrow and winding roads. Bring warm clothing, it can be cold and cloudy.'
FROM public.places WHERE slug = 'anaga-rural-park-tenerife';

-- Place translations for Cueva de los Verdes
INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'es', 'Cueva de los Verdes', 
'La Cueva de los Verdes es una cueva volcánica situada en el norte de Lanzarote. Forma parte del tubo volcánico creado por las erupciones del volcán de la Corona hace unos 3.000 años.',
'Espectacular cueva volcánica con formaciones únicas',
'Visita solo con guía. Temperatura constante de 19°C. Prohibido tocar las formaciones volcánicas.'
FROM public.places WHERE slug = 'cueva-los-verdes-lanzarote';

INSERT INTO public.place_translations (place_id, language_code, name, description, short_description, tips) 
SELECT id, 'en', 'Cueva de los Verdes', 
'Cueva de los Verdes is a volcanic cave located in the north of Lanzarote. It is part of the volcanic tube created by the eruptions of the Corona volcano about 3,000 years ago.',
'Spectacular volcanic cave with unique formations',
'Guided tours only. Constant temperature of 19°C. Do not touch the volcanic formations.'
FROM public.places WHERE slug = 'cueva-los-verdes-lanzarote';