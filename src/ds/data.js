/* Yala UI-kit mock data. Realistic geek collectibles, prices in S/. (soles). */
(function () {
  const P = (f) => '/assets/products/' + f + '.png';
  const now = Date.now();
  const inMin = (m) => new Date(now + m * 60000);

  const sellers = {
    marco: { id: 'marco', name: 'Marco Salazar', verified: true, rating: 4.8, pct: 98, reviews: 213, since: '2021', sales: 412 },
    cardvault: { id: 'cardvault', name: 'CardVault PE', verified: true, rating: 4.9, pct: 99, reviews: 528, since: '2019', sales: 1340, store: true },
    lucia: { id: 'lucia', name: 'Lucía Pérez', verified: true, rating: 4.6, pct: 95, reviews: 87, since: '2022', sales: 96 },
    geek: { id: 'geek', name: 'GeekLima', verified: false, rating: 4.2, pct: 89, reviews: 41, since: '2023', sales: 38, store: true },
    comic: { id: 'comic', name: 'ComicVault', verified: true, rating: 4.9, pct: 99, reviews: 302, since: '2020', sales: 760, store: true },
    ana: { id: 'ana', name: 'Ana Quispe', verified: false, rating: 4.1, pct: 86, reviews: 19, since: '2024', sales: 14 },
  };

  const listings = [
    { id: 'l1', img: P('charizard'), title: 'Charizard Base Set Holo — 1ª edición', cond: 'PSA 10', price: 14500, cat: 'Pokémon TCG', seller: sellers.marco, fav: true },
    { id: 'l2', img: P('blastoise'), title: 'Blastoise Base Set Holo', cond: 'PSA 8', price: 690, orig: 850, cat: 'Pokémon TCG', seller: sellers.cardvault },
    { id: 'l3', img: P('mewtwo'), title: 'Mewtwo Base Set Holo unlimited', cond: 'PSA 8', price: 420, cat: 'Pokémon TCG', seller: sellers.ana },
    { id: 'l4', img: P('comic-asm'), title: 'Amazing Spider-Man #300 — 1ª Venom', cond: 'CGC 9.6', price: 2100, cat: 'Comics', seller: sellers.comic },
    { id: 'l5', img: P('funko-spider'), title: 'Funko Spider-Man Metallic — sellado', cond: 'Sin gradar', price: 160, cat: 'Funko Pop', seller: sellers.geek },
    { id: 'l6', img: P('comic-batman'), title: 'Batman #423 McFarlane — portada icónica', cond: 'CGC 9.4', price: 980, cat: 'Comics', seller: sellers.comic },
    { id: 'l7', img: P('mewtwo'), title: 'Mewtwo GX Full Art', cond: 'PSA 9', price: 310, cat: 'Pokémon TCG', seller: sellers.lucia },
    { id: 'l8', img: P('funko-vader'), title: 'Funko Darth Vader Glow — exclusivo', cond: 'Sin gradar', price: 220, cat: 'Funko Pop', seller: sellers.geek },
    { id: 'l9', img: P('blastoise'), title: 'Blastoise GX Premium', cond: 'PSA 9', price: 540, cat: 'Pokémon TCG', seller: sellers.cardvault },
    { id: 'l10', img: P('comic-asm'), title: 'Spider-Man #1 Edición especial', cond: 'CGC 9.8', price: 1450, cat: 'Comics', seller: sellers.comic },
    { id: 'l11', img: P('charizard'), title: 'Charizard VMAX Rainbow', cond: 'PSA 10', price: 880, cat: 'Pokémon TCG', seller: sellers.marco },
    { id: 'l12', img: P('funko-vader'), title: 'Funko Boba Fett — caja sellada', cond: 'Sin gradar', price: 140, cat: 'Funko Pop', seller: sellers.geek },
  ];

  const auctions = [
    { id: 'a1', img: P('pikachu'), title: 'Pikachu Illustrator — Promo (PSA 9)', bid: 32000, bids: 47, endsAt: inMin(132), status: 'ACTIVE', seller: sellers.cardvault, start: 25000 },
    { id: 'a2', img: P('umbreon'), title: 'Umbreon VMAX Alt Art — PSA 10', bid: 920, bids: 12, endsAt: inMin(7), status: 'ACTIVE', seller: sellers.lucia, start: 600 },
    { id: 'a3', img: P('lugia'), title: 'Lugia Neo Genesis 1ª Ed — PSA 9', bid: 2750, bids: 31, endsAt: inMin(95), status: 'ACTIVE', seller: sellers.marco, start: 1800 },
    { id: 'a4', img: P('charizard'), title: 'Charizard Shadowless Holo — PSA 9', bid: 8400, bids: 58, endsAt: inMin(220), status: 'ACTIVE', seller: sellers.cardvault, start: 6000 },
    { id: 'a5', img: P('mewtwo'), title: 'Mewtwo Base Set Shadowless', bid: 540, bids: 9, endsAt: inMin(48), status: 'ACTIVE', seller: sellers.ana, start: 400 },
  ];

  // live auction (screen 3) detail with bid history
  const liveAuction = {
    ...auctions[0],
    gallery: [P('pikachu'), P('charizard'), P('umbreon'), P('lugia'), P('mewtwo')],
    desc: 'Pikachu Illustrator, una de las cartas más codiciadas del TCG. Ejemplar gradado PSA 9, conservado en estuche desde su adquisición. Solo 39 copias gradadas en el mundo.',
    cond: 'PSA 9 Mint',
    cat: 'Pokémon TCG',
    minIncrement: 320,
    bidHistory: [
      { user: 'kanto_king', amount: 32000, time: 'hace 2 min', leader: true },
      { user: 'pdiglett', amount: 31700, time: 'hace 5 min' },
      { user: 'Marco S.', amount: 31200, time: 'hace 9 min' },
      { user: 'kanto_king', amount: 30500, time: 'hace 14 min' },
      { user: 'collector_lima', amount: 29800, time: 'hace 21 min' },
      { user: 'pdiglett', amount: 28000, time: 'hace 33 min' },
      { user: 'ash_k', amount: 26500, time: 'hace 48 min' },
    ],
  };

  const orders = [
    { id: '1042', item: listings[0], img: listings[0].img, title: listings[0].title, amount: 14500, status: 'PENDING', party: 'CardVault PE', role: 'buyer', payBy: inMin(180), date: '14 jun 2026' },
    { id: '1039', item: listings[3], img: listings[3].img, title: listings[3].title, amount: 2100, status: 'IN_TRANSIT', party: 'ComicVault', role: 'buyer', tracking: 'OLVA-PE-8842193', date: '10 jun 2026' },
    { id: '1031', img: P('umbreon'), title: 'Umbreon VMAX Alt Art — PSA 10', amount: 920, status: 'COMPLETED', party: 'Lucía Pérez', role: 'buyer', date: '2 jun 2026' },
    { id: '1028', img: P('blastoise'), title: 'Blastoise Base Set Holo', amount: 690, status: 'CONFIRMED', party: 'TCG Store', role: 'buyer', date: '28 may 2026' },
    { id: '1018', img: P('mewtwo'), title: 'Mewtwo Base Set Holo', amount: 420, status: 'CANCELLED', party: 'Ana Quispe', role: 'buyer', date: '20 may 2026' },
  ];

  const checkoutOrder = orders[0];

  const notifications = [
    { id: 'n1', type: 'BID_OUTBID', tone: 'warning', icon: 'Gavel', title: '¡Te superaron!', msg: 'Alguien pujó S/. 3,350 por Umbreon VMAX Alt Art.', time: 'hace 1 min', read: false },
    { id: 'n2', type: 'AUCTION_WON', tone: 'live', icon: 'Gavel', title: '¡Ganaste la subasta!', msg: 'Charizard Shadowless es tuyo por S/. 8,400. Paga en 48h.', time: 'hace 22 min', read: false },
    { id: 'n3', type: 'PAYMENT_RECEIVED', tone: 'success', icon: 'Wallet', title: 'Pago confirmado', msg: 'Recibimos tu pago de la orden #1039.', time: 'hace 3 h', read: false },
    { id: 'n4', type: 'NEW_BID', tone: 'brand', icon: 'Gavel', title: 'Nueva puja en tu subasta', msg: 'Lugia Neo recibió una puja de S/. 2,750.', time: 'hace 5 h', read: true },
    { id: 'n5', type: 'SALE_CONFIRMED', tone: 'success', icon: 'Check', title: 'Venta confirmada', msg: 'Blastoise Base Set fue confirmada por el comprador.', time: 'ayer', read: true },
    { id: 'n6', type: 'SELLER_VERIFIED', tone: 'brand', icon: 'Shield', title: 'Identidad verificada', msg: 'Tu cuenta ahora muestra el ícono de identidad verificada.', time: 'hace 2 días', read: true },
    { id: 'n7', type: 'AUCTION_NO_BIDS', tone: 'warning', icon: 'AlertTriangle', title: 'Subasta sin pujas', msg: 'Mewtwo Shadowless cerró sin ofertas. Puedes relistarla.', time: 'hace 3 días', read: true },
  ];

  // Categorías reales del backend (dinámicas vía GET /api/v1/categories).
  // El nombre real del enum es "Pokémon TCG" (no "Cartas Pokémon"); las
  // categorías inventadas (Cartas Magic / Figuras / Accesorios) se quitaron.
  // Al conectar el backend, esto se reemplaza por el fetch real.
  const categories = [
    { name: 'Pokémon TCG', count: 1284 },
    { name: 'Funko Pop', count: 642 },
    { name: 'Comics', count: 418 },
  ];

  const sellerMetrics = {
    salesTotal: 28450, commission: 2276, net: 26174,
    activeListings: 14, maxListings: 20, activeAuctions: 3,
  };

  window.YData = {
    P, sellers, listings, auctions, liveAuction, orders, checkoutOrder,
    notifications, categories, sellerMetrics,
  };
})();
