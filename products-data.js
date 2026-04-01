const PRODUCTS = [
  {
    "id": "P001",
    "name": "Knife Blade Set",
    "price": 1799,
    "oldPrice": 2086,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Cutting",
    "partNo": "AGT-CUT-001",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Cutting"
    ],
    "stock": 11,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/155f0j00uMItFwahHAgE/Knife-Section-for-Claas-Combine-Harvester-Spare-Parts.webp",
    "description": "Hardened steel knife blades for clean crop cutting and lower vibration."
  },
  {
    "id": "P002",
    "name": "Knife Guard",
    "price": 2148,
    "oldPrice": 2491,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Cutting",
    "partNo": "AGT-CUT-002",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Cutting"
    ],
    "stock": 14,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00YzMbcDuEHFov/Combine-Harvester-Forging-Knife-Guard-Section-Reaper-Finger-Spare-Part-Blade.webp",
    "description": "Heavy-duty guard that protects knife sections and supports smooth cutterbar operation."
  },
  {
    "id": "P003",
    "name": "Guard Finger",
    "price": 2200,
    "oldPrice": 2552,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Cutting",
    "partNo": "AGT-CUT-003",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Cutting"
    ],
    "stock": 17,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00YzMbcDuEHFov/Combine-Harvester-Forging-Knife-Guard-Section-Reaper-Finger-Spare-Part-Blade.webp",
    "description": "Precision guard finger for stable crop intake and reduced knife wear."
  },
  {
    "id": "P004",
    "name": "Hold Down Clip",
    "price": 2549,
    "oldPrice": 2956,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Cutting",
    "partNo": "AGT-CUT-004",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Cutting"
    ],
    "stock": 20,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00YzMbcDuEHFov/Combine-Harvester-Forging-Knife-Guard-Section-Reaper-Finger-Spare-Part-Blade.webp",
    "description": "Spring hold-down clip to maintain correct knife section clearance."
  },
  {
    "id": "P005",
    "name": "Knife Head",
    "price": 2898,
    "oldPrice": 3361,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Cutting",
    "partNo": "AGT-CUT-005",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Cutting"
    ],
    "stock": 23,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/155f0j00uMItFwahHAgE/Knife-Section-for-Claas-Combine-Harvester-Spare-Parts.webp",
    "description": "Robust knife head for connecting the knife assembly to the drive system."
  },
  {
    "id": "P006",
    "name": "Knife Back",
    "price": 2950,
    "oldPrice": 3421,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Cutting",
    "partNo": "AGT-CUT-006",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Cutting"
    ],
    "stock": 26,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/155f0j00uMItFwahHAgE/Knife-Section-for-Claas-Combine-Harvester-Spare-Parts.webp",
    "description": "Balanced knife back for steady reciprocating cutter movement."
  },
  {
    "id": "P007",
    "name": "Cutter Bar Assembly",
    "price": 3299,
    "oldPrice": 3826,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Cutter Bar",
    "category": "Header",
    "partNo": "AGT-HEA-007",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Cutter Bar",
      "Header"
    ],
    "stock": 29,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Complete cutter bar assembly with sections, guards and mounting points."
  },
  {
    "id": "P008",
    "name": "Divider Point",
    "price": 3648,
    "oldPrice": 4231,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-008",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Header"
    ],
    "stock": 32,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Header divider point for smooth crop entry and row separation."
  },
  {
    "id": "P009",
    "name": "Skid Shoe",
    "price": 3700,
    "oldPrice": 4292,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-009",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Header"
    ],
    "stock": 8,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Wear-resistant skid shoe for header height support over uneven ground."
  },
  {
    "id": "P010",
    "name": "Reel Tine",
    "price": 4049,
    "oldPrice": 4696,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-010",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Header"
    ],
    "stock": 11,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Flexible reel tine for controlled crop feeding to the cutter bar."
  },
  {
    "id": "P011",
    "name": "Reel Bat",
    "price": 4398,
    "oldPrice": 5101,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-011",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Header"
    ],
    "stock": 14,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Strong reel bat for maintaining reel balance and feeding performance."
  },
  {
    "id": "P012",
    "name": "Reel Spider",
    "price": 4450,
    "oldPrice": 5162,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-012",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Header"
    ],
    "stock": 17,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Machined reel spider hub for reliable reel arm mounting."
  },
  {
    "id": "P013",
    "name": "Reel Bush",
    "price": 4799,
    "oldPrice": 5566,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-013",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Header"
    ],
    "stock": 20,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Reel bush for reduced free play and smoother reel rotation."
  },
  {
    "id": "P014",
    "name": "Wobble Box Assembly",
    "price": 3398,
    "oldPrice": 3941,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Cutter Bar",
    "category": "Header",
    "partNo": "AGT-HEA-014",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Cutter Bar",
      "Header"
    ],
    "stock": 23,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Header drive wobble box for stable side-to-side knife action."
  },
  {
    "id": "P015",
    "name": "Header Auger Finger",
    "price": 3450,
    "oldPrice": 4001,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-015",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Header"
    ],
    "stock": 26,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Replaceable auger finger to move crop evenly toward feeder housing."
  },
  {
    "id": "P016",
    "name": "Header Auger Flight",
    "price": 3799,
    "oldPrice": 4406,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-016",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Header"
    ],
    "stock": 29,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Auger flight section for improved crop gathering across the header width."
  },
  {
    "id": "P017",
    "name": "Header Lift Spring",
    "price": 4148,
    "oldPrice": 4811,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-017",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Header"
    ],
    "stock": 32,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Lift spring to support header flotation and stable cutting height."
  },
  {
    "id": "P018",
    "name": "Stone Guard",
    "price": 4200,
    "oldPrice": 4872,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-018",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Header"
    ],
    "stock": 8,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Protective stone guard to reduce damage from field debris."
  },
  {
    "id": "P019",
    "name": "Feeder Chain",
    "price": 3449,
    "oldPrice": 4000,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-019",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 11,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "High-strength feeder chain for smooth crop delivery from header to threshing section."
  },
  {
    "id": "P020",
    "name": "Feeder Slat",
    "price": 3798,
    "oldPrice": 4405,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-020",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 14,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Reinforced feeder slat for even crop carrying and reduced bunching."
  },
  {
    "id": "P021",
    "name": "Feeder Sprocket",
    "price": 2100,
    "oldPrice": 2436,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-021",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 17,
    "rating": 4.7,
    "image": "https://harriston-croptec.com/cdn/shop/files/YanmarAW85CombineHarvesterSpareParts1E6C85-21031SPROCKET44T1_700x700.png?v=1743147038",
    "description": "Drive sprocket for feeder chain timing and reliable crop intake."
  },
  {
    "id": "P022",
    "name": "Feeder House Floor",
    "price": 2449,
    "oldPrice": 2840,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-022",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 20,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Wear plate for feeder house floor to support high-throughput feeding."
  },
  {
    "id": "P023",
    "name": "Feeder Drum",
    "price": 2798,
    "oldPrice": 3245,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-023",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 23,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Feeder drum to regulate crop movement into the threshing drum."
  },
  {
    "id": "P024",
    "name": "Feeder Drum Finger",
    "price": 2850,
    "oldPrice": 3305,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-024",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 26,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Finger set for consistent crop transfer and reduced blockages."
  },
  {
    "id": "P025",
    "name": "Feed Beater",
    "price": 3199,
    "oldPrice": 3710,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-025",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 29,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Feed beater for controlled crop acceleration into threshing area."
  },
  {
    "id": "P026",
    "name": "Feeder Housing Bearing",
    "price": 3548,
    "oldPrice": 4115,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-026",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 32,
    "rating": 4.4,
    "image": "https://harctor.com/uploads/allimg/190611/John-Deere-Combine-Harvester-Ball-Bearing_ID_40MM_JD39109.jpg",
    "description": "Bearing unit for smoother feeder shaft rotation under load."
  },
  {
    "id": "P027",
    "name": "Threshing Drum Rasp Bar",
    "price": 6300,
    "oldPrice": 7307,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Threshing",
    "partNo": "AGT-THR-027",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Threshing"
    ],
    "stock": 8,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Wear-resistant rasp bar for effective grain removal from the crop mat."
  },
  {
    "id": "P028",
    "name": "Threshing Drum Tooth",
    "price": 4899,
    "oldPrice": 5682,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Threshing",
    "partNo": "AGT-THR-028",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Threshing"
    ],
    "stock": 11,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Heavy-duty drum tooth for aggressive threshing performance."
  },
  {
    "id": "P029",
    "name": "Drum Shaft",
    "price": 5248,
    "oldPrice": 6087,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Threshing",
    "partNo": "AGT-THR-029",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Threshing"
    ],
    "stock": 14,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Balanced drum shaft for stable threshing drum operation."
  },
  {
    "id": "P030",
    "name": "Concave Set",
    "price": 5300,
    "oldPrice": 6148,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Threshing",
    "partNo": "AGT-THR-030",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Threshing"
    ],
    "stock": 17,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Precision concave set for cleaner threshing and controlled grain separation."
  },
  {
    "id": "P031",
    "name": "Concave Wire",
    "price": 5649,
    "oldPrice": 6552,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Threshing",
    "partNo": "AGT-THR-031",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Threshing"
    ],
    "stock": 20,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Replaceable concave wire section for optimized crop flow through threshing zone."
  },
  {
    "id": "P032",
    "name": "Concave Bar",
    "price": 5998,
    "oldPrice": 6957,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Threshing",
    "partNo": "AGT-THR-032",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Threshing"
    ],
    "stock": 23,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Durable bar for rebuilding and maintaining concave assemblies."
  },
  {
    "id": "P033",
    "name": "Beater Tooth",
    "price": 6050,
    "oldPrice": 7017,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Threshing",
    "partNo": "AGT-THR-033",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Threshing"
    ],
    "stock": 26,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Beater tooth for moving crop smoothly from threshing to separation."
  },
  {
    "id": "P034",
    "name": "Beater Plate",
    "price": 6399,
    "oldPrice": 7422,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Threshing",
    "partNo": "AGT-THR-034",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Threshing"
    ],
    "stock": 29,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Heavy gauge beater plate for durable crop transition performance."
  },
  {
    "id": "P035",
    "name": "Rotor Vane",
    "price": 3698,
    "oldPrice": 4289,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Separation",
    "partNo": "AGT-SEP-035",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Separation"
    ],
    "stock": 32,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Rotor vane for guiding crop flow through rotary separation path."
  },
  {
    "id": "P036",
    "name": "Rotor Rasp Bar",
    "price": 3750,
    "oldPrice": 4350,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Separation",
    "partNo": "AGT-SEP-036",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Separation"
    ],
    "stock": 8,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Rasp bar built for rotary threshing and separation applications."
  },
  {
    "id": "P037",
    "name": "Separator Grate",
    "price": 4099,
    "oldPrice": 4754,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Separation",
    "partNo": "AGT-SEP-037",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Separation"
    ],
    "stock": 11,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Separator grate to allow grain drop while carrying straw onward."
  },
  {
    "id": "P038",
    "name": "Straw Walker",
    "price": 4448,
    "oldPrice": 5159,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Separation",
    "partNo": "AGT-SEP-038",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Separation"
    ],
    "stock": 14,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Durable straw walker for final grain separation from straw residue."
  },
  {
    "id": "P039",
    "name": "Straw Walker Crank",
    "price": 4500,
    "oldPrice": 5220,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Separation",
    "partNo": "AGT-SEP-039",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Separation"
    ],
    "stock": 17,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Crank mechanism for synchronized straw walker motion."
  },
  {
    "id": "P040",
    "name": "Straw Walker Bearing",
    "price": 4849,
    "oldPrice": 5624,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Separation",
    "partNo": "AGT-SEP-040",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Separation"
    ],
    "stock": 20,
    "rating": 4.2,
    "image": "https://harctor.com/uploads/allimg/190611/John-Deere-Combine-Harvester-Ball-Bearing_ID_40MM_JD39109.jpg",
    "description": "Bearing kit engineered for straw walker assemblies under heavy load."
  },
  {
    "id": "P041",
    "name": "Walker Block",
    "price": 5198,
    "oldPrice": 6029,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Separation",
    "partNo": "AGT-SEP-041",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Separation"
    ],
    "stock": 23,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Support block for straw walker linkage and alignment."
  },
  {
    "id": "P042",
    "name": "Walker Arm",
    "price": 3500,
    "oldPrice": 4059,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Separation",
    "partNo": "AGT-SEP-042",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Separation"
    ],
    "stock": 26,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Walker arm component for controlled oscillation of separation units."
  },
  {
    "id": "P043",
    "name": "Upper Sieve",
    "price": 2949,
    "oldPrice": 3420,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-043",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 29,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Adjustable upper sieve for separating clean grain from chaff and returns."
  },
  {
    "id": "P044",
    "name": "Lower Sieve",
    "price": 3298,
    "oldPrice": 3825,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-044",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 32,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Lower cleaning sieve for final grain sample quality control."
  },
  {
    "id": "P045",
    "name": "Chaffer",
    "price": 3350,
    "oldPrice": 3885,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-045",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 8,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Heavy-duty chaffer for air-assisted crop cleaning and separation."
  },
  {
    "id": "P046",
    "name": "Cleaning Fan Blade",
    "price": 3699,
    "oldPrice": 4290,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-046",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 11,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Balanced fan blade for consistent airflow through the cleaning shoe."
  },
  {
    "id": "P047",
    "name": "Cleaning Fan Shaft",
    "price": 4048,
    "oldPrice": 4695,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-047",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 14,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Fan shaft machined for stable high-speed airflow generation."
  },
  {
    "id": "P048",
    "name": "Fan Pulley",
    "price": 4100,
    "oldPrice": 4756,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-048",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 17,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Pulley for reliable cleaning fan speed transmission."
  },
  {
    "id": "P049",
    "name": "Grain Pan",
    "price": 2699,
    "oldPrice": 3130,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-049",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 20,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Grain pan for transporting separated grain toward the cleaning system."
  },
  {
    "id": "P050",
    "name": "Grain Pan Bushing",
    "price": 3048,
    "oldPrice": 3535,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-050",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 23,
    "rating": 4.4,
    "image": "https://harctor.com/uploads/allimg/190611/John-Deere-Combine-Harvester-Ball-Bearing_ID_40MM_JD39109.jpg",
    "description": "Bushing set for smoother oscillation of grain pan assembly."
  },
  {
    "id": "P051",
    "name": "Tailings Return Auger",
    "price": 3100,
    "oldPrice": 3595,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-051",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 26,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Return auger for circulating unthreshed material back to the system."
  },
  {
    "id": "P052",
    "name": "Tailings Elevator Chain",
    "price": 3449,
    "oldPrice": 4000,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-052",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 29,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Elevator chain for tailings return system operation."
  },
  {
    "id": "P053",
    "name": "Clean Grain Auger",
    "price": 4098,
    "oldPrice": 4753,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-053",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 32,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Clean grain auger for efficient grain transfer to elevator or tank."
  },
  {
    "id": "P054",
    "name": "Cross Auger Flight",
    "price": 4150,
    "oldPrice": 4814,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-054",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 8,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Cross auger flight section for horizontal grain movement."
  },
  {
    "id": "P055",
    "name": "Grain Elevator Chain",
    "price": 4499,
    "oldPrice": 5218,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-055",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 11,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "High-strength elevator chain for lifting clean grain to the tank."
  },
  {
    "id": "P056",
    "name": "Grain Elevator Bucket",
    "price": 3098,
    "oldPrice": 3593,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-056",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 14,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Bucket attachment for grain elevator chain assemblies."
  },
  {
    "id": "P057",
    "name": "Auger Shaft",
    "price": 3150,
    "oldPrice": 3653,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-057",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 17,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Heavy-duty auger shaft built for stable grain movement and long life."
  },
  {
    "id": "P058",
    "name": "Grain Tank Auger",
    "price": 3499,
    "oldPrice": 4058,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-058",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 20,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Internal grain tank auger for smooth unloading preparation."
  },
  {
    "id": "P059",
    "name": "Unloading Auger Flight",
    "price": 3848,
    "oldPrice": 4463,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-059",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 23,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Flight section for rebuilding unloading auger assemblies."
  },
  {
    "id": "P060",
    "name": "Unloading Auger Tube",
    "price": 3900,
    "oldPrice": 4524,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-060",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 26,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Auger tube section for the unloading system."
  },
  {
    "id": "P061",
    "name": "Unloading Auger Gearbox",
    "price": 4249,
    "oldPrice": 4928,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-061",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 29,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Gearbox that drives the unloading auger under field load."
  },
  {
    "id": "P062",
    "name": "Grain Tank Cover Hinge",
    "price": 4598,
    "oldPrice": 5333,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-062",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 32,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Hinge hardware for grain tank cover movement and support."
  },
  {
    "id": "P063",
    "name": "Grain Sensor Bracket",
    "price": 2900,
    "oldPrice": 3363,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-063",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 8,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Mounting bracket for grain monitoring sensors and switches."
  },
  {
    "id": "P064",
    "name": "Main Drive Belt",
    "price": 2149,
    "oldPrice": 2492,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-064",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 11,
    "rating": 4.2,
    "image": "https://harctor.com/uploads/allimg/190615/John-Deere-Combine-Harvester-V-Belt_Cogged_Z21400.jpg",
    "description": "Premium drive belt for dependable power transfer through major systems."
  },
  {
    "id": "P065",
    "name": "Variator Belt",
    "price": 2498,
    "oldPrice": 2897,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-065",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 14,
    "rating": 4.3,
    "image": "https://harctor.com/uploads/allimg/190615/John-Deere-Combine-Harvester-V-Belt_Cogged_Z21400.jpg",
    "description": "High-grip variator belt for speed control in variable drive assemblies."
  },
  {
    "id": "P066",
    "name": "Chain Sprocket Set",
    "price": 2550,
    "oldPrice": 2958,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-066",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 17,
    "rating": 4.4,
    "image": "https://harriston-croptec.com/cdn/shop/files/YanmarAW85CombineHarvesterSpareParts1E6C85-21031SPROCKET44T1_700x700.png?v=1743147038",
    "description": "Hardened sprocket set for chain-driven combine systems."
  },
  {
    "id": "P067",
    "name": "Drive Pulley Assembly",
    "price": 2899,
    "oldPrice": 3362,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-067",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 20,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Balanced drive pulley for efficient motion transfer and less belt wear."
  },
  {
    "id": "P068",
    "name": "Idler Pulley",
    "price": 3248,
    "oldPrice": 3767,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-068",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 23,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Idler pulley to maintain proper belt alignment and tension."
  },
  {
    "id": "P069",
    "name": "Tensioner Spring",
    "price": 3300,
    "oldPrice": 3827,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-069",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 26,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Spring for maintaining drive belt or chain tension."
  },
  {
    "id": "P070",
    "name": "Drive Shaft",
    "price": 1899,
    "oldPrice": 2202,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-070",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 29,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Machined drive shaft for dependable torque transmission."
  },
  {
    "id": "P071",
    "name": "Universal Joint",
    "price": 2248,
    "oldPrice": 2607,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-071",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 32,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Universal joint for angular power transfer in rotating shafts."
  },
  {
    "id": "P072",
    "name": "Gearbox Input Shaft",
    "price": 2300,
    "oldPrice": 2668,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-072",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 8,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Input shaft for combine gearbox drive assemblies."
  },
  {
    "id": "P073",
    "name": "Gearbox Housing",
    "price": 2649,
    "oldPrice": 3072,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-073",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 11,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Gearbox housing built to support bearings, shafts and seals."
  },
  {
    "id": "P074",
    "name": "Clutch Plate",
    "price": 2998,
    "oldPrice": 3477,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-074",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 14,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Clutch plate for controlled power engagement in specific applications."
  },
  {
    "id": "P075",
    "name": "Bearing Housing",
    "price": 3050,
    "oldPrice": 3537,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-075",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 17,
    "rating": 4.5,
    "image": "https://harctor.com/uploads/allimg/190611/John-Deere-Combine-Harvester-Ball-Bearing_ID_40MM_JD39109.jpg",
    "description": "Housing unit for securing drive line bearings in alignment."
  },
  {
    "id": "P076",
    "name": "Hydraulic Hose",
    "price": 3799,
    "oldPrice": 4406,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-076",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 20,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Pressure-rated hydraulic hose for lift, steering or control circuits."
  },
  {
    "id": "P077",
    "name": "Hydraulic Pipe",
    "price": 2398,
    "oldPrice": 2781,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-077",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 23,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Formed hydraulic pipe for durable oil routing across the machine."
  },
  {
    "id": "P078",
    "name": "Hydraulic Pump Seal Kit",
    "price": 2450,
    "oldPrice": 2842,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-078",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 26,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Seal kit for restoring hydraulic pump performance."
  },
  {
    "id": "P079",
    "name": "Control Valve Spool",
    "price": 2799,
    "oldPrice": 3246,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-079",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 29,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Spool element for hydraulic directional control valves."
  },
  {
    "id": "P080",
    "name": "Solenoid Valve",
    "price": 3148,
    "oldPrice": 3651,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-080",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 32,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Electro-hydraulic solenoid valve for assisted machine functions."
  },
  {
    "id": "P081",
    "name": "Header Lift Cylinder Kit",
    "price": 3200,
    "oldPrice": 3711,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-081",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 8,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Cylinder seal and service kit for header lift operation."
  },
  {
    "id": "P082",
    "name": "Hydraulic Filter",
    "price": 3549,
    "oldPrice": 4116,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-082",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 11,
    "rating": 4.4,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Filter element for keeping hydraulic oil clean under high-use conditions."
  },
  {
    "id": "P083",
    "name": "Oil Seal Set",
    "price": 3898,
    "oldPrice": 4521,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-083",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 14,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Sealing kit for hydraulic cylinders, motors and pumps."
  },
  {
    "id": "P084",
    "name": "Air Filter",
    "price": 1250,
    "oldPrice": 1450,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-084",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 17,
    "rating": 4.6,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Primary air filter for protecting engine intake in dusty field conditions."
  },
  {
    "id": "P085",
    "name": "Oil Filter",
    "price": 1599,
    "oldPrice": 1854,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-085",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 20,
    "rating": 4.7,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Engine oil filter for cleaner lubrication and longer service life."
  },
  {
    "id": "P086",
    "name": "Fuel Filter",
    "price": 1948,
    "oldPrice": 2259,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-086",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 23,
    "rating": 4.8,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Fuel filter to protect injection components from contamination."
  },
  {
    "id": "P087",
    "name": "Radiator Core",
    "price": 2000,
    "oldPrice": 2320,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-087",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 26,
    "rating": 4.9,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Cooling radiator core for stable engine temperature control."
  },
  {
    "id": "P088",
    "name": "Fan Belt",
    "price": 2349,
    "oldPrice": 2724,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-088",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 29,
    "rating": 4.2,
    "image": "https://harctor.com/uploads/allimg/190615/John-Deere-Combine-Harvester-V-Belt_Cogged_Z21400.jpg",
    "description": "Engine fan belt for dependable cooling system drive."
  },
  {
    "id": "P089",
    "name": "Water Pump Repair Kit",
    "price": 2698,
    "oldPrice": 3129,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-089",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 32,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Repair kit for restoring coolant circulation performance."
  },
  {
    "id": "P090",
    "name": "Exhaust Clamp",
    "price": 2750,
    "oldPrice": 3190,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-090",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 8,
    "rating": 4.4,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Clamp set for secure exhaust pipe connections."
  },
  {
    "id": "P091",
    "name": "Engine Mount",
    "price": 1349,
    "oldPrice": 1564,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-091",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 11,
    "rating": 4.5,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Resilient engine mount for vibration isolation and alignment."
  },
  {
    "id": "P092",
    "name": "Turbo Hose",
    "price": 1698,
    "oldPrice": 1969,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-092",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 14,
    "rating": 4.6,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Reinforced hose for turbocharged intake or charge air routing."
  },
  {
    "id": "P093",
    "name": "Radiator Hose",
    "price": 1750,
    "oldPrice": 2029,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-093",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 17,
    "rating": 4.7,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Cooling hose for reliable coolant circulation."
  },
  {
    "id": "P094",
    "name": "Wiring Harness",
    "price": 1799,
    "oldPrice": 2086,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-094",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 20,
    "rating": 4.8,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Section wiring harness for lighting, sensors and instrument systems."
  },
  {
    "id": "P095",
    "name": "LED Work Light",
    "price": 2148,
    "oldPrice": 2491,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-095",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 23,
    "rating": 4.9,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "LED work light for better field visibility during low-light harvesting."
  },
  {
    "id": "P096",
    "name": "Indicator Lamp",
    "price": 2200,
    "oldPrice": 2552,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-096",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 26,
    "rating": 4.2,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Signal lamp assembly for combine lighting system replacement."
  },
  {
    "id": "P097",
    "name": "Temperature Sensor",
    "price": 2549,
    "oldPrice": 2956,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-097",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 29,
    "rating": 4.3,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Sensor for monitoring engine or hydraulic temperature."
  },
  {
    "id": "P098",
    "name": "RPM Sensor",
    "price": 1148,
    "oldPrice": 1331,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-098",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 32,
    "rating": 4.4,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Rotational speed sensor for monitoring shafts or drums."
  },
  {
    "id": "P099",
    "name": "Battery Cable",
    "price": 1200,
    "oldPrice": 1392,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-099",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 8,
    "rating": 4.5,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Heavy-duty battery cable for starting and power distribution."
  },
  {
    "id": "P100",
    "name": "Fuse Box Cover",
    "price": 1549,
    "oldPrice": 1796,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-100",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 11,
    "rating": 4.6,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Protective cover for electrical fuse panel."
  },
  {
    "id": "P101",
    "name": "Starter Motor",
    "price": 1898,
    "oldPrice": 2201,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-101",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 14,
    "rating": 4.7,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Starter motor for dependable engine cranking."
  },
  {
    "id": "P102",
    "name": "Alternator Belt",
    "price": 1950,
    "oldPrice": 2262,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-102",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 17,
    "rating": 4.8,
    "image": "https://harctor.com/uploads/allimg/190615/John-Deere-Combine-Harvester-V-Belt_Cogged_Z21400.jpg",
    "description": "Drive belt for alternator and auxiliary charging system."
  },
  {
    "id": "P103",
    "name": "Switch Panel Knob",
    "price": 2299,
    "oldPrice": 2666,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Electrical",
    "partNo": "AGT-ELE-103",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Electrical"
    ],
    "stock": 20,
    "rating": 4.9,
    "image": "https://www.lumise.eu/storage/product_images/4/tuotesivu_nordiclightstyovalopakettipuimuri_8020107994_b28a38ac5a90_1.webp",
    "description": "Replacement knob for in-cab switch and control panel use."
  },
  {
    "id": "P104",
    "name": "Cabin Air Filter",
    "price": 2798,
    "oldPrice": 3245,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Cab",
    "partNo": "AGT-CAB-104",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Cab"
    ],
    "stock": 23,
    "rating": 4.2,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Cabin air filter for cleaner operator environment and ventilation."
  },
  {
    "id": "P105",
    "name": "Mirror Assembly",
    "price": 1100,
    "oldPrice": 1276,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Cab",
    "partNo": "AGT-CAB-105",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Cab"
    ],
    "stock": 26,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Mirror assembly for better field and road visibility."
  },
  {
    "id": "P106",
    "name": "Seat Shock Absorber",
    "price": 1449,
    "oldPrice": 1680,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Cab",
    "partNo": "AGT-CAB-106",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Cab"
    ],
    "stock": 29,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Seat suspension component for improved operator comfort."
  },
  {
    "id": "P107",
    "name": "Door Handle",
    "price": 1798,
    "oldPrice": 2085,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Cab",
    "partNo": "AGT-CAB-107",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Cab"
    ],
    "stock": 32,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Cab door handle replacement for secure access."
  },
  {
    "id": "P108",
    "name": "Windshield Wiper Blade",
    "price": 1850,
    "oldPrice": 2146,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Cab",
    "partNo": "AGT-CAB-108",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Cab"
    ],
    "stock": 8,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Wiper blade for improved visibility in dusty or wet conditions."
  },
  {
    "id": "P109",
    "name": "Control Lever Grip",
    "price": 2199,
    "oldPrice": 2550,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Cab",
    "partNo": "AGT-CAB-109",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Cab"
    ],
    "stock": 11,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Grip replacement for operator control levers."
  },
  {
    "id": "P110",
    "name": "Chopper Knife",
    "price": 3148,
    "oldPrice": 3651,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Residue",
    "partNo": "AGT-RES-110",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Residue"
    ],
    "stock": 14,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Residue chopper knife for fine chopping of straw and stover."
  },
  {
    "id": "P111",
    "name": "Chopper Hammer",
    "price": 3200,
    "oldPrice": 3711,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Residue",
    "partNo": "AGT-RES-111",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Residue"
    ],
    "stock": 17,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Hammer blade for heavy-duty straw chopping action."
  },
  {
    "id": "P112",
    "name": "Straw Spreader Disc",
    "price": 1799,
    "oldPrice": 2086,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Residue",
    "partNo": "AGT-RES-112",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Residue"
    ],
    "stock": 20,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Spreader disc for uniform residue distribution behind the machine."
  },
  {
    "id": "P113",
    "name": "Spreader Vane",
    "price": 2148,
    "oldPrice": 2491,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Residue",
    "partNo": "AGT-RES-113",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Residue"
    ],
    "stock": 23,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Vane blade for directing chaff and straw spread pattern."
  },
  {
    "id": "P114",
    "name": "Residue Curtain",
    "price": 2200,
    "oldPrice": 2552,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Residue",
    "partNo": "AGT-RES-114",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Residue"
    ],
    "stock": 26,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Flexible residue curtain to control discharge direction."
  },
  {
    "id": "P115",
    "name": "Straw Reaper Blade",
    "price": 2699,
    "oldPrice": 3130,
    "brand": "Preet",
    "model": "987",
    "machineType": "Straw Reaper",
    "category": "Straw Reaper",
    "partNo": "AGT-STR-115",
    "compatibility": [
      "Preet 987",
      "Straw Reaper",
      "Straw Reaper"
    ],
    "stock": 29,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/155f0j00uMItFwahHAgE/Knife-Section-for-Claas-Combine-Harvester-Spare-Parts.webp",
    "description": "Durable straw reaper blade for cutting residue and loose straw."
  },
  {
    "id": "P116",
    "name": "Straw Reaper Knife Holder",
    "price": 3048,
    "oldPrice": 3535,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Straw Reaper",
    "category": "Straw Reaper",
    "partNo": "AGT-STR-116",
    "compatibility": [
      "Preet 987 Deluxe",
      "Straw Reaper",
      "Straw Reaper"
    ],
    "stock": 32,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/155f0j00uMItFwahHAgE/Knife-Section-for-Claas-Combine-Harvester-Spare-Parts.webp",
    "description": "Knife holder for mounting straw reaper blades accurately."
  },
  {
    "id": "P117",
    "name": "Straw Reaper Gearbox",
    "price": 3100,
    "oldPrice": 3595,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Straw Reaper",
    "category": "Straw Reaper",
    "partNo": "AGT-STR-117",
    "compatibility": [
      "Dasmesh 9100",
      "Straw Reaper",
      "Straw Reaper"
    ],
    "stock": 8,
    "rating": 4.7,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Gearbox for straw reaper transmission and cutting drive."
  },
  {
    "id": "P118",
    "name": "Straw Reaper Chain",
    "price": 3449,
    "oldPrice": 4000,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Straw Reaper",
    "category": "Straw Reaper",
    "partNo": "AGT-STR-118",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Straw Reaper",
      "Straw Reaper"
    ],
    "stock": 11,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Chain for straw reaper drive assemblies."
  },
  {
    "id": "P119",
    "name": "Straw Reaper Beater Bar",
    "price": 2048,
    "oldPrice": 2375,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Straw Reaper",
    "category": "Straw Reaper",
    "partNo": "AGT-STR-119",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Straw Reaper",
      "Straw Reaper"
    ],
    "stock": 14,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Beater bar for residue handling and throughput consistency."
  },
  {
    "id": "P120",
    "name": "Feeder Drum Bearing",
    "price": 2350,
    "oldPrice": 2726,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Feeding",
    "partNo": "AGT-FEE-120",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Feeding"
    ],
    "stock": 17,
    "rating": 4.2,
    "image": "https://harctor.com/uploads/allimg/190611/John-Deere-Combine-Harvester-Ball-Bearing_ID_40MM_JD39109.jpg",
    "description": "Bearing support for feeder drum shaft and steady crop intake."
  },
  {
    "id": "P121",
    "name": "Return Pan",
    "price": 3199,
    "oldPrice": 3710,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Cleaning",
    "partNo": "AGT-CLE-121",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Cleaning"
    ],
    "stock": 20,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00ClwfbniBQDqd/1e6b30-39001-Concave-Sieve-for-Yanmar-Combine-Harvester.webp",
    "description": "Pan section for guiding returns material within the cleaning system."
  },
  {
    "id": "P122",
    "name": "Unload Tube Elbow",
    "price": 3848,
    "oldPrice": 4463,
    "brand": "New Hira",
    "model": "985 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-122",
    "compatibility": [
      "New Hira 985 Deluxe",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 23,
    "rating": 4.4,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Outlet elbow section for unloading auger path alignment."
  },
  {
    "id": "P123",
    "name": "PTO Shaft Guard",
    "price": 2800,
    "oldPrice": 3248,
    "brand": "Preet",
    "model": "987",
    "machineType": "Combine Harvester",
    "category": "Drive",
    "partNo": "AGT-DRI-123",
    "compatibility": [
      "Preet 987",
      "Combine Harvester",
      "Drive"
    ],
    "stock": 26,
    "rating": 4.5,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Guard for rotating shaft safety and debris protection."
  },
  {
    "id": "P124",
    "name": "Hydraulic Coupler",
    "price": 3549,
    "oldPrice": 4116,
    "brand": "Preet",
    "model": "987 Deluxe",
    "machineType": "Combine Harvester",
    "category": "Hydraulic",
    "partNo": "AGT-HYD-124",
    "compatibility": [
      "Preet 987 Deluxe",
      "Combine Harvester",
      "Hydraulic"
    ],
    "stock": 29,
    "rating": 4.6,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Coupler fitting for hydraulic line connections."
  },
  {
    "id": "P125",
    "name": "Oil Cooler",
    "price": 2948,
    "oldPrice": 3419,
    "brand": "Dasmesh",
    "model": "9100",
    "machineType": "Combine Harvester",
    "category": "Engine",
    "partNo": "AGT-ENG-125",
    "compatibility": [
      "Dasmesh 9100",
      "Combine Harvester",
      "Engine"
    ],
    "stock": 32,
    "rating": 4.7,
    "image": "https://harctor.com/uploads/190620/John-Deere-Combine-Harvester-Oil-Filter_T19044.jpg",
    "description": "Cooler assembly for maintaining hydraulic or engine oil temperature."
  },
  {
    "id": "P126",
    "name": "Cab Step Bracket",
    "price": 1100,
    "oldPrice": 1276,
    "brand": "Dasmesh",
    "model": "Harvest Master",
    "machineType": "Combine Harvester",
    "category": "Cab",
    "partNo": "AGT-CAB-126",
    "compatibility": [
      "Dasmesh Harvest Master",
      "Combine Harvester",
      "Cab"
    ],
    "stock": 8,
    "rating": 4.8,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Entry step bracket for operator access."
  },
  {
    "id": "P127",
    "name": "Chaff Spreader Blade",
    "price": 2049,
    "oldPrice": 2376,
    "brand": "Sonalika",
    "model": "Maharaja 60",
    "machineType": "Combine Harvester",
    "category": "Residue",
    "partNo": "AGT-RES-127",
    "compatibility": [
      "Sonalika Maharaja 60",
      "Combine Harvester",
      "Residue"
    ],
    "stock": 11,
    "rating": 4.9,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Blade for distributing chaff evenly behind the combine."
  },
  {
    "id": "P128",
    "name": "Elevator Tension Bolt",
    "price": 3598,
    "oldPrice": 4173,
    "brand": "Universal",
    "model": "All Models",
    "machineType": "Combine Harvester",
    "category": "Grain Handling",
    "partNo": "AGT-GRA-128",
    "compatibility": [
      "Universal All Models",
      "Combine Harvester",
      "Grain Handling"
    ],
    "stock": 14,
    "rating": 4.2,
    "image": "https://image.made-in-china.com/3f2j00vYWohpRCABbd/Bearing-World-Combine-Harvester-Spare-Parts-4lz-4-0-88HP-and-90HP-Harvester-Spare-Parts-Gearbox-Spare-Parts.webp",
    "description": "Tension bolt for adjusting elevator chain slack."
  },
  {
    "id": "P129",
    "name": "Header Drive Spline",
    "price": 3950,
    "oldPrice": 4582,
    "brand": "New Hira",
    "model": "985 Standard",
    "machineType": "Combine Harvester",
    "category": "Header",
    "partNo": "AGT-HEA-129",
    "compatibility": [
      "New Hira 985 Standard",
      "Combine Harvester",
      "Header"
    ],
    "stock": 17,
    "rating": 4.3,
    "image": "https://image.made-in-china.com/3f2j00BOuWiCVMrPzZ/Reheader-Auger-Weld-World-Combine-Harvester-4lz-6-0p-102HP-Harvester-Cutting-Header-and-Conveyor.webp",
    "description": "Spline component for header drive engagement."
  }
];