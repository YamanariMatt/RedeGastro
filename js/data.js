window.RedeGastroData = {
  professionals: [
    {
      id: "lucas-almeida",
      name: "Lucas Almeida",
      role: "Garçom freelancer",
      neighborhood: "Centro",
      city: "Campo Grande/MS",
      rating: 4.8,
      reviews: 32,
      experience: "5 anos",
      availability: "Disponível hoje",
      tags: ["Salão", "Eventos", "Atendimento"],
      featured: true
    },
    {
      id: "marina-souza",
      name: "Marina Souza",
      role: "Cozinheira",
      neighborhood: "Jardim dos Estados",
      city: "Campo Grande/MS",
      rating: 4.9,
      reviews: 41,
      experience: "7 anos",
      availability: "Disponível amanhã",
      tags: ["Pratos executivos", "Buffet", "Organização"],
      featured: true
    },
    {
      id: "bruno-martins",
      name: "Bruno Martins",
      role: "Bartender",
      neighborhood: "Vila Planalto",
      city: "Campo Grande/MS",
      rating: 4.7,
      reviews: 26,
      experience: "4 anos",
      availability: "Noites e eventos",
      tags: ["Drinks", "Eventos", "Bar"],
      featured: true
    },
    {
      id: "camila-rocha",
      name: "Camila Rocha",
      role: "Confeiteira",
      neighborhood: "Tiradentes",
      city: "Campo Grande/MS",
      rating: 4.9,
      reviews: 38,
      experience: "6 anos",
      availability: "Finais de semana",
      tags: ["Bolos", "Doces finos", "Eventos"],
      featured: true
    },
    {
      id: "diego-oliveira",
      name: "Diego Oliveira",
      role: "Pizzaiolo",
      neighborhood: "Santa Fé",
      city: "Campo Grande/MS",
      rating: 4.6,
      reviews: 19,
      experience: "4 anos",
      availability: "Disponível hoje",
      tags: ["Forno", "Massa", "Produção"],
      featured: false
    },
    {
      id: "aline-costa",
      name: "Aline Costa",
      role: "Barista",
      neighborhood: "Chácara Cachoeira",
      city: "Campo Grande/MS",
      rating: 4.8,
      reviews: 24,
      experience: "3 anos",
      availability: "Manhãs",
      tags: ["Cafeteria", "Latte art", "Atendimento"],
      featured: false
    }
  ],
  jobs: [
    {
      id: "garcom-plantao-noturno",
      title: "Garçom para plantão noturno",
      role: "Garçom",
      restaurant: "Sabor & Brasa Restaurante",
      neighborhood: "Centro",
      date: "Hoje",
      time: "18h às 23h",
      value: "R$ 140",
      type: "Plantão",
      urgent: true,
      createdAt: "2026-05-25",
      description: "Apoio no salão durante movimento de jantar."
    },
    {
      id: "cozinheiro-evento-buffet",
      title: "Cozinheiro para evento corporativo",
      role: "Cozinheiro",
      restaurant: "Buffet Dona Nair",
      neighborhood: "Jardim América",
      date: "Amanhã",
      time: "9h às 16h",
      value: "R$ 220",
      type: "Evento",
      urgent: true,
      createdAt: "2026-05-24",
      description: "Preparação e finalização de pratos para buffet."
    },
    {
      id: "barista-cafeteria-sabado",
      title: "Barista para sábado",
      role: "Barista",
      restaurant: "Café Ipê",
      neighborhood: "Chácara Cachoeira",
      date: "Sábado",
      time: "7h às 13h",
      value: "R$ 120",
      type: "Diária",
      urgent: true,
      createdAt: "2026-05-23",
      description: "Atendimento no balcão e preparo de cafés especiais."
    },
    {
      id: "pizzaiolo-recorrente",
      title: "Pizzaiolo para fins de semana",
      role: "Pizzaiolo",
      restaurant: "Forno da Vila",
      neighborhood: "Santa Fé",
      date: "Sexta a domingo",
      time: "17h às 23h",
      value: "R$ 180/dia",
      type: "Recorrente",
      urgent: false,
      createdAt: "2026-05-22",
      description: "Produção de pizzas, abertura de massa e organização da praça."
    }
  ],
  restaurants: [
    {
      id: "sabor-brasa",
      name: "Sabor & Brasa Restaurante",
      type: "Restaurante",
      neighborhood: "Centro",
      city: "Campo Grande/MS",
      rating: 4.7
    },
    {
      id: "buffet-dona-nair",
      name: "Buffet Dona Nair",
      type: "Buffet",
      neighborhood: "Jardim América",
      city: "Campo Grande/MS",
      rating: 4.8
    },
    {
      id: "cafe-ipe",
      name: "Café Ipê",
      type: "Cafeteria",
      neighborhood: "Chácara Cachoeira",
      city: "Campo Grande/MS",
      rating: 4.6
    }
  ],
  reviews: [
    {
      id: "review-1",
      professionalId: "lucas-almeida",
      restaurant: "Sabor & Brasa Restaurante",
      rating: 5,
      comment: "Pontual, educado e muito atento no atendimento ao salão.",
      date: "20/05/2026"
    },
    {
      id: "review-2",
      professionalId: "marina-souza",
      restaurant: "Buffet Dona Nair",
      rating: 5,
      comment: "Boa organização de praça e agilidade durante o evento.",
      date: "18/05/2026"
    }
  ]
};
