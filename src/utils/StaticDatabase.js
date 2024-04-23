import { apotek1, apotek2, apotek3, apotek4, bannerApotek1, bannerPromo1, bannerPromo2, deliveryVoucher, medicine1, medicine2, medicine3, medicine4, sampleDeliveryPromo, sampleFood10, sampleFood11, sampleFood12, sampleFood13, sampleFood2, sampleFood4, sampleFood5, sampleFood6, sampleFood7, sampleFood8, sampleFood9 } from "../assets/images";

export const users=[
    {
        name:'Angela Dias',
        phone :'082175678909',
        email: 'angeladias@hotmail.com',
        password: 'pw12345',
        address: [
            {name: 'Angela',address: 'Jalan Diponegoro, Hadimulyo Barat, Kota Metro', phone:'085709887678'},
            {name: 'Rachel', address: 'Jalan Cendrawasih III, Purwosari, Kota Metro', phone:'085709887789'},
        ]
    },
    {
        name:'Ayu Afifah',
        phone :'082175123456',
        email: 'ayuafifah@gmail.com',
        password: 'qwertyuiop',
        address: [
            {name: 'Angela',address: 'Jalan Diponegoro, Hadimulyo Barat, Kota Metro', phone:'085709887678'},
            {name: 'Rachel', address: 'Jalan Cendrawasih III, Purwosari, Kota Metro', phone:'085709887789'},
        ]
    },
    {
        name:'Test',
        phone :'082175123456',
        email: 'a',
        password: 'a',
        address: [
            {name: 'Angela',address: 'Jalan Diponegoro, Hadimulyo Barat, Kota Metro', phone:'085709887678'},
            {name: 'Rachel', address: 'Jalan Cendrawasih III, Purwosari, Kota Metro', phone:'085709887789'},
        ]
    }
];

export const dummyDataResto=[
    {   
        id:'01',
        restoPicture:sampleFood7 , 
        category:'Bakso, Jajanan', 
        restoName:'Bakso Mas Iwan', 
        restoRating:'4.6', 
        distance:2000, 
        orderTimeEstimation:'45 min', 
        isAlwaysOpen:false,
        quantitySold:200,
        restoDiscounts:[
                    {discount:'15% off'},
        ],
        foods:[
            {id:"01-1", picture:sampleFood7, name:'Bakso Iga', price:25000, rating:'4.7', isFavorite:false },
            {id:"01-2", picture:sampleFood7, name:'Bakso Telor', price:20000, rating:'4.6', isFavorite:false},
        ]
    },
    {
        id:'02',
        restoPicture:sampleFood6 , 
        category:'nasi', 
        restoName:'Nasi Uduk Bunda', 
        restoRating:'4.7', 
        distance:1000, 
        orderTimeEstimation:'25 min', 
        isAlwaysOpen:false,
        quantitySold:250,
        restoDiscounts:[
                    {discount:'10% off'},
        ],
        foods:[
            {id:"02-1", picture:sampleFood6, name:'Nasi Uduk Polos', price:8000, rating:'4.7',isFavorite:false},
            {id:"02-2", picture:sampleFood6, name:'Nasi Uduk Telur', price:11000, rating:'4.9',isFavorite:false},
            {id:"02-3", picture:sampleFood6, name:'Nasi Uduk Ayam', price:14000,rating:'4.8',isFavorite:false},
        ]
    },
    {
        id:'03',
        restoPicture:sampleFood5,
        category:'Jajanan, Sweets, Minuman', 
        restoName:'Mr. Salad Buah', 
        restoRating:'4.0', 
        distance:1500, 
        orderTimeEstimation:'30 min', 
        isAlwaysOpen:false,
        quantitySold:250,
        restoDiscounts:[
                    {discount:'5% off'},
                    {discount:'Gratis Ongkir'}
        ],
        foods:[
            {id:"03-1", picture:sampleFood5, name:'Salad Buah Reguler ', price:15000, rating:'3.8',isFavorite:true},
            {id:"03-2", picture:sampleFood5, name:'Salad Buah Spesial', price:25000, rating:'4.2',isFavorite:false}
        ]
    },
    {
        id:'04',
        restoPicture:sampleFood10,
        category:'Pizza, Jajanan, Barat', 
        restoName:'Meriana Pizza', 
        restoRating:'4.8', 
        distance:1400, 
        orderTimeEstimation:'43 min', 
        isAlwaysOpen:false,
        quantitySold:1250,
        restoDiscounts:[
                    {discount:'30% off'},
                    {discount:'Gratis Ongkir'}
        ],
        foods:[
            {id:"04-1", picture:sampleFood2, name:'Melted Cheese Pizza', price:50000, rating:'4.8',isFavorite:true},
            {id:"04-2", picture:sampleFood13, name:'Classic Pepperoni Pizza', price:45000, rating:'5.0',isFavorite:false},
            {id:"04-3", picture:sampleFood11, name:'Meat with Tomato Pizza', price:55000, rating:'4.6',isFavorite:false},
            {id:"04-4", picture:sampleFood12, name:'Grilled Margherita Pizza', price:50000, rating:'4.8',isFavorite:false}
        ]
    },
    {
        id:'05',
        restoPicture:sampleFood4,
        category:'Jajanan', 
        restoName:'Pempek Tenda Hijau', 
        restoRating:'4.5', 
        distance:1000, 
        orderTimeEstimation:'25 min', 
        isAlwaysOpen:false,
        quantitySold:250,
        restoDiscounts:[
                    {discount:'10% off'}
        ],
        foods:[
            {id:"05-1", picture:sampleFood4, name:'Pempek Lenjer', price:15000, rating:'4.8',isFavorite:false},
            {id:"05-2", picture:sampleFood4, name:'Pempek Kapal Selam', price:15000, rating:'4.2',isFavorite:false},
            {id:"05-3", picture:sampleFood4, name:'Pempek Pistel', price:15000, rating:'4.5',isFavorite:false}
        ]
    },
    {
        id:'06',
        restoPicture:sampleFood9,
        category:'Nasi', 
        restoName:'Nasi Goreng Limarasa', 
        restoRating:'4.5', 
        distance:900, 
        orderTimeEstimation:'20 min', 
        isAlwaysOpen:true,
        quantitySold:350,
        restoDiscounts:[
                    {discount:'35% off'},
                    {discount:'Gratis Ongkir'}
        ],
        foods:[
            {id:"06-1", picture:sampleFood9, name:'Nasi Goreng Reguler', price:14000, rating:'4.5',isFavorite:false},
            {id:"06-2", picture:sampleFood9, name:'Nasi Goreng Spesial', price:20000, rating:'4.5',isFavorite:false}
        ]
    },
    {
        id:'07',
        restoPicture:sampleFood8,
        category:'Sate', 
        restoName:'Sate Madura Mamat', 
        restoRating:'4.5', 
        distance:1500, 
        orderTimeEstimation:'30 min', 
        isAlwaysOpen:true,
        quantitySold:1150,
        restoDiscounts:[
                    {discount:'30% off'},
                    {discount:'Gratis Ongkir'}
        ],
        foods:[
            {id:"07-1", picture:sampleFood9, name:'Sate Kambing', price:25000, rating:'4.5',isFavorite:false},
            {id:"07-2", picture:sampleFood9, name:'Sate Ayam', price:18000, rating:'4.5',isFavorite:false}
        ]
    },

];

export const dummyDataFoods = [
    {id:"01-1", picture:sampleFood7, name:'Bakso Iga', price:25000, rating:'4.7', isFavorite:false, distance:2000, orderTimeEstimation:'45 min'},
    {id:"01-2", picture:sampleFood7, name:'Bakso Telor', price:20000, rating:'4.6', isFavorite:false, distance:2000, orderTimeEstimation:'45 min'},
    
    {id:"02-1", picture:sampleFood6, name:'Nasi Uduk Polos', price:8000, rating:'4.7',isFavorite:false, distance:1000, orderTimeEstimation:'25 min'},
    {id:"02-2", picture:sampleFood6, name:'Nasi Uduk Telur', price:11000, rating:'4.9',isFavorite:false, distance:1000, orderTimeEstimation:'25 min'},
    {id:"02-3", picture:sampleFood6, name:'Nasi Uduk Ayam', price:14000,rating:'4.8',isFavorite:false, distance:1000, orderTimeEstimation:'25 min'},
    
    {id:"03-1", picture:sampleFood5, name:'Salad Buah Reguler ', price:15000, rating:'3.8',isFavorite:true, distance:1500, orderTimeEstimation:'30 min'},
    {id:"03-2", picture:sampleFood5, name:'Salad Buah Spesial', price:25000, rating:'4.2',isFavorite:false, distance:1500, orderTimeEstimation:'39 min'},
    
    {id:"04-1", picture:sampleFood2, name:'Melted Cheese Pizza', price:50000, rating:'4.8',isFavorite:true, distance:1400, orderTimeEstimation:'43 min'},
    {id:"04-2", picture:sampleFood13, name:'Classic Pepperoni Pizza', price:45000, rating:'5.0',isFavorite:false, distance:1400, orderTimeEstimation:'43 min'},
    {id:"04-3", picture:sampleFood11, name:'Meat with Tomato Pizza', price:55000, rating:'4.6',isFavorite:false, distance:1400, orderTimeEstimation:'43 min'},
    {id:"04-4", picture:sampleFood12, name:'Grilled Margherita Pizza', price:50000, rating:'4.8',isFavorite:false, distance:1400, orderTimeEstimation:'43 min'},
    
    {id:"05-1", picture:sampleFood4, name:'Pempek Lenjer', price:15000, rating:'4.8',isFavorite:false, distance:1500, orderTimeEstimation:'25 min'},
    {id:"05-2", picture:sampleFood4, name:'Pempek Kapal Selam', price:15000, rating:'4.2',isFavorite:false, distance:1500, orderTimeEstimation:'25 min'},
    {id:"05-3", picture:sampleFood4, name:'Pempek Pistel', price:15000, rating:'4.5',isFavorite:false, distance:1500, orderTimeEstimation:'25 min'},
    
    {id:"06-1", picture:sampleFood9, name:'Nasi Goreng Reguler', price:14000, rating:'4.5',isFavorite:false, distance:900, orderTimeEstimation:'20 min'},
    {id:"06-2", picture:sampleFood9, name:'Nasi Goreng Spesial', price:20000, rating:'4.5',isFavorite:false, distance:900, orderTimeEstimation:'20 min'},
    
    {id:"07-1", picture:sampleFood9, name:'Sate Kambing', price:25000, rating:'4.5',isFavorite:false, distance:1500, orderTimeEstimation:'30 min'},
    {id:"07-2", picture:sampleFood9, name:'Sate Ayam', price:18000, rating:'4.5',isFavorite:false, distance:1500, orderTimeEstimation:'30 min'}    
];

export const dummyDataVoucherPromo = [
    {banner:bannerPromo1, title: "Potongan Rp. 5000 setiap naik Transportasi Mobil test aja nh ya", validityDate:"1 Desember 2023" },
    {banner:bannerPromo2, title: "Diskon 50% pembelian Crunchy Chicken", validityDate:"12 Desember 2023" },
    {banner:bannerPromo1, title: "Potongan Rp. 5000 setiap naik Transportasi Mobil", validityDate:"1 Desember 2023" },
];

export const dummyDataFoodPromo = [
    {banner:deliveryVoucher, title: "FREE ONGKIR MAKS 20000", validityDate:"10 Desember 2023" },
    {banner:deliveryVoucher, title: "FREE ONGKIR MAKS 10000", validityDate:"10 Desember 2023" },
    {banner:deliveryVoucher, title: "FREE ONGKIR MAKS 10000", validityDate:"10 Desember 2023" }
];

export const dummyDataDeliveryPromo = [
    {banner:sampleDeliveryPromo, title: "Diskon 20% hingga 5.000", validityDate:"10 Desember 2023" },
    {banner:sampleDeliveryPromo, title: "Diskon 20% hingga 5.000", validityDate:"10 Desember 2023" }
];

export const dummyDataPharmPromo = [
    {banner:sampleDeliveryPromo, title: "Diskon 20% hingga 5.000", validityDate:"10 Desember 2023" },
    {banner:sampleDeliveryPromo, title: "Diskon 20% hingga 5.000", validityDate:"10 Desember 2023" }
];

export const dummyDataTransportPromo = [
    {banner:sampleDeliveryPromo, title: "Diskon 20% hingga 5.000", validityDate:"10 Desember 2023", value:5000 },
    {banner:sampleDeliveryPromo, title: "Diskon 20% hingga 5.000", validityDate:"10 Desember 2023", value:5000}
];

export const dummyDataApotek=[
    {id:'01', picture:apotek1, banner:bannerApotek1, address:"Jl. Seminung No. 01, Imopuro, Kec. Metro Pusat", name:'Apotek Metro Medika', rating:'4.9', distance:1200, orderTimeEstimation:'13 min',
        medicine:[
            {id:'01-01', name:'Sanmol Sirup 120 mg / 5 ml',  iconColor:'#3EFF00', price:18500, package:'botol', picture:medicine1},
            {id:'01-02', name:'Tremenza Sirup 60ml',  iconColor:'#163483', price:31000, package:'pcs', picture:medicine2},
            {id:'01-03', name:'Imboost Force Tablet',   iconColor:'#3EFF00', price:7300, package:'strip', picture:medicine3},
            {id:'01-04', name:'Becom C Tablet', iconColor:'#3EFF00', price:18000, package:'botol', picture:medicine4},
        ]
    },
    {id:'02', picture:apotek2, banner:bannerApotek1, address:"Jl. Seminung No. 01, Imopuro, Kec. Metro Pusat", name:'Apotek Kauman Medika', rating:'4.7', distance:1000, orderTimeEstimation:'10 min',
    medicine:[
        {id:'02-01', name:'Sanmol Sirup 120 mg / 5 ml', iconColor:'#3EFF00', price:18500, package:'botol', picture:medicine1},
        {id:'02-02', name:'Tremenza Sirup 60ml', iconColor:'#163483', price:31000, package:'pcs', picture:medicine2},
        {id:'02-03', name:'Imboost Force Tablet', iconColor:'#3EFF00', price:7300, package:'strip', picture:medicine3},
        {id:'02-04', name:'Becom C Tablet', iconColor:'#3EFF00', price:18000, package:'botol', picture:medicine4},
    ]
    },
        {id:'03', picture:apotek3, banner:bannerApotek1, address:"Jl. Seminung No. 01, Imopuro, Kec. Metro Pusat", name:'Apotek Naisya', rating:'4.6', distance:1500, orderTimeEstimation:'16 min',
        medicine:[
            {id:'03-01', name:'Sanmol Sirup 120 mg / 5 ml', iconColor:'#3EFF00', price:18500, package:'botol', picture:medicine1},
            {id:'03-02', name:'Tremenza Sirup 60ml', iconColor:'#163483', price:31000, package:'pcs', picture:medicine2},
            {id:'03-03', name:'Imboost Force Tablet', iconColor:'#3EFF00', price:7300, package:'strip', picture:medicine3},
            {id:'03-04', name:'Becom C Tablet', iconColor:'#3EFF00', price:18000, package:'botol', picture:medicine4},
        ]
    },
    {id:'04', picture:apotek4, banner:bannerApotek1, address:"Jl. Seminung No. 01, Imopuro, Kec. Metro Pusat", name:'Apotek Soedirman', rating:'4.5', distance:1000, orderTimeEstimation:'10 min',
    medicine:[
        {id:'03-01', name:'Sanmol Sirup 120 mg / 5 ml', iconColor:'#3EFF00', price:18500, package:'botol', picture:medicine1},
        {id:'03-02', name:'Tremenza Sirup 60ml', iconColor:'#163483', price:31000, package:'pcs', picture:medicine2},
        {id:'03-03', name:'Imboost Force Tablet', iconColor:'#3EFF00', price:7300, package:'strip', picture:medicine3},
        {id:'03-04', name:'Becom C Tablet', iconColor:'#3EFF00', price:18000, package:'botol', picture:medicine4},
    ]
    },
    {id:'05', picture:apotek1, banner:bannerApotek1, address:"Jl. Seminung No. 01, Imopuro, Kec. Metro Pusat", name:'Apotek Metro Medika 2', rating:'4.9', distance:4200, orderTimeEstimation:'33 min',
    medicine:[
        {id:'05-01', name:'Sanmol Sirup 120 mg / 5 ml', iconColor:'#3EFF00', price:18500, package:'botol', picture:medicine1},
        {id:'05-02', name:'Tremenza Sirup 60ml', iconColor:'#163483', price:31000, package:'pcs', picture:medicine2},
        {id:'05-03', name:'Imboost Force Tablet', iconColor:'#3EFF00', price:7300, package:'strip', picture:medicine3},
        {id:'05-04', name:'Becom C Tablet', iconColor:'#3EFF00', price:18000, package:'botol', picture:medicine4},
    ]
    },
        {id:'06', picture:apotek2, banner:bannerApotek1, address:"Jl. Seminung No. 01, Imopuro, Kec. Metro Pusat", name:'Apotek Kauman Medika 2', rating:'4.7', distance:4000, orderTimeEstimation:'30 min',
        medicine:[
            {id:'06-01', name:'Sanmol Sirup 120 mg / 5 ml', iconColor:'#3EFF00', price:18500, package:'botol', picture:medicine1},
            {id:'06-02', name:'Tremenza Sirup 60ml', iconColor:'#163483', price:31000, package:'pcs', picture:medicine2},
            {id:'06-03', name:'Imboost Force Tablet', iconColor:'#3EFF00', price:7300, package:'strip', picture:medicine3},
            {id:'06-04', name:'Becom C Tablet', iconColor:'#3EFF00', price:18000, package:'botol', picture:medicine4},
        ]
    },
    {id:'07', picture:apotek3, banner:bannerApotek1, address:"Jl. Seminung No. 01, Imopuro, Kec. Metro Pusat", name:'Apotek Naisya 2', rating:'4.6', distance:4500, orderTimeEstimation:'36 min',
    medicine:[
        {id:'07-01', name:'Sanmol Sirup 120 mg / 5 ml', iconColor:'#3EFF00', price:18500, package:'botol', picture:medicine1},
        {id:'07-02', name:'Tremenza Sirup 60ml', iconColor:'#163483', price:31000, package:'pcs', picture:medicine2},
        {id:'07-03', name:'Imboost Force Tablet', iconColor:'#3EFF00', price:7300, package:'strip', picture:medicine3},
        {id:'07-04', name:'Becom C Tablet', iconColor:'#3EFF00', price:18000, package:'botol', picture:medicine4},
    ]
    },
        {id:'08', picture:apotek4, banner:bannerApotek1, address:"Jl. Seminung No. 01, Imopuro, Kec. Metro Pusat", name:'Apotek Soedirman 2', rating:'4.5', distance:4000, orderTimeEstimation:'30 min',
        medicine:[
            {id:'08-01', name:'Sanmol Sirup 120 mg / 5 ml', iconColor:'#3EFF00', price:18500, package:'botol', picture:medicine1},
            {id:'08-02', name:'Tremenza Sirup 60ml', iconColor:'#163483', price:31000, package:'pcs', picture:medicine2},
            {id:'08-03', name:'Imboost Force Tablet', iconColor:'#3EFF00', price:7300, package:'strip', picture:medicine3},
            {id:'08-04', name:'Becom C Tablet', iconColor:'#3EFF00', price:18000, package:'botol', picture:medicine4},
        ]
    }
];



