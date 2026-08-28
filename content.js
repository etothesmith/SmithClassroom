const PACKS = [
  {
    "id": "ap-econ",
    "color": "#4DE0B1",
    "name": {
      "en": "AP Economics",
      "es": "Economía AP"
    },
    "units": [
      {
        "id": "ap-m1",
        "title": {
          "en": "Macro Unit 1 · Basic Economic Concepts",
          "es": "Macro Unidad 1 · Conceptos económicos básicos"
        },
        "brief": {
          "en": "Scarcity forces choice, and every choice has an opportunity cost: the value of the next-best option given up. The production possibilities curve shows the maximum combinations an economy can produce; interior points are inefficient, exterior points are unattainable today. A bowed-out curve reflects increasing opportunity cost because resources are not equally suited to both goods. Comparative advantage — the lower opportunity cost, not the larger output — determines who should specialize, and trade between two parties benefits both when the terms of trade fall between their opportunity costs. Growth shifts the whole curve outward through more resources, better technology, or more capital.",
          "es": "La escasez obliga a elegir y toda elección tiene un costo de oportunidad: el valor de la mejor alternativa sacrificada. La curva de posibilidades de producción muestra las combinaciones máximas que una economía puede producir; los puntos interiores son ineficientes y los exteriores son inalcanzables hoy. Una curva cóncava refleja costos de oportunidad crecientes porque los recursos no sirven igual para ambos bienes. La ventaja comparativa —el menor costo de oportunidad, no la mayor producción— determina quién debe especializarse, y el comercio beneficia a ambas partes cuando los términos de intercambio quedan entre sus costos de oportunidad. El crecimiento desplaza toda la curva hacia afuera con más recursos, mejor tecnología o más capital."
        },
        "items": [
          {
            "id": "apm101",
            "topic": "costs",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which statement best describes scarcity?",
              "es": "¿Qué afirmación describe mejor la escasez?"
            },
            "c": {
              "en": [
                "Wants are unlimited but resources are limited",
                "There is not enough money in the economy",
                "The government restricts supply of certain goods",
                "People choose not to work hard enough"
              ],
              "es": [
                "Los deseos son ilimitados pero los recursos son limitados",
                "No hay suficiente dinero en la economía",
                "El gobierno restringe ciertos bienes",
                "La gente no trabaja lo suficiente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Scarcity exists because human wants exceed the resources available to satisfy them — this is true in every economy, rich or poor.",
              "es": "La escasez existe porque los deseos humanos superan los recursos disponibles, en toda economía."
            }
          },
          {
            "id": "apm102",
            "topic": "costs",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The four factors of production are:",
              "es": "Los cuatro factores de producción son:"
            },
            "c": {
              "en": [
                "Land, labor, capital, entrepreneurship",
                "Money, machines, workers, ideas",
                "Supply, demand, price, quantity",
                "Goods, services, exports, imports"
              ],
              "es": [
                "Tierra, trabajo, capital, emprendimiento",
                "Dinero, máquinas, trabajadores, ideas",
                "Oferta, demanda, precio, cantidad",
                "Bienes, servicios, exportaciones, importaciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "Capital means physical tools and equipment, not money. Entrepreneurship is the willingness to combine the other three and take risk.",
              "es": "Capital son herramientas y equipo, no dinero. Emprendimiento es la voluntad de combinar los otros tres y asumir riesgo."
            }
          },
          {
            "id": "apm103",
            "topic": "costs",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which of these is a factor of production classified as 'capital'?",
              "es": "¿Cuál de estos es un factor de producción clasificado como 'capital'?"
            },
            "c": {
              "en": [
                "A factory's assembly-line robot",
                "A $10,000 bank deposit",
                "A share of stock in a corporation",
                "A $50 bill in a cash register"
              ],
              "es": [
                "Un robot de línea de ensamblaje",
                "Un depósito bancario de $10,000",
                "Una acción bursátil",
                "Un billete de $50 en caja"
              ]
            },
            "a": 0,
            "why": {
              "en": "In economics, capital means physical tools and equipment used to produce other goods — not money or financial assets.",
              "es": "En economía, capital son herramientas y equipo físico para producir, no dinero ni activos financieros."
            }
          },
          {
            "id": "apm104",
            "topic": "costs",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "A country can produce 10 tractors or 40 tons of wheat. What is the opportunity cost of one tractor, in tons of wheat?",
              "es": "Un país puede producir 10 tractores o 40 toneladas de trigo. ¿Cuál es el costo de oportunidad de un tractor, en toneladas de trigo?"
            },
            "a": 4,
            "tol": 0,
            "why": {
              "en": "40 ÷ 10 = 4 tons of wheat given up per tractor.",
              "es": "40 ÷ 10 = 4 toneladas de trigo sacrificadas por tractor."
            }
          },
          {
            "id": "apm105",
            "topic": "costs",
            "type": "numeric",
            "diff": 2,
            "variantOf": "apm104",
            "q": {
              "en": "A firm can produce 25 desks or 100 chairs. What is the opportunity cost of one desk, in chairs?",
              "es": "Una empresa puede producir 25 escritorios o 100 sillas. ¿Cuál es el costo de oportunidad de un escritorio, en sillas?"
            },
            "a": 4,
            "tol": 0,
            "why": {
              "en": "100 ÷ 25 = 4 chairs given up per desk.",
              "es": "100 ÷ 25 = 4 sillas sacrificadas por escritorio."
            }
          },
          {
            "id": "apm106",
            "topic": "costs",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Using the same firm (25 desks or 100 chairs), what is the opportunity cost of one chair, in desks?",
              "es": "Usando la misma empresa (25 escritorios o 100 sillas), ¿cuál es el costo de oportunidad de una silla, en escritorios?"
            },
            "a": 0.25,
            "tol": 0.01,
            "why": {
              "en": "25 ÷ 100 = 0.25 desks per chair. Notice this is the reciprocal of the cost of a desk (1/4).",
              "es": "25 ÷ 100 = 0.25 escritorios por silla. Noten que es el recíproco del costo de un escritorio (1/4)."
            }
          },
          {
            "id": "apm107",
            "topic": "costs",
            "type": "short",
            "diff": 2,
            "q": {
              "en": "Define opportunity cost in one sentence.",
              "es": "Define el costo de oportunidad en una oración."
            },
            "keys": [
              "next best",
              "next-best",
              "forgone",
              "foregone",
              "given up",
              "sacrific",
              "alternativa",
              "renunc"
            ],
            "ideaLabel": {
              "en": "a complete definition",
              "es": "una definición completa"
            },
            "spec": {
              "minWords": 3,
              "ideas": [
                {
                  "id": "forgone",
                  "label": "what you give up",
                  "any": [
                    "give up",
                    "gave up",
                    "given up",
                    "sacrifice",
                    "forgo",
                    "lose",
                    "lost",
                    "miss out",
                    "pass up",
                    "not chosen",
                    "not choose",
                    "not taken",
                    "forfeit",
                    "surrender",
                    "passed on",
                    "let go",
                    "renunci",
                    "sacrific"
                  ]
                },
                {
                  "id": "nextbest",
                  "label": "the next-best alternative specifically",
                  "any": [
                    "next best",
                    "second best",
                    "best alternative",
                    "best option",
                    "best choice",
                    "most valuable alternative",
                    "highest valued alternative",
                    "next highest",
                    "next most valuable",
                    "mejor alternativa",
                    "mejor opcion"
                  ]
                }
              ],
              "reject": [
                {
                  "any": [
                    "money you spend",
                    "money spent",
                    "price you pay",
                    "how much it costs",
                    "dinero que gastas"
                  ],
                  "why": "Careful — opportunity cost isn't the money spent. It's the alternative you turned down."
                },
                {
                  "any": [
                    "everything you give up",
                    "all the things you give up",
                    "all alternatives",
                    "todo lo que pierdes"
                  ],
                  "why": "Close, but it's only the next-best alternative, not everything you passed on."
                }
              ],
              "onPass": "That's it — the value of the next-best alternative you gave up."
            },
            "why": {
              "en": "Opportunity cost is the value of the next-best alternative given up when a choice is made.",
              "es": "El costo de oportunidad es el valor de la mejor alternativa a la que se renuncia al elegir."
            }
          },
          {
            "id": "apm108",
            "topic": "costs",
            "type": "short",
            "diff": 2,
            "q": {
              "en": "You skip a $12/hr tutoring shift to attend a concert with a free ticket. What is your opportunity cost, and why?",
              "es": "Dejas un turno de tutoría de $12/hr para ir a un concierto con boleto gratis. ¿Cuál es tu costo de oportunidad y por qué?"
            },
            "keys": [
              "12",
              "tutoring",
              "shift",
              "wage",
              "earn",
              "turno",
              "salario"
            ],
            "ideaLabel": {
              "en": "the correct cost and reasoning",
              "es": "el costo correcto y razonamiento"
            },
            "spec": {
              "minWords": 3,
              "number": {
                "value": 12,
                "tol": 0.5,
                "label": "the $12 you gave up"
              },
              "ideas": [
                {
                  "id": "forgone",
                  "label": "naming what was given up (the shift/wages)",
                  "any": [
                    "tutoring",
                    "shift",
                    "wage",
                    "earn",
                    "hour",
                    "pay",
                    "work",
                    "income",
                    "job",
                    "turno",
                    "salario",
                    "ganar",
                    "trabajo"
                  ]
                }
              ],
              "reject": [
                {
                  "any": [
                    "ticket",
                    "concert cost",
                    "price of the concert",
                    "costo del concierto"
                  ],
                  "why": "The ticket was free, so the concert cost nothing out of pocket. Your opportunity cost is the $12/hr you didn't earn."
                }
              ],
              "onPass": "Right — the $12/hr shift is the next-best alternative you gave up. The free ticket isn't a cost."
            },
            "why": {
              "en": "The opportunity cost is the $12/hr you forgo, not the concert ticket (which was free).",
              "es": "El costo de oportunidad son los $12/hr que dejas de ganar, no el boleto (que era gratis)."
            }
          },
          {
            "id": "apm109",
            "topic": "costs",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Maria can study for her economics test or work a 4-hour shift earning $15/hr. If she studies, what is her opportunity cost?",
              "es": "María puede estudiar para su examen de economía o trabajar 4 horas a $15/hr. Si estudia, ¿cuál es su costo de oportunidad?"
            },
            "c": {
              "en": [
                "$60 in lost wages",
                "The grade she earns on the test",
                "$15, one hour of wages",
                "Nothing, because studying is productive"
              ],
              "es": [
                "$60 en salario perdido",
                "La nota del examen",
                "$15, una hora de salario",
                "Nada, porque estudiar es productivo"
              ]
            },
            "a": 0,
            "why": {
              "en": "She gives up 4 hours × $15 = $60. The study session has benefits, but the cost is what she sacrificed.",
              "es": "Deja de ganar 4 × $15 = $60. Estudiar tiene beneficios, pero el costo es lo que sacrificó."
            }
          },
          {
            "id": "apm120",
            "topic": "ppc",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "A point inside the production possibilities curve means the economy is:",
              "es": "Un punto dentro de la curva de posibilidades de producción significa que la economía está:"
            },
            "c": {
              "en": [
                "Using its resources inefficiently",
                "Growing rapidly",
                "Producing an unattainable combination",
                "At maximum efficiency"
              ],
              "es": [
                "Usando sus recursos de forma ineficiente",
                "Creciendo rápidamente",
                "Produciendo una combinación inalcanzable",
                "En eficiencia máxima"
              ]
            },
            "a": 0,
            "why": {
              "en": "Interior points leave resources idle or misused, so more of both goods could be produced.",
              "es": "Los puntos interiores dejan recursos ociosos o mal usados, así que se podría producir más de ambos bienes."
            }
          },
          {
            "id": "apm121",
            "topic": "ppc",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "A point outside the production possibilities curve represents:",
              "es": "Un punto fuera de la curva de posibilidades de producción representa:"
            },
            "c": {
              "en": [
                "A combination the economy cannot currently produce",
                "Maximum efficiency",
                "An inefficient use of resources",
                "Comparative advantage"
              ],
              "es": [
                "Una combinación que la economía no puede producir actualmente",
                "Eficiencia máxima",
                "Uso ineficiente de recursos",
                "Ventaja comparativa"
              ]
            },
            "a": 0,
            "why": {
              "en": "Points beyond the curve require more resources or better technology than the economy currently has.",
              "es": "Los puntos más allá de la curva requieren más recursos o mejor tecnología de la que la economía tiene."
            }
          },
          {
            "id": "apm122",
            "topic": "ppc",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A production possibilities curve bows outward from the origin because:",
              "es": "Una curva de posibilidades de producción es cóncava respecto al origen porque:"
            },
            "c": {
              "en": [
                "Resources are not equally productive in both uses",
                "Technology never changes",
                "Money is neutral in the long run",
                "Trade is restricted"
              ],
              "es": [
                "Los recursos no son igual de productivos en ambos usos",
                "La tecnología nunca cambia",
                "El dinero es neutral a largo plazo",
                "El comercio está restringido"
              ]
            },
            "a": 0,
            "why": {
              "en": "Moving specialized resources into their weaker use raises opportunity cost as output expands — the law of increasing opportunity cost.",
              "es": "Trasladar recursos especializados a su uso menos apto eleva el costo de oportunidad al aumentar la producción."
            }
          },
          {
            "id": "apm123",
            "topic": "ppc",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "If a PPC is a straight line rather than bowed out, what must be true?",
              "es": "Si una CPP es una línea recta en vez de ser cóncava, ¿qué debe ser cierto?"
            },
            "c": {
              "en": [
                "Opportunity cost is constant as production shifts",
                "The economy is inefficient",
                "Technology is improving",
                "The economy has only one resource"
              ],
              "es": [
                "El costo de oportunidad es constante al cambiar producción",
                "La economía es ineficiente",
                "La tecnología mejora",
                "La economía tiene solo un recurso"
              ]
            },
            "a": 0,
            "why": {
              "en": "A straight-line PPC means resources are equally suited to both goods, so each unit shifted costs the same as the last.",
              "es": "Una CPP recta significa que los recursos sirven igual para ambos bienes, así que cada unidad transferida cuesta lo mismo."
            }
          },
          {
            "id": "apm124",
            "topic": "ppc",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every situation that puts an economy INSIDE its production possibilities curve.",
              "es": "Selecciona cada situación que sitúa a una economía DENTRO de su curva de posibilidades de producción."
            },
            "c": {
              "en": [
                "A deep recession with idle factories",
                "High cyclical unemployment",
                "A new technology raising output",
                "Full employment with efficient production"
              ],
              "es": [
                "Una recesión profunda con fábricas ociosas",
                "Alto desempleo cíclico",
                "Una nueva tecnología que eleva la producción",
                "Pleno empleo con producción eficiente"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "Idle resources (recession, unemployment) place the economy inside the curve; technology and full employment put it on or shift the curve.",
              "es": "Recursos ociosos (recesión, desempleo) sitúan la economía dentro de la curva; tecnología y pleno empleo la ponen sobre ella."
            }
          },
          {
            "id": "apm125",
            "topic": "ppc",
            "type": "short",
            "diff": 2,
            "q": {
              "en": "Explain why a point inside the PPC is inefficient. What does it tell us about the economy's resources?",
              "es": "Explica por qué un punto dentro de la CPP es ineficiente. ¿Qué nos dice sobre los recursos de la economía?"
            },
            "keys": [
              "idle",
              "unused",
              "wasted",
              "misallocat",
              "unemploy",
              "not using",
              "ocioso",
              "desemple",
              "desperdici"
            ],
            "ideaLabel": {
              "en": "resources being wasted or idle",
              "es": "recursos ociosos o desperdiciados"
            },
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "idle",
                  "label": "resources not being fully used",
                  "any": [
                    "idle",
                    "unused",
                    "wasted",
                    "not fully used",
                    "not using all",
                    "underused",
                    "sitting idle",
                    "misallocated",
                    "unemployed",
                    "not employed",
                    "slack",
                    "left out",
                    "ocioso",
                    "desperdici",
                    "desemple",
                    "sin usar"
                  ]
                },
                {
                  "id": "more",
                  "label": "could produce more of one or both goods",
                  "any": [
                    "produce more",
                    "make more",
                    "more of both",
                    "increase output",
                    "not at capacity",
                    "room to grow",
                    "could do better",
                    "producir mas",
                    "más de ambos"
                  ]
                }
              ],
              "onPass": "Right — idle or misallocated resources mean the economy could produce more without giving anything up."
            },
            "why": {
              "en": "Interior points mean resources are idle or misallocated — the economy could produce more of both goods.",
              "es": "Los puntos interiores significan recursos ociosos o mal asignados — la economía podría producir más de ambos bienes."
            }
          },
          {
            "id": "apm126",
            "topic": "ppc",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "An economy moves from a point inside its PPC to a point on the curve. Which best explains this change?",
              "es": "Una economía se mueve de un punto dentro de su CPP a un punto sobre la curva. ¿Qué explica mejor este cambio?"
            },
            "c": {
              "en": [
                "Previously unemployed resources were put to work",
                "New technology was discovered",
                "The country began trading with others",
                "Population decreased"
              ],
              "es": [
                "Recursos antes desempleados se pusieron a trabajar",
                "Se descubrió nueva tecnología",
                "El país empezó a comerciar",
                "La población disminuyó"
              ]
            },
            "a": 0,
            "why": {
              "en": "Moving to the curve means using existing resources fully — the curve itself didn't shift, so it's not growth.",
              "es": "Moverse a la curva significa usar plenamente los recursos existentes — la curva no se movió, así que no es crecimiento."
            }
          },
          {
            "id": "apm140",
            "topic": "trade",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Nation A gives up 4 tons of wheat per tractor; Nation B gives up 2 tons per tractor. Who should specialize in tractors?",
              "es": "La nación A sacrifica 4 toneladas de trigo por tractor; la nación B sacrifica 2. ¿Quién debe especializarse en tractores?"
            },
            "c": {
              "en": [
                "Nation B, which has the lower opportunity cost",
                "Nation A, which has the higher opportunity cost",
                "Both equally",
                "Neither should specialize"
              ],
              "es": [
                "La nación B, con menor costo de oportunidad",
                "La nación A, con mayor costo de oportunidad",
                "Ambas por igual",
                "Ninguna debe especializarse"
              ]
            },
            "a": 0,
            "why": {
              "en": "Comparative advantage belongs to the producer with the lower opportunity cost.",
              "es": "La ventaja comparativa es del productor con el menor costo de oportunidad."
            }
          },
          {
            "id": "apm141",
            "topic": "trade",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Nation A produces more of both goods than Nation B. This means Nation A definitely has:",
              "es": "La nación A produce más de ambos bienes que la nación B. Esto significa que la nación A definitivamente tiene:"
            },
            "c": {
              "en": [
                "Absolute advantage in both goods",
                "Comparative advantage in both goods",
                "No reason to trade",
                "Higher opportunity costs"
              ],
              "es": [
                "Ventaja absoluta en ambos bienes",
                "Ventaja comparativa en ambos bienes",
                "Ninguna razón para comerciar",
                "Costos de oportunidad más altos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Producing more is absolute advantage. A country cannot have comparative advantage in both goods — one's gain is the other's, which is why trade still benefits both.",
              "es": "Producir más es ventaja absoluta. Un país no puede tener ventaja comparativa en ambos bienes, por eso el comercio beneficia a ambos."
            }
          },
          {
            "id": "apm142",
            "topic": "trade",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Can a country have comparative advantage in both goods it produces?",
              "es": "¿Puede un país tener ventaja comparativa en ambos bienes que produce?"
            },
            "c": {
              "en": [
                "No — if your cost of one good is lower, your cost of the other must be higher",
                "Yes, if it has more resources than the other country",
                "Yes, if it has better technology",
                "It depends on the exchange rate"
              ],
              "es": [
                "No — si tu costo de un bien es menor, tu costo del otro debe ser mayor",
                "Sí, si tiene más recursos",
                "Sí, si tiene mejor tecnología",
                "Depende del tipo de cambio"
              ]
            },
            "a": 0,
            "why": {
              "en": "Opportunity costs are reciprocals. If you're cheaper at tractors, you're necessarily dearer at wheat — and vice versa.",
              "es": "Los costos de oportunidad son recíprocos. Si eres más barato en tractores, eres necesariamente más caro en trigo."
            }
          },
          {
            "id": "apm143",
            "topic": "trade",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Nation A gives up 4 wheat per tractor, Nation B gives up 2 wheat per tractor. For trade to benefit both, the price of one tractor must be between ___ and ___ tons of wheat. What is the LOWER bound?",
              "es": "A sacrifica 4 trigo por tractor, B sacrifica 2. Para que el comercio beneficie a ambos, el precio de un tractor debe estar entre ___ y ___ toneladas de trigo. ¿Cuál es el límite INFERIOR?"
            },
            "a": 2,
            "tol": 0,
            "why": {
              "en": "The terms of trade must fall between the two opportunity costs: more than 2 (so B benefits) and less than 4 (so A benefits).",
              "es": "Los términos de intercambio deben estar entre los dos costos de oportunidad: más de 2 (para que B se beneficie) y menos de 4 (para que A se beneficie)."
            }
          },
          {
            "id": "apm144",
            "topic": "trade",
            "type": "numeric",
            "diff": 2,
            "variantOf": "apm143",
            "q": {
              "en": "Using the same nations (A: 4 wheat/tractor, B: 2 wheat/tractor), what is the UPPER bound for the price of one tractor in tons of wheat?",
              "es": "Usando las mismas naciones (A: 4 trigo/tractor, B: 2 trigo/tractor), ¿cuál es el límite SUPERIOR del precio de un tractor en toneladas de trigo?"
            },
            "a": 4,
            "tol": 0,
            "why": {
              "en": "A would only buy tractors from B if the price is below 4 (A's own cost). B would only sell if the price is above 2 (B's own cost).",
              "es": "A solo compraría tractores de B si el precio es menor a 4 (su propio costo). B solo vendería si el precio es mayor a 2 (su propio costo)."
            }
          },
          {
            "id": "apm145",
            "topic": "trade",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Nation A produces more of both goods than Nation B, but Nation B has a lower opportunity cost for tractors. Explain why both nations still benefit from specializing and trading.",
              "es": "La nación A produce más de ambos bienes, pero B tiene menor costo de oportunidad en tractores. Explica por qué ambas naciones se benefician al especializarse y comerciar."
            },
            "keys": [
              "comparative",
              "opportunity cost",
              "lower cost",
              "speciali",
              "ventaja comparativa",
              "costo de oportunidad",
              "especiali"
            ],
            "ideaLabel": {
              "en": "why trade benefits both despite unequal output",
              "es": "por qué ambos se benefician pese a producción desigual"
            },
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "comp",
                  "label": "comparative advantage (lower cost) deciding specialization",
                  "any": [
                    "comparative advantage",
                    "lower opportunity cost",
                    "lower cost",
                    "gives up less",
                    "sacrifice less",
                    "cheaper to produce",
                    "less costly",
                    "ventaja comparativa",
                    "menor costo"
                  ]
                },
                {
                  "id": "notabs",
                  "label": "why absolute advantage doesn't decide it",
                  "any": [
                    "absolute advantage",
                    "producing more",
                    "produce more",
                    "total output",
                    "not about how much",
                    "not about output",
                    "doesn't matter who produces more",
                    "ventaja absoluta",
                    "producir mas"
                  ]
                }
              ],
              "reject": [
                {
                  "any": [
                    "produces more so they should",
                    "bigger so they should",
                    "more output means they should"
                  ],
                  "why": "That's absolute advantage. Producing more doesn't decide who specializes — sacrificing less does."
                }
              ],
              "onPass": "Exactly — specialization follows comparative advantage (lower cost), not absolute advantage (bigger output). Both end up with more than they could produce alone."
            },
            "why": {
              "en": "Trade follows comparative advantage, not absolute advantage. Each nation specializes where its cost is lower, and both end up with more.",
              "es": "El comercio sigue la ventaja comparativa, no la absoluta. Cada nación se especializa donde su costo es menor, y ambas obtienen más."
            }
          },
          {
            "id": "apm146",
            "topic": "trade",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "Nation C can produce 30 phones or 60 tons of food. Nation D can produce 20 phones or 80 tons of food. What is Nation C's opportunity cost of one phone, in tons of food?",
              "es": "La nación C puede producir 30 teléfonos o 60 toneladas de alimentos. La nación D puede producir 20 teléfonos o 80 toneladas de alimentos. ¿Cuál es el costo de oportunidad de un teléfono para C, en toneladas de alimentos?"
            },
            "a": 2,
            "tol": 0,
            "why": {
              "en": "60 food ÷ 30 phones = 2 tons of food per phone for Nation C.",
              "es": "60 alimentos ÷ 30 teléfonos = 2 toneladas de alimentos por teléfono para C."
            }
          },
          {
            "id": "apm147",
            "topic": "trade",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Using the same data (C: 30 phones or 60 food; D: 20 phones or 80 food), who has comparative advantage in phones?",
              "es": "Usando los mismos datos (C: 30 teléfonos o 60 alimentos; D: 20 teléfonos o 80 alimentos), ¿quién tiene ventaja comparativa en teléfonos?"
            },
            "c": {
              "en": [
                "Nation C (gives up 2 food per phone vs D's 4)",
                "Nation D (gives up 4 food per phone)",
                "Neither — they have the same cost",
                "Both have comparative advantage in phones"
              ],
              "es": [
                "La nación C (sacrifica 2 alimentos por teléfono vs 4 de D)",
                "La nación D (sacrifica 4 alimentos)",
                "Ninguna — tienen el mismo costo",
                "Ambas tienen ventaja comparativa en teléfonos"
              ]
            },
            "a": 0,
            "why": {
              "en": "C: 60÷30 = 2 food/phone. D: 80÷20 = 4 food/phone. C gives up less, so C has the comparative advantage in phones.",
              "es": "C: 60÷30 = 2 alimentos/teléfono. D: 80÷20 = 4 alimentos/teléfono. C sacrifica menos, así que C tiene ventaja comparativa en teléfonos."
            }
          },
          {
            "id": "apm160",
            "topic": "growth",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which event shifts the entire production possibilities curve outward?",
              "es": "¿Qué evento desplaza toda la curva de posibilidades de producción hacia afuera?"
            },
            "c": {
              "en": [
                "A permanent improvement in technology",
                "A change in consumer taste",
                "A rise in cyclical unemployment",
                "Producing a different mix of the same two goods"
              ],
              "es": [
                "Una mejora permanente de la tecnología",
                "Un cambio en los gustos del consumidor",
                "Un aumento del desempleo cíclico",
                "Producir otra combinación de los mismos bienes"
              ]
            },
            "a": 0,
            "why": {
              "en": "Growth requires more or better resources, capital, or technology — not just moving along the existing curve.",
              "es": "El crecimiento requiere más o mejores recursos, capital o tecnología, no moverse sobre la curva."
            }
          },
          {
            "id": "apm161",
            "topic": "growth",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select ALL factors that would shift a country's PPC outward.",
              "es": "Selecciona TODOS los factores que desplazarían la CPP de un país hacia afuera."
            },
            "c": {
              "en": [
                "Discovery of new natural resources",
                "Immigration increasing the labor force",
                "An advance in production technology",
                "A decrease in consumer spending"
              ],
              "es": [
                "Descubrimiento de nuevos recursos naturales",
                "Inmigración que aumenta la fuerza laboral",
                "Un avance en tecnología de producción",
                "Una disminución del gasto del consumidor"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "More land, more labor, and better technology all increase productive capacity. Consumer spending changes demand, not the capacity to produce.",
              "es": "Más tierra, más trabajo y mejor tecnología aumentan la capacidad productiva. El gasto del consumidor cambia la demanda, no la capacidad de producir."
            }
          },
          {
            "id": "apm162",
            "topic": "growth",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "An economy shifts resources from consumer goods toward capital goods this year. The most likely long-run result is:",
              "es": "Una economía traslada recursos de bienes de consumo a bienes de capital este año. El resultado más probable a largo plazo es:"
            },
            "c": {
              "en": [
                "The PPC shifts outward in future years",
                "The PPC shifts inward immediately",
                "The economy moves inside its current PPC",
                "Consumer prices fall right away"
              ],
              "es": [
                "La CPP se desplaza hacia afuera en años futuros",
                "La CPP se desplaza hacia adentro de inmediato",
                "La economía se mueve dentro de su CPP actual",
                "Los precios al consumidor bajan de inmediato"
              ]
            },
            "a": 0,
            "why": {
              "en": "More capital goods today → greater productive capacity tomorrow. The trade-off is fewer consumer goods now.",
              "es": "Más bienes de capital hoy → mayor capacidad productiva mañana. El costo es menos bienes de consumo ahora."
            }
          },
          {
            "id": "apm163",
            "topic": "growth",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "What is the difference between moving along the PPC and shifting the PPC?",
              "es": "¿Cuál es la diferencia entre moverse a lo largo de la CPP y desplazar la CPP?"
            },
            "c": {
              "en": [
                "Moving along changes the output mix; shifting changes total capacity",
                "Moving along means growth; shifting means recession",
                "Moving along requires trade; shifting requires investment",
                "There is no meaningful difference"
              ],
              "es": [
                "Moverse cambia la combinación de producción; desplazar cambia la capacidad total",
                "Moverse significa crecimiento; desplazar significa recesión",
                "Moverse requiere comercio; desplazar requiere inversión",
                "No hay diferencia significativa"
              ]
            },
            "a": 0,
            "why": {
              "en": "Along the curve = same capacity, different mix. Shift = the capacity itself has changed (more resources, better technology, etc.).",
              "es": "Sobre la curva = misma capacidad, diferente mezcla. Desplazar = la capacidad misma cambió (más recursos, mejor tecnología, etc.)."
            }
          },
          {
            "id": "apm164",
            "topic": "growth",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "A country invests heavily in education this decade. Explain how this affects the PPC over time.",
              "es": "Un país invierte mucho en educación esta década. Explica cómo esto afecta la CPP con el tiempo."
            },
            "keys": [
              "shift",
              "outward",
              "human capital",
              "productive",
              "productiv",
              "desplaz",
              "afuera",
              "capital humano"
            ],
            "ideaLabel": {
              "en": "how education shifts the PPC",
              "es": "cómo la educación desplaza la CPP"
            },
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "hcap",
                  "label": "education as human capital / better workers",
                  "any": [
                    "human capital",
                    "skilled workers",
                    "more productive workers",
                    "better trained",
                    "skilled labor",
                    "worker productivity",
                    "knowledge",
                    "skills",
                    "capital humano",
                    "trabajadores más productivos",
                    "mejor capacitados",
                    "productividad"
                  ]
                },
                {
                  "id": "shift",
                  "label": "the PPC shifting outward over time",
                  "any": [
                    "shift outward",
                    "shifts out",
                    "moves out",
                    "expands",
                    "grows",
                    "larger curve",
                    "more capacity",
                    "produce more of both",
                    "future growth",
                    "desplaza hacia afuera",
                    "se expande",
                    "crece"
                  ]
                }
              ],
              "onPass": "Right — education builds human capital, making workers more productive, which shifts the PPC outward over time."
            },
            "why": {
              "en": "Education builds human capital, making the labor force more productive and shifting the PPC outward.",
              "es": "La educación construye capital humano, haciendo la fuerza laboral más productiva y desplazando la CPP hacia afuera."
            }
          },
          {
            "id": "apm165",
            "topic": "growth",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A war destroys a large share of a country's factories. What happens to the PPC?",
              "es": "Una guerra destruye gran parte de las fábricas de un país. ¿Qué le pasa a la CPP?"
            },
            "c": {
              "en": [
                "It shifts inward — productive capacity has decreased",
                "It shifts outward — rebuilding creates jobs",
                "The economy moves inside the existing curve",
                "Nothing — the PPC only shifts outward"
              ],
              "es": [
                "Se desplaza hacia adentro — la capacidad productiva disminuyó",
                "Se desplaza hacia afuera — reconstruir crea empleos",
                "La economía se mueve dentro de la curva existente",
                "Nada — la CPP solo se desplaza hacia afuera"
              ]
            },
            "a": 0,
            "why": {
              "en": "Losing capital (factories) reduces what the economy can produce at maximum, shrinking the curve.",
              "es": "Perder capital (fábricas) reduce lo que la economía puede producir al máximo, encogiendo la curva."
            }
          },
          {
            "id": "apm166",
            "topic": "growth",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Two countries start with identical PPCs. Country X devotes 40% of output to capital goods; Country Y devotes 10%. After 20 years, which is likely true?",
              "es": "Dos países comienzan con CPP idénticas. X dedica 40% de producción a bienes de capital; Y dedica 10%. Después de 20 años, ¿qué es probablemente cierto?"
            },
            "c": {
              "en": [
                "Country X's PPC has shifted out farther than Y's",
                "Country Y's PPC has shifted out farther",
                "Both PPCs shifted equally",
                "Neither PPC shifted because output mix doesn't affect growth"
              ],
              "es": [
                "La CPP de X se desplazó más que la de Y",
                "La CPP de Y se desplazó más",
                "Ambas se desplazaron igual",
                "Ninguna se desplazó porque la mezcla de producción no afecta el crecimiento"
              ]
            },
            "a": 0,
            "why": {
              "en": "More capital investment today means more productive capacity tomorrow. X sacrificed more consumption now for faster future growth.",
              "es": "Más inversión en capital hoy significa más capacidad productiva mañana. X sacrificó más consumo ahora para crecer más rápido."
            }
          }
        ],
        "topics": [
          {
            "id": "costs",
            "en": "Scarcity & Opportunity Cost",
            "es": "Escasez y costo de oportunidad"
          },
          {
            "id": "ppc",
            "en": "The Production Possibilities Curve",
            "es": "La curva de posibilidades de producción"
          },
          {
            "id": "trade",
            "en": "Comparative Advantage & Trade",
            "es": "Ventaja comparativa y comercio"
          },
          {
            "id": "growth",
            "en": "Economic Growth",
            "es": "Crecimiento económico"
          }
        ]
      },
      {
        "id": "ap-m2",
        "title": {
          "en": "Macro Unit 2 · Indicators and the Business Cycle",
          "es": "Macro Unidad 2 · Indicadores y ciclo económico"
        },
        "brief": {
          "en": "GDP is the market value of final goods and services produced inside a country in a year: GDP = C + I + G + (X − M). Exclude intermediate goods, used goods, transfer payments, and purely financial transactions. Nominal GDP uses current prices while real GDP holds prices constant, so only real GDP tracks output. The unemployment rate is unemployed ÷ labor force × 100, and the labor force excludes anyone not actively seeking work. Unemployment comes in frictional, structural, and cyclical forms; the natural rate includes the first two. The CPI tracks a fixed basket, and inflation is the percentage change in that index.",
          "es": "El PIB es el valor de mercado de bienes y servicios finales producidos dentro de un país en un año: PIB = C + I + G + (X − M). Se excluyen bienes intermedios, bienes usados, transferencias y operaciones puramente financieras. El PIB nominal usa precios corrientes y el real mantiene precios constantes, por lo que solo el real mide producción. La tasa de desempleo es desempleados ÷ fuerza laboral × 100, y la fuerza laboral excluye a quien no busca trabajo activamente. El desempleo puede ser friccional, estructural o cíclico; la tasa natural incluye los dos primeros. El IPC sigue una canasta fija y la inflación es el cambio porcentual de ese índice."
        },
        "items": [
          {
            "id": "apm201",
            "topic": "gdp",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "GDP measures:",
              "es": "El PIB mide:"
            },
            "c": {
              "en": [
                "The market value of all final goods and services produced in a country in a year",
                "Total wealth held by citizens",
                "Government revenue from taxes",
                "All transactions including used goods"
              ],
              "es": [
                "El valor de mercado de todos los bienes y servicios finales producidos en un país en un año",
                "La riqueza total de los ciudadanos",
                "Los ingresos del gobierno por impuestos",
                "Todas las transacciones incluyendo bienes usados"
              ]
            },
            "a": 0,
            "why": {
              "en": "GDP counts only final goods and services produced within national borders in a given year — not used goods, intermediates, or wealth.",
              "es": "El PIB cuenta solo bienes y servicios finales producidos dentro de las fronteras nacionales en un año."
            }
          },
          {
            "id": "apm202",
            "topic": "gdp",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which transaction is counted in this year's GDP?",
              "es": "¿Cuál transacción se cuenta en el PIB de este año?"
            },
            "c": {
              "en": [
                "A restaurant meal served today",
                "A used car sold at a dealership",
                "A Social Security check",
                "Stock purchased on the NYSE"
              ],
              "es": [
                "Una comida servida hoy en un restaurante",
                "Un auto usado vendido",
                "Un cheque de Seguro Social",
                "Acciones compradas en la bolsa"
              ]
            },
            "a": 0,
            "why": {
              "en": "The meal is a final service produced this year. Used goods, transfer payments, and financial transactions are excluded.",
              "es": "La comida es un servicio final producido este año. Bienes usados, transferencias y transacciones financieras se excluyen."
            }
          },
          {
            "id": "apm203",
            "topic": "gdp",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every item EXCLUDED from GDP.",
              "es": "Selecciona cada elemento EXCLUIDO del PIB."
            },
            "c": {
              "en": [
                "A Social Security check to a retiree",
                "Steel sold to a car factory (intermediate good)",
                "A new home purchased by a family",
                "Illegal drug sales"
              ],
              "es": [
                "Un cheque de Seguro Social a un jubilado",
                "Acero vendido a una fábrica de autos (bien intermedio)",
                "Una casa nueva comprada por una familia",
                "Venta de drogas ilegales"
              ]
            },
            "a": [
              0,
              1,
              3
            ],
            "why": {
              "en": "Transfer payments, intermediate goods, and underground transactions are excluded. New homes count as investment (I).",
              "es": "Transferencias, bienes intermedios y transacciones clandestinas se excluyen. Casas nuevas cuentan como inversión (I)."
            }
          },
          {
            "id": "apm204",
            "topic": "gdp",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "C = 700, I = 200, G = 300, exports = 150, imports = 250. Compute GDP.",
              "es": "C = 700, I = 200, G = 300, exportaciones = 150, importaciones = 250. Calcula el PIB."
            },
            "a": 1100,
            "tol": 0,
            "why": {
              "en": "GDP = C + I + G + (X − M) = 700 + 200 + 300 + (150 − 250) = 1,100.",
              "es": "PIB = C + I + G + (X − M) = 700 + 200 + 300 + (150 − 250) = 1,100."
            }
          },
          {
            "id": "apm205",
            "topic": "gdp",
            "type": "numeric",
            "diff": 2,
            "variantOf": "apm204",
            "q": {
              "en": "C = 800, I = 150, G = 250, exports = 200, imports = 100. Compute GDP.",
              "es": "C = 800, I = 150, G = 250, exportaciones = 200, importaciones = 100. Calcula el PIB."
            },
            "a": 1300,
            "tol": 0,
            "why": {
              "en": "GDP = 800 + 150 + 250 + (200 − 100) = 1,300.",
              "es": "PIB = 800 + 150 + 250 + (200 − 100) = 1,300."
            }
          },
          {
            "id": "apm206",
            "topic": "gdp",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In the GDP equation C + I + G + (X − M), the 'I' stands for:",
              "es": "En la ecuación del PIB C + I + G + (X − M), la 'I' representa:"
            },
            "c": {
              "en": [
                "Gross private domestic investment (new capital, inventory changes, new housing)",
                "Individual income taxes",
                "Interest rates set by the Fed",
                "Imports of foreign goods"
              ],
              "es": [
                "Inversión privada interna bruta (capital nuevo, cambio en inventarios, vivienda nueva)",
                "Impuestos sobre la renta individual",
                "Tasas de interés del banco central",
                "Importaciones de bienes extranjeros"
              ]
            },
            "a": 0,
            "why": {
              "en": "Investment in GDP means business spending on new capital, changes in inventories, and new residential construction — not financial investment.",
              "es": "Inversión en el PIB significa gasto empresarial en capital nuevo, cambio en inventarios y construcción residencial nueva."
            }
          },
          {
            "id": "apm207",
            "topic": "gdp",
            "type": "short",
            "diff": 2,
            "q": {
              "en": "Why is real GDP a better measure of living standards than nominal GDP?",
              "es": "¿Por qué el PIB real mide mejor el nivel de vida que el PIB nominal?"
            },
            "keys": [
              "inflation",
              "price",
              "constant",
              "adjust",
              "inflaci",
              "precio",
              "constante",
              "ajust"
            ],
            "ideaLabel": {
              "en": "why real GDP is more accurate",
              "es": "por qué el PIB real es más preciso"
            },
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "adj",
                  "label": "adjusting for / removing the effect of price changes",
                  "any": [
                    "adjusts for inflation",
                    "removes inflation",
                    "strips out price changes",
                    "holds prices constant",
                    "constant prices",
                    "controls for price",
                    "accounts for inflation",
                    "factors out inflation",
                    "base year prices",
                    "deflated",
                    "ajusta por inflación",
                    "elimina inflación",
                    "precios constantes"
                  ]
                },
                {
                  "id": "output",
                  "label": "reflecting actual output or quantity produced",
                  "any": [
                    "actual output",
                    "real output",
                    "quantity produced",
                    "true production",
                    "actual production",
                    "how much is actually made",
                    "real changes in production",
                    "producción real",
                    "producción actual",
                    "cantidad producida"
                  ]
                }
              ],
              "onPass": "Right — real GDP strips out inflation so changes reflect actual output, not just higher prices."
            },
            "why": {
              "en": "Real GDP holds prices constant, so changes reflect actual output rather than inflation.",
              "es": "El PIB real mantiene precios constantes, así que los cambios reflejan producción y no inflación."
            }
          },
          {
            "id": "apm220",
            "topic": "unemp",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "The labor force is 200 million and 12 million are unemployed. Give the unemployment rate as a percent.",
              "es": "La fuerza laboral es 200 millones y 12 millones están desempleados. Da la tasa de desempleo como porcentaje."
            },
            "a": 6,
            "tol": 0.1,
            "why": {
              "en": "12 ÷ 200 = 0.06 = 6%.",
              "es": "12 ÷ 200 = 0.06 = 6%."
            }
          },
          {
            "id": "apm221",
            "topic": "unemp",
            "type": "numeric",
            "diff": 2,
            "variantOf": "apm220",
            "q": {
              "en": "Labor force = 160 million, unemployed = 8 million. What is the unemployment rate?",
              "es": "Fuerza laboral = 160 millones, desempleados = 8 millones. ¿Cuál es la tasa de desempleo?"
            },
            "a": 5,
            "tol": 0.1,
            "why": {
              "en": "8 ÷ 160 = 0.05 = 5%.",
              "es": "8 ÷ 160 = 0.05 = 5%."
            }
          },
          {
            "id": "apm222",
            "topic": "unemp",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A discouraged worker stops looking for a job. The measured unemployment rate:",
              "es": "Un trabajador desalentado deja de buscar empleo. La tasa de desempleo medida:"
            },
            "c": {
              "en": [
                "Falls, because the person leaves the labor force",
                "Rises, because another person is jobless",
                "Stays the same",
                "Falls, because the economy improved"
              ],
              "es": [
                "Baja, porque la persona sale de la fuerza laboral",
                "Sube, porque hay otro desempleado",
                "Se mantiene igual",
                "Baja, porque la economía mejoró"
              ]
            },
            "a": 0,
            "why": {
              "en": "The unemployment rate counts only people actively looking. Leaving the search removes you from both the numerator and the denominator.",
              "es": "La tasa cuenta solo a quienes buscan activamente. Dejar de buscar te quita del numerador y del denominador."
            }
          },
          {
            "id": "apm223",
            "topic": "unemp",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A factory worker is laid off because robots now do her job. This is:",
              "es": "Una trabajadora de fábrica es despedida porque robots hacen su trabajo. Esto es:"
            },
            "c": {
              "en": [
                "Structural unemployment",
                "Cyclical unemployment",
                "Frictional unemployment",
                "Seasonal unemployment"
              ],
              "es": [
                "Desempleo estructural",
                "Desempleo cíclico",
                "Desempleo friccional",
                "Desempleo estacional"
              ]
            },
            "a": 0,
            "why": {
              "en": "Structural unemployment results from changes in the economy — technology, trade, or declining industries — that make certain skills obsolete.",
              "es": "El desempleo estructural resulta de cambios económicos — tecnología, comercio o industrias en declive — que vuelven obsoletas ciertas habilidades."
            }
          },
          {
            "id": "apm224",
            "topic": "unemp",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "A recent college graduate searching for her first job is experiencing:",
              "es": "Una recién graduada buscando su primer empleo experimenta:"
            },
            "c": {
              "en": [
                "Frictional unemployment",
                "Structural unemployment",
                "Cyclical unemployment",
                "She is not counted as unemployed"
              ],
              "es": [
                "Desempleo friccional",
                "Desempleo estructural",
                "Desempleo cíclico",
                "No se cuenta como desempleada"
              ]
            },
            "a": 0,
            "why": {
              "en": "Frictional unemployment is the normal time between jobs or while entering the workforce — it exists even in a healthy economy.",
              "es": "El desempleo friccional es el tiempo normal entre empleos o al entrar al mercado laboral — existe incluso en una economía sana."
            }
          },
          {
            "id": "apm225",
            "topic": "unemp",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "At full employment, which types of unemployment still exist?",
              "es": "Con pleno empleo, ¿qué tipos de desempleo siguen existiendo?"
            },
            "c": {
              "en": [
                "Frictional and structural",
                "Only cyclical",
                "All three types disappear",
                "Only frictional"
              ],
              "es": [
                "Friccional y estructural",
                "Solo cíclico",
                "Los tres tipos desaparecen",
                "Solo friccional"
              ]
            },
            "a": 0,
            "why": {
              "en": "Full employment means zero cyclical unemployment, but frictional (job transitions) and structural (skills mismatch) are always present. The natural rate of unemployment includes both.",
              "es": "Pleno empleo significa cero desempleo cíclico, pero el friccional y estructural siempre existen. La tasa natural incluye ambos."
            }
          },
          {
            "id": "apm226",
            "topic": "unemp",
            "type": "short",
            "diff": 2,
            "q": {
              "en": "Explain the difference between frictional and structural unemployment. Give an example of each.",
              "es": "Explica la diferencia entre desempleo friccional y estructural. Da un ejemplo de cada uno."
            },
            "keys": [
              "between jobs",
              "searching",
              "skills",
              "mismatch",
              "technology",
              "entre empleos",
              "habilidades"
            ],
            "ideaLabel": {
              "en": "the distinction and examples",
              "es": "la distinción y ejemplos"
            },
            "spec": {
              "minWords": 5,
              "ideas": [
                {
                  "id": "frict",
                  "label": "frictional = normal job search / transition time",
                  "any": [
                    "between jobs",
                    "searching",
                    "looking",
                    "transitioning",
                    "new job",
                    "first job",
                    "just graduated",
                    "time to find",
                    "moving between",
                    "entre empleos",
                    "buscando",
                    "transición"
                  ]
                },
                {
                  "id": "struct",
                  "label": "structural = skills mismatch or industry change",
                  "any": [
                    "skills mismatch",
                    "obsolete skills",
                    "technology replaced",
                    "industry declined",
                    "automation",
                    "no longer needed",
                    "wrong skills",
                    "retrain",
                    "robots",
                    "habilidades obsoletas",
                    "tecnología reemplazó",
                    "automatización"
                  ]
                }
              ],
              "onPass": "Good — frictional is the normal search between jobs; structural is when the economy changes and your skills no longer fit."
            },
            "why": {
              "en": "Frictional: normal time between jobs. Structural: skills no longer match what the economy needs (e.g. automation).",
              "es": "Friccional: tiempo normal entre empleos. Estructural: las habilidades ya no coinciden con lo que la economía necesita."
            }
          },
          {
            "id": "apm240",
            "topic": "prices",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Nominal GDP rose 5% while the price level rose 5%. Real GDP:",
              "es": "El PIB nominal subió 5% mientras el nivel de precios subió 5%. El PIB real:"
            },
            "c": {
              "en": [
                "Stayed approximately the same",
                "Rose 5%",
                "Rose 10%",
                "Fell 5%"
              ],
              "es": [
                "Se mantuvo aproximadamente igual",
                "Subió 5%",
                "Subió 10%",
                "Bajó 5%"
              ]
            },
            "a": 0,
            "why": {
              "en": "All of the nominal increase came from higher prices, not more output. Real GDP ≈ nominal GDP − inflation.",
              "es": "Todo el aumento nominal vino de precios más altos, no de más producción."
            }
          },
          {
            "id": "apm241",
            "topic": "prices",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "The CPI moved from 120 to 129.6. Give the inflation rate as a percent.",
              "es": "El IPC pasó de 120 a 129.6. Da la tasa de inflación como porcentaje."
            },
            "a": 8,
            "tol": 0.1,
            "why": {
              "en": "(129.6 − 120) / 120 × 100 = 8%.",
              "es": "(129.6 − 120) / 120 × 100 = 8%."
            }
          },
          {
            "id": "apm242",
            "topic": "prices",
            "type": "numeric",
            "diff": 2,
            "variantOf": "apm241",
            "q": {
              "en": "The CPI moved from 150 to 157.5. Give the inflation rate as a percent.",
              "es": "El IPC pasó de 150 a 157.5. Da la tasa de inflación como porcentaje."
            },
            "a": 5,
            "tol": 0.1,
            "why": {
              "en": "(157.5 − 150) / 150 × 100 = 5%.",
              "es": "(157.5 − 150) / 150 × 100 = 5%."
            }
          },
          {
            "id": "apm243",
            "topic": "prices",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Who is most likely hurt by unexpected inflation?",
              "es": "¿Quién es más probablemente perjudicado por inflación inesperada?"
            },
            "c": {
              "en": [
                "A retiree on a fixed pension",
                "A borrower with a fixed-rate mortgage",
                "The federal government (a large debtor)",
                "A worker whose wages rise with inflation"
              ],
              "es": [
                "Un jubilado con pensión fija",
                "Un deudor con hipoteca a tasa fija",
                "El gobierno federal (un gran deudor)",
                "Un trabajador cuyos salarios suben con inflación"
              ]
            },
            "a": 0,
            "why": {
              "en": "Fixed incomes lose purchasing power when prices rise unexpectedly. Borrowers benefit because they repay with cheaper dollars.",
              "es": "Los ingresos fijos pierden poder adquisitivo cuando los precios suben inesperadamente. Los deudores se benefician."
            }
          },
          {
            "id": "apm244",
            "topic": "prices",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "The nominal interest rate is 7% and inflation is 3%. What is the real interest rate?",
              "es": "La tasa de interés nominal es 7% y la inflación es 3%. ¿Cuál es la tasa de interés real?"
            },
            "a": 4,
            "tol": 0.1,
            "why": {
              "en": "Real rate ≈ nominal rate − inflation = 7% − 3% = 4%.",
              "es": "Tasa real ≈ nominal − inflación = 7% − 3% = 4%."
            }
          },
          {
            "id": "apm245",
            "topic": "prices",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The GDP deflator differs from the CPI because the GDP deflator:",
              "es": "El deflactor del PIB difiere del IPC porque el deflactor:"
            },
            "c": {
              "en": [
                "Covers all goods produced domestically, not just a fixed consumer basket",
                "Only measures food and energy prices",
                "Is always higher than the CPI",
                "Ignores imports entirely"
              ],
              "es": [
                "Cubre todos los bienes producidos domésticamente, no solo una canasta fija del consumidor",
                "Solo mide precios de alimentos y energía",
                "Siempre es mayor que el IPC",
                "Ignora las importaciones por completo"
              ]
            },
            "a": 0,
            "why": {
              "en": "The CPI tracks a fixed basket of consumer goods; the GDP deflator covers everything in GDP and the basket adjusts as output changes.",
              "es": "El IPC sigue una canasta fija de bienes del consumidor; el deflactor cubre todo el PIB y la canasta se ajusta."
            }
          },
          {
            "id": "apm260",
            "topic": "cycle",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The four phases of the business cycle, in order, are:",
              "es": "Las cuatro fases del ciclo económico, en orden, son:"
            },
            "c": {
              "en": [
                "Expansion, peak, contraction (recession), trough",
                "Trough, contraction, expansion, peak",
                "Peak, expansion, trough, contraction",
                "Recession, depression, recovery, boom"
              ],
              "es": [
                "Expansión, auge, contracción (recesión), valle",
                "Valle, contracción, expansión, auge",
                "Auge, expansión, valle, contracción",
                "Recesión, depresión, recuperación, auge"
              ]
            },
            "a": 0,
            "why": {
              "en": "The cycle goes expansion → peak → contraction → trough, then repeats.",
              "es": "El ciclo va expansión → auge → contracción → valle, y se repite."
            }
          },
          {
            "id": "apm261",
            "topic": "cycle",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A recession is technically defined as:",
              "es": "Una recesión se define técnicamente como:"
            },
            "c": {
              "en": [
                "A significant decline in economic activity lasting more than a few months",
                "Two consecutive quarters of negative GDP growth",
                "Unemployment above 10%",
                "A stock market crash"
              ],
              "es": [
                "Una caída significativa de la actividad económica durante más de unos meses",
                "Dos trimestres consecutivos de PIB negativo",
                "Desempleo arriba del 10%",
                "Una caída del mercado de valores"
              ]
            },
            "a": 0,
            "why": {
              "en": "The NBER defines recessions by a broad decline in activity across the economy. The 'two quarters' rule is a common shorthand but not the official definition.",
              "es": "El NBER define recesiones como una caída amplia de actividad en toda la economía. La regla de 'dos trimestres' es solo un atajo común."
            }
          },
          {
            "id": "apm262",
            "topic": "cycle",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "During a recession, which of these typically RISES?",
              "es": "Durante una recesión, ¿cuál de estos típicamente SUBE?"
            },
            "c": {
              "en": [
                "Cyclical unemployment",
                "Real GDP",
                "Business investment",
                "Consumer confidence"
              ],
              "es": [
                "Desempleo cíclico",
                "PIB real",
                "Inversión empresarial",
                "Confianza del consumidor"
              ]
            },
            "a": 0,
            "why": {
              "en": "Recessions reduce output and spending, so firms lay off workers → cyclical unemployment rises.",
              "es": "Las recesiones reducen producción y gasto, así que las empresas despiden trabajadores → sube el desempleo cíclico."
            }
          },
          {
            "id": "apm263",
            "topic": "cycle",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A leading economic indicator is one that:",
              "es": "Un indicador económico adelantado es uno que:"
            },
            "c": {
              "en": [
                "Changes direction before the overall economy does",
                "Moves at the same time as GDP",
                "Changes only after GDP has already turned",
                "Is set by the Federal Reserve"
              ],
              "es": [
                "Cambia de dirección antes que la economía general",
                "Se mueve al mismo tiempo que el PIB",
                "Cambia solo después de que el PIB ya cambió",
                "Es establecido por la Reserva Federal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Leading indicators (stock prices, building permits, new orders) signal where the economy is headed before GDP data confirms it.",
              "es": "Los indicadores adelantados (precios de acciones, permisos de construcción, nuevos pedidos) señalan hacia dónde va la economía antes de que el PIB lo confirme."
            }
          }
        ],
        "topics": [
          {
            "id": "gdp",
            "en": "GDP and Its Components",
            "es": "PIB y sus componentes"
          },
          {
            "id": "unemp",
            "en": "Unemployment",
            "es": "Desempleo"
          },
          {
            "id": "prices",
            "en": "Price Indices and Inflation",
            "es": "Índices de precios e inflación"
          },
          {
            "id": "cycle",
            "en": "The Business Cycle",
            "es": "El ciclo económico"
          }
        ]
      },
      {
        "id": "ap-m3",
        "title": {
          "en": "Macro Unit 3 · AD, AS, and Fiscal Policy",
          "es": "Macro Unidad 3 · DA, OA y política fiscal"
        },
        "brief": {
          "en": "Aggregate demand slopes down and shifts with consumption, investment, government spending, or net exports. Short-run aggregate supply shifts with input prices, productivity, and expectations; long-run aggregate supply sits at full-employment output. A recessionary gap means equilibrium output is below full employment, and an inflationary gap means it is above. Expansionary fiscal policy raises spending or cuts taxes; contractionary policy does the reverse. The spending multiplier is 1 ÷ (1 − MPC), and the tax multiplier is smaller because part of a tax cut is saved.",
          "es": "La demanda agregada tiene pendiente negativa y se desplaza con el consumo, la inversión, el gasto público o las exportaciones netas. La oferta agregada de corto plazo se desplaza con los precios de insumos, la productividad y las expectativas; la de largo plazo está en el producto de pleno empleo. Una brecha recesiva significa que el producto de equilibrio está por debajo del pleno empleo, y una brecha inflacionaria, por encima. La política fiscal expansiva aumenta el gasto o baja impuestos; la contractiva hace lo contrario. El multiplicador del gasto es 1 ÷ (1 − PMC), y el de impuestos es menor porque parte del recorte se ahorra."
        },
        "items": [
          {
            "id": "apm301",
            "topic": "ad",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which change shifts aggregate demand to the right?",
              "es": "¿Qué cambio desplaza la demanda agregada a la derecha?"
            },
            "c": {
              "en": [
                "An increase in consumer confidence and spending",
                "A rise in input costs for firms",
                "A decrease in the money supply",
                "A drop in labor-force participation"
              ],
              "es": [
                "Un aumento en la confianza y gasto del consumidor",
                "Un alza en costos de insumos",
                "Una disminución de la oferta monetaria",
                "Una caída en participación laboral"
              ]
            },
            "a": 0,
            "why": {
              "en": "More spending by consumers, businesses, government, or foreign buyers shifts AD right. Input costs affect AS, not AD.",
              "es": "Más gasto de consumidores, empresas, gobierno o compradores extranjeros desplaza la DA a la derecha."
            }
          },
          {
            "id": "apm302",
            "topic": "ad",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every component of aggregate demand.",
              "es": "Selecciona cada componente de la demanda agregada."
            },
            "c": {
              "en": [
                "Consumer spending (C)",
                "Gross investment (I)",
                "Government spending (G)",
                "Net exports (X − M)",
                "Tax revenue"
              ],
              "es": [
                "Gasto del consumidor (C)",
                "Inversión bruta (I)",
                "Gasto del gobierno (G)",
                "Exportaciones netas (X − M)",
                "Recaudación fiscal"
              ]
            },
            "a": [
              0,
              1,
              2,
              3
            ],
            "why": {
              "en": "AD = C + I + G + (X − M). Tax revenue is how the government funds G, but taxes themselves are not a component of AD.",
              "es": "DA = C + I + G + (X − M). La recaudación fiscal financia G, pero los impuestos no son un componente de la DA."
            }
          },
          {
            "id": "apm303",
            "topic": "ad",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The aggregate demand curve slopes downward because:",
              "es": "La curva de demanda agregada tiene pendiente negativa porque:"
            },
            "c": {
              "en": [
                "The wealth effect, interest-rate effect, and exchange-rate effect all reduce spending at higher price levels",
                "Firms produce less when prices rise",
                "Consumers always buy less of everything when prices rise",
                "The government cuts spending when inflation rises"
              ],
              "es": [
                "El efecto riqueza, efecto tasa de interés y efecto tipo de cambio reducen el gasto a niveles de precios más altos",
                "Las empresas producen menos cuando suben los precios",
                "Los consumidores siempre compran menos de todo",
                "El gobierno reduce el gasto cuando sube la inflación"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher price levels reduce real wealth, raise interest rates, and make exports more expensive — all three reduce the quantity of real GDP demanded.",
              "es": "Precios más altos reducen la riqueza real, suben las tasas de interés y encarecen las exportaciones."
            }
          },
          {
            "id": "apm310",
            "topic": "as",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A sharp rise in oil prices most directly causes:",
              "es": "Un alza repentina en los precios del petróleo causa más directamente:"
            },
            "c": {
              "en": [
                "A leftward shift of short-run aggregate supply (stagflation)",
                "A rightward shift of aggregate demand",
                "A rightward shift of long-run aggregate supply",
                "A movement along the AD curve"
              ],
              "es": [
                "Un desplazamiento a la izquierda de la oferta agregada de corto plazo (estanflación)",
                "Un desplazamiento a la derecha de la DA",
                "Un desplazamiento a la derecha de la OALP",
                "Un movimiento a lo largo de la curva de DA"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher input costs shift SRAS left, raising prices while reducing output — stagflation.",
              "es": "Costos de insumos más altos desplazan la OACP a la izquierda, subiendo precios y reduciendo producción."
            }
          },
          {
            "id": "apm311",
            "topic": "as",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The long-run aggregate supply (LRAS) curve is vertical because:",
              "es": "La curva de oferta agregada de largo plazo (OALP) es vertical porque:"
            },
            "c": {
              "en": [
                "In the long run, output depends on resources and technology, not the price level",
                "Prices cannot change in the long run",
                "The Fed always stabilizes prices",
                "Wages never adjust"
              ],
              "es": [
                "A largo plazo, la producción depende de recursos y tecnología, no del nivel de precios",
                "Los precios no pueden cambiar a largo plazo",
                "El banco central siempre estabiliza los precios",
                "Los salarios nunca se ajustan"
              ]
            },
            "a": 0,
            "why": {
              "en": "At full employment, all resources are in use. The price level can change but output stays at potential GDP.",
              "es": "Con pleno empleo, todos los recursos se usan. El nivel de precios puede cambiar pero la producción queda en el PIB potencial."
            }
          },
          {
            "id": "apm312",
            "topic": "as",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "In the long run, an increase in aggregate demand starting from full employment leads to:",
              "es": "A largo plazo, un aumento de la demanda agregada desde pleno empleo lleva a:"
            },
            "c": {
              "en": [
                "A higher price level but the same level of real output",
                "A permanent increase in real GDP",
                "Lower prices and higher output",
                "No change in either prices or output"
              ],
              "es": [
                "Un nivel de precios más alto pero la misma producción real",
                "Un aumento permanente del PIB real",
                "Precios más bajos y mayor producción",
                "Ningún cambio en precios ni producción"
              ]
            },
            "a": 0,
            "why": {
              "en": "Starting at full employment, more AD just bids up prices. Eventually wages catch up and SRAS shifts left, returning output to potential.",
              "es": "Partiendo de pleno empleo, más DA solo sube precios. Eventualmente los salarios se ajustan y la producción vuelve al potencial."
            }
          },
          {
            "id": "apm313",
            "topic": "as",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An economy is producing below full employment. This is called a:",
              "es": "Una economía produce por debajo del pleno empleo. Esto se llama:"
            },
            "c": {
              "en": [
                "Recessionary gap",
                "Inflationary gap",
                "Stagflation",
                "Budget deficit"
              ],
              "es": [
                "Brecha recesiva",
                "Brecha inflacionaria",
                "Estanflación",
                "Déficit presupuestario"
              ]
            },
            "a": 0,
            "why": {
              "en": "A recessionary gap exists when real GDP is below potential — there's slack in the economy.",
              "es": "Una brecha recesiva existe cuando el PIB real está por debajo del potencial — hay capacidad ociosa."
            }
          },
          {
            "id": "apm320",
            "topic": "mult",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "The marginal propensity to consume is 0.8. What is the spending multiplier?",
              "es": "La propensión marginal a consumir es 0.8. ¿Cuál es el multiplicador del gasto?"
            },
            "a": 5,
            "tol": 0.1,
            "why": {
              "en": "Spending multiplier = 1 / (1 − MPC) = 1 / 0.2 = 5.",
              "es": "Multiplicador = 1 / (1 − PMC) = 1 / 0.2 = 5."
            }
          },
          {
            "id": "apm321",
            "topic": "mult",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "With an MPC of 0.75, how much total change in real GDP results from a $100 billion increase in government spending?",
              "es": "Con una PMC de 0.75, ¿cuánto cambia el PIB real total por un aumento de $100 mil millones en gasto del gobierno?"
            },
            "a": 400,
            "tol": 5,
            "why": {
              "en": "Multiplier = 1/(1−0.75) = 4. ΔGDP = 4 × $100B = $400 billion.",
              "es": "Multiplicador = 1/(1−0.75) = 4. ΔPIB = 4 × $100 mil millones = $400 mil millones."
            }
          },
          {
            "id": "apm322",
            "topic": "mult",
            "type": "numeric",
            "diff": 3,
            "variantOf": "apm321",
            "q": {
              "en": "With an MPC of 0.8, how much total GDP change results from a $50 billion increase in government spending?",
              "es": "Con una PMC de 0.8, ¿cuánto cambia el PIB total por un aumento de $50 mil millones en gasto gubernamental?"
            },
            "a": 250,
            "tol": 5,
            "why": {
              "en": "Multiplier = 1/(1−0.8) = 5. ΔGDP = 5 × $50B = $250 billion.",
              "es": "Multiplicador = 1/(1−0.8) = 5. ΔPIB = 5 × $50 = $250 mil millones."
            }
          },
          {
            "id": "apm323",
            "topic": "mult",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain why the tax multiplier is smaller than the spending multiplier.",
              "es": "Explica por qué el multiplicador de impuestos es menor que el del gasto."
            },
            "keys": [
              "save",
              "MPC",
              "leak",
              "not all",
              "consume",
              "first round",
              "ahorr",
              "consum",
              "primera ronda"
            ],
            "ideaLabel": {
              "en": "why the tax multiplier is weaker",
              "es": "por qué el multiplicador de impuestos es menor"
            },
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "leak",
                  "label": "part of a tax cut is saved, not spent",
                  "any": [
                    "saved",
                    "not all spent",
                    "some is saved",
                    "leak",
                    "saving",
                    "MPS",
                    "marginal propensity to save",
                    "don't spend it all",
                    "only spend part",
                    "fraction is saved",
                    "ahorra",
                    "no todo se gasta",
                    "parte se ahorra"
                  ]
                },
                {
                  "id": "direct",
                  "label": "government spending enters GDP directly while taxes work indirectly",
                  "any": [
                    "directly",
                    "enters GDP",
                    "first round",
                    "full amount",
                    "dollar for dollar",
                    "immediate",
                    "indirect",
                    "through consumption",
                    "must be spent first",
                    "directo",
                    "entra al PIB",
                    "primera ronda",
                    "dólar por dólar"
                  ]
                }
              ],
              "reject": [
                {
                  "any": [
                    "tax multiplier is bigger",
                    "taxes have a larger effect"
                  ],
                  "why": "It's the opposite — the spending multiplier is bigger because every dollar of G enters GDP immediately."
                }
              ],
              "onPass": "Right — a tax cut has to pass through consumers first, and they save part of it, so the first-round kick is smaller than direct spending."
            },
            "why": {
              "en": "A $1 tax cut becomes only MPC × $1 in spending (the rest is saved), while $1 of G enters GDP directly.",
              "es": "Una reducción de $1 en impuestos se convierte en solo PMC × $1 de gasto (el resto se ahorra), mientras $1 de G entra directo al PIB."
            }
          },
          {
            "id": "apm330",
            "topic": "fiscal",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Appropriate fiscal policy for a recessionary gap is to:",
              "es": "La política fiscal apropiada para una brecha recesiva es:"
            },
            "c": {
              "en": [
                "Increase government spending or cut taxes",
                "Raise taxes and cut spending",
                "Increase the money supply",
                "Raise the reserve requirement"
              ],
              "es": [
                "Aumentar el gasto del gobierno o reducir impuestos",
                "Subir impuestos y reducir gasto",
                "Aumentar la oferta monetaria",
                "Subir el requisito de reserva"
              ]
            },
            "a": 0,
            "why": {
              "en": "Expansionary fiscal policy (more G or lower T) shifts AD right to close a recessionary gap. Monetary tools are the Fed's domain.",
              "es": "La política fiscal expansiva (más G o menos T) desplaza la DA a la derecha para cerrar una brecha recesiva."
            }
          },
          {
            "id": "apm331",
            "topic": "fiscal",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is an automatic stabilizer?",
              "es": "¿Cuál es un estabilizador automático?"
            },
            "c": {
              "en": [
                "Unemployment insurance payments that rise during recessions",
                "A new highway construction bill passed by Congress",
                "The Fed lowering interest rates",
                "A presidential tax reform proposal"
              ],
              "es": [
                "Pagos de seguro de desempleo que suben durante recesiones",
                "Un proyecto de construcción de carreteras aprobado por el Congreso",
                "El banco central bajando tasas de interés",
                "Una propuesta presidencial de reforma fiscal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Automatic stabilizers kick in without new legislation — progressive taxes and transfer payments that adjust with the business cycle.",
              "es": "Los estabilizadores automáticos actúan sin nueva legislación — impuestos progresivos y transferencias que se ajustan con el ciclo."
            }
          },
          {
            "id": "apm332",
            "topic": "fiscal",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Crowding out occurs when:",
              "es": "El efecto desplazamiento (crowding out) ocurre cuando:"
            },
            "c": {
              "en": [
                "Government borrowing raises interest rates, reducing private investment",
                "The Fed prints too much money",
                "Imports exceed exports",
                "Consumers save too much of their income"
              ],
              "es": [
                "El endeudamiento del gobierno sube las tasas de interés, reduciendo la inversión privada",
                "El banco central imprime demasiado dinero",
                "Las importaciones superan las exportaciones",
                "Los consumidores ahorran demasiado"
              ]
            },
            "a": 0,
            "why": {
              "en": "When the government borrows heavily, it competes with private borrowers for funds, pushing interest rates up and crowding out private investment.",
              "es": "Cuando el gobierno se endeuda mucho, compite con el sector privado por fondos, subiendo tasas y desplazando la inversión privada."
            }
          },
          {
            "id": "apm333",
            "topic": "fiscal",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A major criticism of discretionary fiscal policy is that:",
              "es": "Una crítica importante a la política fiscal discrecional es que:"
            },
            "c": {
              "en": [
                "Long implementation lags mean the policy may arrive after conditions have changed",
                "It is too easy to implement",
                "It never affects aggregate demand",
                "Congress does not have the authority to change taxes"
              ],
              "es": [
                "Los largos rezagos de implementación significan que la política puede llegar tarde",
                "Es demasiado fácil de implementar",
                "Nunca afecta la demanda agregada",
                "El Congreso no tiene autoridad para cambiar impuestos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Recognition, decision, and implementation lags can make fiscal policy pro-cyclical — stimulating the economy after the recession is already over.",
              "es": "Los rezagos de reconocimiento, decisión e implementación pueden hacer la política fiscal procíclica."
            }
          },
          {
            "id": "apm304",
            "topic": "ad",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A decrease in the value of the dollar makes U.S. exports:",
              "es": "Una disminución del valor del dólar hace que las exportaciones de EE.UU.:"
            },
            "c": {
              "en": [
                "Cheaper for foreign buyers, shifting AD right",
                "More expensive for foreign buyers",
                "Have no effect on AD",
                "Shift SRAS left"
              ],
              "es": [
                "Más baratas para compradores extranjeros, desplazando la DA a la derecha",
                "Más caras",
                "Sin efecto en la DA",
                "Desplazan la OACP a la izquierda"
              ]
            },
            "a": 0,
            "why": {
              "en": "A weaker dollar means foreign currencies buy more U.S. goods → exports rise → net exports rise → AD shifts right.",
              "es": "Un dólar más débil significa que las monedas extranjeras compran más bienes de EE.UU. → suben exportaciones → DA a la derecha."
            }
          },
          {
            "id": "apm305",
            "topic": "ad",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which would shift aggregate demand to the LEFT?",
              "es": "¿Cuál desplazaría la demanda agregada a la IZQUIERDA?"
            },
            "c": {
              "en": [
                "A major increase in personal income taxes",
                "A decrease in interest rates",
                "A rise in consumer confidence",
                "An increase in government spending"
              ],
              "es": [
                "Un gran aumento en impuestos sobre la renta personal",
                "Una baja en tasas de interés",
                "Un aumento en confianza del consumidor",
                "Un aumento en gasto del gobierno"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher taxes reduce disposable income → less consumer spending → AD shifts left.",
              "es": "Impuestos más altos reducen el ingreso disponible → menos gasto del consumidor → DA a la izquierda."
            }
          },
          {
            "id": "apm314",
            "topic": "as",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which would shift short-run aggregate supply to the RIGHT?",
              "es": "¿Cuál desplazaría la oferta agregada de corto plazo a la DERECHA?"
            },
            "c": {
              "en": [
                "A decrease in the price of energy",
                "An increase in wages",
                "New government regulations raising compliance costs",
                "Higher tariffs on imported raw materials"
              ],
              "es": [
                "Una disminución en el precio de la energía",
                "Un aumento de salarios",
                "Nuevas regulaciones que elevan costos",
                "Aranceles más altos sobre materias primas importadas"
              ]
            },
            "a": 0,
            "why": {
              "en": "Lower input costs make production cheaper → firms supply more at every price level → SRAS shifts right.",
              "es": "Costos de insumos más bajos abaratan la producción → las empresas ofrecen más a cada nivel de precios → OACP a la derecha."
            }
          },
          {
            "id": "apm315",
            "topic": "as",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain what stagflation is and what causes it.",
              "es": "Explica qué es la estanflación y qué la causa."
            },
            "keys": [
              "stagnation",
              "inflation",
              "supply shock",
              "input costs",
              "SRAS left",
              "estancamiento",
              "inflación",
              "shock de oferta"
            ],
            "ideaLabel": {
              "en": "stagflation definition and cause",
              "es": "definición y causa de estanflación"
            },
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "both",
                  "label": "rising prices AND falling output happening together",
                  "any": [
                    "rising prices and falling output",
                    "inflation and recession",
                    "inflation and stagnation",
                    "prices up output down",
                    "higher prices lower GDP",
                    "both inflation and unemployment rise",
                    "inflación y recesión",
                    "precios suben producción baja"
                  ]
                },
                {
                  "id": "cause",
                  "label": "caused by a negative supply shock / SRAS shifting left",
                  "any": [
                    "supply shock",
                    "SRAS shifts left",
                    "aggregate supply decrease",
                    "input costs rise",
                    "oil shock",
                    "cost push",
                    "higher production costs",
                    "shock de oferta",
                    "OACP a la izquierda",
                    "costos de producción"
                  ]
                }
              ],
              "onPass": "Right — stagflation is simultaneous inflation and recession, caused by a supply shock that shifts SRAS left."
            },
            "why": {
              "en": "Stagflation = stagnation + inflation. A negative supply shock (e.g. oil price spike) shifts SRAS left → higher prices + lower output.",
              "es": "Estanflación = estancamiento + inflación. Un shock negativo de oferta desplaza la OACP a la izquierda → precios más altos + menor producción."
            }
          },
          {
            "id": "apm324",
            "topic": "mult",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "If the MPC is 0.8, what is the tax multiplier? (Give the absolute value.)",
              "es": "Si la PMC es 0.8, ¿cuál es el multiplicador de impuestos? (Da el valor absoluto.)"
            },
            "a": 4,
            "tol": 0.1,
            "why": {
              "en": "Tax multiplier = −MPC / (1 − MPC) = −0.8/0.2 = −4. Absolute value = 4.",
              "es": "Multiplicador de impuestos = −PMC / (1 − PMC) = −0.8/0.2 = −4. Valor absoluto = 4."
            }
          },
          {
            "id": "apm325",
            "topic": "mult",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The balanced-budget multiplier says that equal increases in government spending and taxes will:",
              "es": "El multiplicador del presupuesto equilibrado dice que aumentos iguales en gasto e impuestos:"
            },
            "c": {
              "en": [
                "Increase GDP by exactly the amount of the spending increase",
                "Have no effect on GDP",
                "Decrease GDP",
                "Double the effect of the spending alone"
              ],
              "es": [
                "Aumentarán el PIB exactamente por el monto del aumento del gasto",
                "No tendrán efecto en el PIB",
                "Disminuirán el PIB",
                "Duplicarán el efecto del gasto solo"
              ]
            },
            "a": 0,
            "why": {
              "en": "The spending multiplier is larger than the tax multiplier, so the net effect equals 1 × the change. Balanced-budget multiplier = 1.",
              "es": "El multiplicador del gasto es mayor que el de impuestos, así que el efecto neto es 1 × el cambio."
            }
          },
          {
            "id": "apm334",
            "topic": "fiscal",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "During an inflationary gap, appropriate fiscal policy is to:",
              "es": "Durante una brecha inflacionaria, la política fiscal apropiada es:"
            },
            "c": {
              "en": [
                "Decrease government spending or raise taxes",
                "Increase government spending",
                "Lower interest rates",
                "Print more money"
              ],
              "es": [
                "Disminuir gasto del gobierno o subir impuestos",
                "Aumentar el gasto del gobierno",
                "Bajar tasas de interés",
                "Imprimir más dinero"
              ]
            },
            "a": 0,
            "why": {
              "en": "Contractionary fiscal policy (less G or higher T) shifts AD left to close an inflationary gap.",
              "es": "La política fiscal contractiva (menos G o más T) desplaza la DA a la izquierda para cerrar una brecha inflacionaria."
            }
          },
          {
            "id": "apm335",
            "topic": "fiscal",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Supply-side fiscal policy focuses on:",
              "es": "La política fiscal del lado de la oferta se enfoca en:"
            },
            "c": {
              "en": [
                "Tax cuts and deregulation to increase productive capacity (shift LRAS right)",
                "Increasing government spending to boost AD",
                "Raising taxes to reduce the deficit",
                "Controlling the money supply"
              ],
              "es": [
                "Recortes de impuestos y desregulación para aumentar la capacidad productiva (desplazar OALP a la derecha)",
                "Aumentar gasto del gobierno para impulsar la DA",
                "Subir impuestos para reducir el déficit",
                "Controlar la oferta monetaria"
              ]
            },
            "a": 0,
            "why": {
              "en": "Supply-siders argue that lower taxes and less regulation incentivize work and investment, shifting LRAS right over time.",
              "es": "Los defensores del lado de la oferta argumentan que menos impuestos y regulación incentivan trabajo e inversión."
            }
          }
        ],
        "topics": [
          {
            "id": "ad",
            "en": "Aggregate Demand",
            "es": "Demanda agregada"
          },
          {
            "id": "as",
            "en": "Aggregate Supply (SR & LR)",
            "es": "Oferta agregada (CP y LP)"
          },
          {
            "id": "mult",
            "en": "The Multiplier Effect",
            "es": "El efecto multiplicador"
          },
          {
            "id": "fiscal",
            "en": "Fiscal Policy and Stabilizers",
            "es": "Política fiscal y estabilizadores"
          }
        ]
      },
      {
        "id": "ap-m4",
        "title": {
          "en": "Macro Unit 4 · Money and Monetary Policy",
          "es": "Macro Unidad 4 · Dinero y política monetaria"
        },
        "brief": {
          "en": "Money serves as a medium of exchange, unit of account, and store of value. Banks create money through lending; the simple money multiplier is 1 ÷ the reserve requirement. The Federal Reserve influences the economy through open market operations, the reserve requirement, and the interest paid on reserves. Buying bonds injects reserves, lowers interest rates, and expands the money supply; selling bonds does the opposite. Lower interest rates raise investment and consumption, shifting aggregate demand right. The real interest rate equals the nominal rate minus inflation.",
          "es": "El dinero sirve como medio de cambio, unidad de cuenta y depósito de valor. Los bancos crean dinero al prestar; el multiplicador monetario simple es 1 ÷ el encaje bancario. La Reserva Federal influye en la economía mediante operaciones de mercado abierto, el encaje y los intereses pagados sobre reservas. Comprar bonos inyecta reservas, baja las tasas de interés y expande la oferta monetaria; vender bonos hace lo contrario. Tasas más bajas elevan la inversión y el consumo, desplazando la demanda agregada a la derecha. La tasa de interés real es la nominal menos la inflación."
        },
        "items": [
          {
            "id": "apm401",
            "topic": "money",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which function of money is served when a price tag reads $12.99?",
              "es": "¿Qué función del dinero se cumple cuando una etiqueta dice $12.99?"
            },
            "c": {
              "en": [
                "Unit of account",
                "Medium of exchange",
                "Store of value",
                "Standard of deferred payment"
              ],
              "es": [
                "Unidad de cuenta",
                "Medio de intercambio",
                "Depósito de valor",
                "Estándar de pago diferido"
              ]
            },
            "a": 0,
            "why": {
              "en": "A price tag measures value — that's the unit-of-account function. Money acts as a medium of exchange when you use it to buy the item.",
              "es": "Una etiqueta de precio mide valor — esa es la función de unidad de cuenta."
            }
          },
          {
            "id": "apm402",
            "topic": "money",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which asset is the most liquid?",
              "es": "¿Cuál activo es el más líquido?"
            },
            "c": {
              "en": [
                "Cash in your wallet",
                "A house",
                "A certificate of deposit",
                "A rare painting"
              ],
              "es": [
                "Efectivo en tu cartera",
                "Una casa",
                "Un certificado de depósito",
                "Una pintura rara"
              ]
            },
            "a": 0,
            "why": {
              "en": "Liquidity means how quickly an asset can be converted to a medium of exchange without losing value. Cash is already the medium.",
              "es": "Liquidez es qué tan rápido un activo se convierte en medio de intercambio sin perder valor. El efectivo ya es el medio."
            }
          },
          {
            "id": "apm403",
            "topic": "money",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "M1 includes all of the following EXCEPT:",
              "es": "M1 incluye todo lo siguiente EXCEPTO:"
            },
            "c": {
              "en": [
                "Savings deposits",
                "Currency in circulation",
                "Demand deposits (checking accounts)",
                "Traveler's checks"
              ],
              "es": [
                "Depósitos de ahorro",
                "Moneda en circulación",
                "Depósitos a la vista (cuentas corrientes)",
                "Cheques de viajero"
              ]
            },
            "a": 0,
            "why": {
              "en": "M1 is the most liquid measure: cash + checking + traveler's checks. Savings deposits are in M2.",
              "es": "M1 es la medida más líquida: efectivo + cuentas corrientes + cheques de viajero. Los depósitos de ahorro están en M2."
            }
          },
          {
            "id": "apm410",
            "topic": "bank",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "The reserve requirement is 20%. What is the simple money multiplier?",
              "es": "El requisito de reserva es 20%. ¿Cuál es el multiplicador monetario simple?"
            },
            "a": 5,
            "tol": 0.1,
            "why": {
              "en": "1 / 0.20 = 5.",
              "es": "1 / 0.20 = 5."
            }
          },
          {
            "id": "apm411",
            "topic": "bank",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "With a 10% reserve requirement, a $1,000 deposit can support how much in total new money (maximum expansion)?",
              "es": "Con un requisito de reserva del 10%, un depósito de $1,000 puede generar cuánto dinero nuevo en total (expansión máxima)?"
            },
            "a": 10000,
            "tol": 100,
            "why": {
              "en": "Money multiplier = 1/0.10 = 10. Maximum money = $1,000 × 10 = $10,000.",
              "es": "Multiplicador = 1/0.10 = 10. Dinero máximo = $1,000 × 10 = $10,000."
            }
          },
          {
            "id": "apm412",
            "topic": "bank",
            "type": "numeric",
            "diff": 2,
            "variantOf": "apm411",
            "q": {
              "en": "With a 25% reserve requirement, a $2,000 deposit can support how much total money at maximum expansion?",
              "es": "Con un requisito de reserva del 25%, un depósito de $2,000 puede generar cuánto dinero en total con expansión máxima?"
            },
            "a": 8000,
            "tol": 100,
            "why": {
              "en": "1/0.25 = 4. $2,000 × 4 = $8,000.",
              "es": "1/0.25 = 4. $2,000 × 4 = $8,000."
            }
          },
          {
            "id": "apm413",
            "topic": "bank",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain how a bank lending out excess reserves creates money.",
              "es": "Explica cómo un banco que presta sus reservas excedentes crea dinero."
            },
            "keys": [
              "lend",
              "deposit",
              "excess",
              "reserve",
              "more money",
              "presta",
              "depósito",
              "excedente",
              "reserva",
              "más dinero"
            ],
            "ideaLabel": {
              "en": "how lending creates money",
              "es": "cómo los préstamos crean dinero"
            },
            "spec": {
              "minWords": 5,
              "ideas": [
                {
                  "id": "lend",
                  "label": "the bank lends out excess reserves",
                  "any": [
                    "lends out",
                    "loans out",
                    "lend excess",
                    "loans excess",
                    "lends the money",
                    "makes a loan",
                    "presta",
                    "otorga préstamo",
                    "presta el excedente"
                  ]
                },
                {
                  "id": "redeposit",
                  "label": "the loan is spent and redeposited at another bank, which lends again",
                  "any": [
                    "deposited again",
                    "redeposited",
                    "another bank",
                    "new deposit",
                    "spent and deposited",
                    "cycle",
                    "chain",
                    "lends again",
                    "process repeats",
                    "each bank",
                    "se deposita de nuevo",
                    "otro banco",
                    "nuevo depósito",
                    "ciclo",
                    "cadena"
                  ]
                }
              ],
              "onPass": "Right — each loan becomes a new deposit, which becomes a new loan (minus required reserves), multiplying the original deposit through the banking system."
            },
            "why": {
              "en": "The bank keeps required reserves and lends the rest. That loan is spent and deposited at another bank, which lends again, multiplying money.",
              "es": "El banco guarda las reservas requeridas y presta el resto. Ese préstamo se gasta y se deposita en otro banco, que presta de nuevo, multiplicando el dinero."
            }
          },
          {
            "id": "apm420",
            "topic": "fed",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every tool the Federal Reserve controls directly.",
              "es": "Selecciona cada herramienta que la Reserva Federal controla directamente."
            },
            "c": {
              "en": [
                "Open market operations",
                "The discount rate",
                "The reserve requirement",
                "The federal income tax rate"
              ],
              "es": [
                "Operaciones de mercado abierto",
                "La tasa de descuento",
                "El requisito de reserva",
                "La tasa de impuesto sobre la renta"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "The Fed controls monetary tools. Taxes are fiscal policy, set by Congress.",
              "es": "La Fed controla herramientas monetarias. Los impuestos son política fiscal, del Congreso."
            }
          },
          {
            "id": "apm421",
            "topic": "fed",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "To fight high inflation, the Federal Reserve would most likely:",
              "es": "Para combatir alta inflación, la Reserva Federal probablemente:"
            },
            "c": {
              "en": [
                "Sell government bonds (open market sale)",
                "Buy government bonds",
                "Lower the discount rate",
                "Decrease the reserve requirement"
              ],
              "es": [
                "Vendería bonos del gobierno (venta de mercado abierto)",
                "Compraría bonos",
                "Bajaría la tasa de descuento",
                "Disminuiría el requisito de reserva"
              ]
            },
            "a": 0,
            "why": {
              "en": "Selling bonds pulls money out of circulation → less money → higher interest rates → less spending → lower inflation.",
              "es": "Vender bonos saca dinero de circulación → menos dinero → tasas más altas → menos gasto → menor inflación."
            }
          },
          {
            "id": "apm422",
            "topic": "fed",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "When the Fed buys government bonds on the open market, what happens to the money supply and interest rates?",
              "es": "Cuando la Fed compra bonos del gobierno en el mercado abierto, ¿qué pasa con la oferta monetaria y las tasas de interés?"
            },
            "c": {
              "en": [
                "Money supply increases, interest rates decrease",
                "Money supply decreases, interest rates increase",
                "Both increase",
                "Both decrease"
              ],
              "es": [
                "La oferta monetaria aumenta, las tasas de interés bajan",
                "La oferta monetaria disminuye, las tasas suben",
                "Ambas aumentan",
                "Ambas disminuyen"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Fed pays for bonds with new money → more reserves in banks → more lending → lower rates.",
              "es": "La Fed paga los bonos con dinero nuevo → más reservas → más préstamos → tasas más bajas."
            }
          },
          {
            "id": "apm430",
            "topic": "monpol",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An increase in the money supply, holding money demand constant, causes the nominal interest rate to:",
              "es": "Un aumento de la oferta monetaria, manteniendo la demanda de dinero constante, causa que la tasa de interés nominal:"
            },
            "c": {
              "en": [
                "Fall",
                "Rise",
                "Stay the same",
                "Become negative"
              ],
              "es": [
                "Baje",
                "Suba",
                "Se mantenga igual",
                "Se vuelva negativa"
              ]
            },
            "a": 0,
            "why": {
              "en": "More money supply with the same demand → surplus of money → interest rates fall to restore equilibrium.",
              "es": "Más oferta monetaria con la misma demanda → excedente de dinero → las tasas bajan para restaurar el equilibrio."
            }
          },
          {
            "id": "apm431",
            "topic": "monpol",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Expansionary monetary policy affects output mainly by:",
              "es": "La política monetaria expansiva afecta la producción principalmente al:"
            },
            "c": {
              "en": [
                "Lowering interest rates, which increases investment and consumer spending",
                "Directly increasing government purchases",
                "Raising taxes to fund new programs",
                "Reducing the price level immediately"
              ],
              "es": [
                "Bajar las tasas de interés, lo que aumenta inversión y gasto del consumidor",
                "Aumentar directamente las compras del gobierno",
                "Subir impuestos para financiar nuevos programas",
                "Reducir el nivel de precios inmediatamente"
              ]
            },
            "a": 0,
            "why": {
              "en": "The transmission mechanism: more money → lower rates → more borrowing and spending → higher AD → more output (in the short run).",
              "es": "El mecanismo de transmisión: más dinero → tasas más bajas → más préstamos y gasto → mayor DA → más producción (a corto plazo)."
            }
          },
          {
            "id": "apm432",
            "topic": "monpol",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "The nominal interest rate is 6% and inflation is 2%. What is the real interest rate?",
              "es": "La tasa de interés nominal es 6% y la inflación es 2%. ¿Cuál es la tasa de interés real?"
            },
            "a": 4,
            "tol": 0.1,
            "why": {
              "en": "Real rate ≈ nominal − inflation = 6% − 2% = 4%.",
              "es": "Tasa real ≈ nominal − inflación = 6% − 2% = 4%."
            }
          },
          {
            "id": "apm433",
            "topic": "monpol",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "In a liquidity trap, expansionary monetary policy is ineffective because:",
              "es": "En una trampa de liquidez, la política monetaria expansiva es ineficaz porque:"
            },
            "c": {
              "en": [
                "Interest rates are already near zero and cannot fall further to stimulate spending",
                "Banks have no excess reserves",
                "The Fed has run out of bonds to buy",
                "Consumers always prefer to spend rather than save"
              ],
              "es": [
                "Las tasas de interés ya están cerca de cero y no pueden bajar más para estimular el gasto",
                "Los bancos no tienen reservas excedentes",
                "La Fed se quedó sin bonos para comprar",
                "Los consumidores siempre prefieren gastar"
              ]
            },
            "a": 0,
            "why": {
              "en": "When rates are at the zero lower bound, adding more money can't push rates lower — banks just hold excess reserves.",
              "es": "Cuando las tasas están en el límite inferior de cero, agregar más dinero no puede bajarlas más — los bancos solo acumulan reservas."
            }
          },
          {
            "id": "apm404",
            "topic": "money",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Fiat money has value because:",
              "es": "El dinero fiduciario tiene valor porque:"
            },
            "c": {
              "en": [
                "The government declares it legal tender and people trust it",
                "It is backed by gold reserves",
                "It has intrinsic value as a commodity",
                "Banks guarantee its purchasing power"
              ],
              "es": [
                "El gobierno lo declara moneda de curso legal y la gente confía en él",
                "Está respaldado por reservas de oro",
                "Tiene valor intrínseco como mercancía",
                "Los bancos garantizan su poder adquisitivo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Fiat money isn't backed by a commodity — its value comes from government decree and collective acceptance.",
              "es": "El dinero fiduciario no está respaldado por una mercancía — su valor viene del decreto gubernamental y la aceptación colectiva."
            }
          },
          {
            "id": "apm405",
            "topic": "money",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The quantity theory of money (MV = PQ) predicts that if M doubles and V and Q stay constant:",
              "es": "La teoría cuantitativa del dinero (MV = PQ) predice que si M se duplica y V y Q se mantienen constantes:"
            },
            "c": {
              "en": [
                "The price level doubles",
                "Real output doubles",
                "Velocity doubles",
                "Interest rates double"
              ],
              "es": [
                "El nivel de precios se duplica",
                "La producción real se duplica",
                "La velocidad se duplica",
                "Las tasas de interés se duplican"
              ]
            },
            "a": 0,
            "why": {
              "en": "If M doubles and V and Q are fixed, then P must double to maintain MV = PQ. More money chasing the same goods → higher prices.",
              "es": "Si M se duplica y V y Q son fijos, P debe duplicarse para mantener MV = PQ."
            }
          },
          {
            "id": "apm414",
            "topic": "bank",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "If a bank receives a $1,000 deposit and the reserve requirement is 20%, the bank can lend out:",
              "es": "Si un banco recibe un depósito de $1,000 y el requisito de reserva es 20%, el banco puede prestar:"
            },
            "c": {
              "en": [
                "$800",
                "$1,000",
                "$200",
                "$5,000"
              ],
              "es": [
                "$800",
                "$1,000",
                "$200",
                "$5,000"
              ]
            },
            "a": 0,
            "why": {
              "en": "Required reserves = $1,000 × 0.20 = $200. Excess reserves available to lend = $1,000 − $200 = $800.",
              "es": "Reservas requeridas = $1,000 × 0.20 = $200. Reservas excedentes para prestar = $1,000 − $200 = $800."
            }
          },
          {
            "id": "apm415",
            "topic": "bank",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "A bank receives a $5,000 deposit. The reserve requirement is 10%. How much can the ENTIRE banking system create from this deposit (total new money, maximum)?",
              "es": "Un banco recibe un depósito de $5,000. El requisito de reserva es 10%. ¿Cuánto puede crear TODO el sistema bancario (dinero nuevo total, máximo)?"
            },
            "a": 50000,
            "tol": 500,
            "why": {
              "en": "Multiplier = 1/0.10 = 10. Total = $5,000 × 10 = $50,000.",
              "es": "Multiplicador = 1/0.10 = 10. Total = $5,000 × 10 = $50,000."
            }
          },
          {
            "id": "apm423",
            "topic": "fed",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Lowering the discount rate is an example of:",
              "es": "Bajar la tasa de descuento es un ejemplo de:"
            },
            "c": {
              "en": [
                "Expansionary monetary policy",
                "Contractionary monetary policy",
                "Expansionary fiscal policy",
                "Supply-side policy"
              ],
              "es": [
                "Política monetaria expansiva",
                "Política monetaria contractiva",
                "Política fiscal expansiva",
                "Política del lado de la oferta"
              ]
            },
            "a": 0,
            "why": {
              "en": "A lower discount rate makes it cheaper for banks to borrow from the Fed → more lending → more money in circulation.",
              "es": "Una tasa de descuento más baja abarata los préstamos de la Fed a bancos → más préstamos → más dinero en circulación."
            }
          },
          {
            "id": "apm424",
            "topic": "fed",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The Federal Reserve is considered independent because:",
              "es": "La Reserva Federal se considera independiente porque:"
            },
            "c": {
              "en": [
                "Its governors serve long terms and its decisions don't require Congressional approval",
                "It has no connection to the government",
                "Congress cannot change the Fed's structure",
                "The President appoints all 12 regional bank presidents"
              ],
              "es": [
                "Sus gobernadores sirven largos períodos y sus decisiones no requieren aprobación del Congreso",
                "No tiene conexión con el gobierno",
                "El Congreso no puede cambiar la estructura de la Fed",
                "El Presidente nombra a los 12 presidentes de bancos regionales"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Fed's independence means monetary policy isn't driven by election cycles, though Congress retains oversight authority.",
              "es": "La independencia de la Fed significa que la política monetaria no está guiada por ciclos electorales."
            }
          },
          {
            "id": "apm434",
            "topic": "monpol",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Walk through the chain: the Fed buys bonds → ___ → ___ → ___ → real GDP changes. Fill in the steps.",
              "es": "Recorre la cadena: la Fed compra bonos → ___ → ___ → ___ → el PIB real cambia. Llena los pasos."
            },
            "keys": [
              "money supply",
              "interest rate",
              "investment",
              "spending",
              "oferta monetaria",
              "tasa de interés",
              "inversión",
              "gasto"
            ],
            "ideaLabel": {
              "en": "the monetary transmission mechanism",
              "es": "el mecanismo de transmisión monetaria"
            },
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "ms",
                  "label": "money supply increases",
                  "any": [
                    "money supply increases",
                    "more money",
                    "money grows",
                    "reserves increase",
                    "money supply rises",
                    "banks have more",
                    "oferta monetaria aumenta",
                    "más dinero",
                    "reservas aumentan"
                  ]
                },
                {
                  "id": "rates",
                  "label": "interest rates fall",
                  "any": [
                    "interest rates fall",
                    "rates drop",
                    "rates decrease",
                    "lower rates",
                    "borrowing cheaper",
                    "tasas bajan",
                    "tasas de interés disminuyen",
                    "crédito más barato"
                  ]
                },
                {
                  "id": "spend",
                  "label": "investment and/or spending increases",
                  "any": [
                    "investment increases",
                    "spending rises",
                    "more borrowing",
                    "more investment",
                    "AD increases",
                    "AD shifts right",
                    "consumer spending",
                    "business spending",
                    "inversión aumenta",
                    "gasto aumenta",
                    "DA aumenta"
                  ]
                }
              ],
              "onPass": "Right: buy bonds → money supply up → interest rates down → more investment/spending → AD right → GDP rises."
            },
            "why": {
              "en": "Buy bonds → money supply ↑ → interest rates ↓ → investment/spending ↑ → AD shifts right → real GDP ↑.",
              "es": "Compra bonos → oferta monetaria ↑ → tasas ↓ → inversión/gasto ↑ → DA a la derecha → PIB real ↑."
            }
          },
          {
            "id": "apm435",
            "topic": "monpol",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Fed wants to slow down an overheating economy. Which combination of actions would achieve this?",
              "es": "La Fed quiere desacelerar una economía sobrecalentada. ¿Qué combinación de acciones lograría esto?"
            },
            "c": {
              "en": [
                "Sell bonds, raise the discount rate, raise the reserve requirement",
                "Buy bonds, lower the discount rate, lower the reserve requirement",
                "Sell bonds, lower the discount rate, raise the reserve requirement",
                "Buy bonds, raise the discount rate, lower the reserve requirement"
              ],
              "es": [
                "Vender bonos, subir la tasa de descuento, subir el requisito de reserva",
                "Comprar bonos, bajar la tasa de descuento, bajar el requisito de reserva",
                "Vender bonos, bajar la tasa de descuento, subir el requisito de reserva",
                "Comprar bonos, subir la tasa de descuento, bajar el requisito de reserva"
              ]
            },
            "a": 0,
            "why": {
              "en": "All three tools contract the money supply: selling bonds pulls money out, higher discount rate discourages borrowing, higher reserves lock up more deposits.",
              "es": "Las tres herramientas contraen la oferta monetaria: vender bonos saca dinero, mayor tasa de descuento desalienta préstamos, mayores reservas inmovilizan más depósitos."
            }
          }
        ],
        "topics": [
          {
            "id": "money",
            "en": "Functions and Types of Money",
            "es": "Funciones y tipos de dinero"
          },
          {
            "id": "bank",
            "en": "Banking and Money Creation",
            "es": "Banca y creación de dinero"
          },
          {
            "id": "fed",
            "en": "The Federal Reserve's Tools",
            "es": "Herramientas de la Reserva Federal"
          },
          {
            "id": "monpol",
            "en": "How Monetary Policy Works",
            "es": "Cómo funciona la política monetaria"
          }
        ]
      },
      {
        "id": "ap-i1",
        "title": {
          "en": "Micro Unit 1 · Basic Economic Concepts",
          "es": "Micro Unidad 1 · Conceptos económicos básicos"
        },
        "brief": {
          "en": "Microeconomics starts where macro does — with scarcity — but it looks at the single decision maker rather than the whole economy. Every choice a person or a firm makes has an opportunity cost: the value of the next-best thing given up. Rational decision makers weigh marginal benefit against marginal cost, doing one more of something only while the extra benefit is at least the extra cost. The production possibilities curve shows the combinations available with fixed resources; points inside are inefficient, points outside are unattainable for now, and the bow shape exists because resources are not equally suited to both jobs. Comparative advantage — the lower opportunity cost, not the bigger output — is what decides who should specialise, and specialisation plus trade lets both parties consume beyond their own curves. Economic systems differ in who answers the three questions: what to produce, how to produce it, and who receives it.",
          "es": "La microeconomía empieza donde empieza la macro, con la escasez, pero mira al individuo o a la empresa y no a la economía entera. Cada elección tiene un costo de oportunidad: el valor de la mejor alternativa que se sacrifica. Quien decide racionalmente compara el beneficio marginal con el costo marginal y hace una unidad más solo mientras el beneficio extra alcance el costo extra. La curva de posibilidades de producción muestra las combinaciones disponibles con recursos fijos: los puntos interiores son ineficientes, los exteriores no se alcanzan por ahora, y la curva se arquea porque los recursos no sirven igual para ambas tareas. La ventaja comparativa, es decir el menor costo de oportunidad y no la mayor producción, decide quién debe especializarse, y especializarse y comerciar permite a ambos consumir más allá de su propia curva. Los sistemas económicos se distinguen por quién responde las tres preguntas: qué producir, cómo producirlo y quién lo recibe."
        },
        "items": [
          {
            "id": "api101",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "You spend Saturday at a shift that pays $60. Your other options were a concert ticket you value at $45 and studying, which you value at $20. Your opportunity cost is:",
              "es": "Pasas el sábado en un turno que paga $60. Tus otras opciones eran un concierto que valoras en $45 y estudiar, que valoras en $20. Tu costo de oportunidad es:"
            },
            "c": {
              "en": [
                "$45 — the next-best option you gave up",
                "$65 — everything you gave up added together",
                "$60 — what you earned instead",
                "$20 — the cheapest thing you gave up"
              ],
              "es": [
                "$45: la mejor alternativa que sacrificaste",
                "$65: todo lo que sacrificaste sumado",
                "$60: lo que ganaste en su lugar",
                "$20: lo más barato que sacrificaste"
              ]
            },
            "a": 0,
            "why": {
              "en": "Opportunity cost is the single next-best alternative, not the sum of every option and not what you gained.",
              "es": "El costo de oportunidad es la única mejor alternativa sacrificada, no la suma de todas ni lo que ganaste."
            }
          },
          {
            "id": "api102",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "A point in the interior of a production possibilities curve represents:",
              "es": "Un punto en el interior de la curva de posibilidades de producción representa:"
            },
            "c": {
              "en": [
                "Production that is attainable but inefficient",
                "Production that is impossible with current resources",
                "The most efficient use of every resource",
                "A point only reachable through trade"
              ],
              "es": [
                "Producción alcanzable pero ineficiente",
                "Producción imposible con los recursos actuales",
                "El uso más eficiente de todos los recursos",
                "Un punto que solo se alcanza comerciando"
              ]
            },
            "a": 0,
            "why": {
              "en": "Interior points leave resources idle or badly used, so more of both goods could be produced without giving anything up.",
              "es": "Los puntos interiores dejan recursos ociosos o mal usados, así que se podría producir más de ambos bienes sin sacrificar nada."
            }
          },
          {
            "id": "api103",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Why does a production possibilities curve usually bow outward rather than being a straight line?",
              "es": "¿Por qué la curva de posibilidades de producción suele arquearse en lugar de ser una línea recta?"
            },
            "c": {
              "en": [
                "Resources are not equally suited to producing both goods",
                "Technology improves as you produce more",
                "Opportunity cost falls as you specialise",
                "Because one good is always more valuable than the other"
              ],
              "es": [
                "Los recursos no sirven igual para producir ambos bienes",
                "La tecnología mejora al producir más",
                "El costo de oportunidad baja al especializarse",
                "Porque un bien siempre vale más que el otro"
              ]
            },
            "a": 0,
            "why": {
              "en": "As you push toward one good you must move resources that were poorly suited to it, so each extra unit costs more of the other good.",
              "es": "Al empujar hacia un bien debes mover recursos poco aptos para él, así que cada unidad extra cuesta más del otro bien."
            }
          },
          {
            "id": "api104",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Ana can make 12 bracelets or 4 necklaces in an hour. Ben can make 6 bracelets or 3 necklaces. Who has the comparative advantage in necklaces?",
              "es": "Ana hace 12 pulseras o 4 collares por hora. Ben hace 6 pulseras o 3 collares. ¿Quién tiene la ventaja comparativa en collares?"
            },
            "c": {
              "en": [
                "Ben — a necklace costs him 2 bracelets, against Ana's 3",
                "Ana — she makes more necklaces per hour",
                "Ana — she makes more of both goods",
                "Neither — their opportunity costs are the same"
              ],
              "es": [
                "Ben: un collar le cuesta 2 pulseras, frente a las 3 de Ana",
                "Ana: hace más collares por hora",
                "Ana: produce más de ambos bienes",
                "Ninguno: sus costos de oportunidad son iguales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Ana gives up 3 bracelets per necklace (12/4); Ben gives up 2 (6/3). Lower opportunity cost wins, even though Ana out-produces him at everything.",
              "es": "Ana sacrifica 3 pulseras por collar (12/4); Ben sacrifica 2 (6/3). Gana el menor costo de oportunidad, aunque Ana produzca más de todo."
            }
          },
          {
            "id": "api105",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "A bakery can make 40 loaves or 10 cakes with the same resources. What is the opportunity cost of ONE cake, measured in loaves?",
              "es": "Una panadería hace 40 panes o 10 pasteles con los mismos recursos. ¿Cuál es el costo de oportunidad de UN pastel, medido en panes?"
            },
            "a": 4,
            "tol": 0.01,
            "why": {
              "en": "40 loaves ÷ 10 cakes = 4 loaves given up per cake. Always divide what you give up by what you gain.",
              "es": "40 panes ÷ 10 pasteles = 4 panes sacrificados por pastel. Divide siempre lo que sacrificas entre lo que ganas."
            }
          },
          {
            "id": "api106",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A rational decision maker should produce one more unit when:",
              "es": "Quien decide racionalmente debe producir una unidad más cuando:"
            },
            "c": {
              "en": [
                "Marginal benefit is at least marginal cost",
                "Total benefit is greater than total cost",
                "Average cost is falling",
                "Marginal cost is at its lowest point"
              ],
              "es": [
                "El beneficio marginal alcanza al costo marginal",
                "El beneficio total supera al costo total",
                "El costo medio está bajando",
                "El costo marginal está en su punto más bajo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Marginal thinking compares the extra benefit of one more against the extra cost of one more — totals and averages don't answer that question.",
              "es": "El pensamiento marginal compara el beneficio extra de una unidad más con su costo extra; los totales y promedios no responden eso."
            }
          },
          {
            "id": "api107",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every situation that would shift a country's production possibilities curve OUTWARD.",
              "es": "Selecciona todas las situaciones que desplazarían la curva de posibilidades hacia AFUERA."
            },
            "c": {
              "en": [
                "A new technology that raises output per worker",
                "Immigration that grows the labour force",
                "Moving from an interior point to a point on the curve",
                "A natural disaster that destroys factories"
              ],
              "es": [
                "Una tecnología nueva que sube la producción por trabajador",
                "Inmigración que aumenta la fuerza laboral",
                "Pasar de un punto interior a un punto sobre la curva",
                "Un desastre natural que destruye fábricas"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "Growth needs more resources or better technology. Moving onto the curve is a gain in efficiency, not growth, and a disaster shifts it inward.",
              "es": "El crecimiento requiere más recursos o mejor tecnología. Llegar a la curva es eficiencia, no crecimiento, y un desastre la desplaza hacia adentro."
            }
          },
          {
            "id": "api108",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "In a market economy, who primarily answers the question 'what should be produced?'",
              "es": "En una economía de mercado, ¿quién responde principalmente a '¿qué se debe producir?'"
            },
            "c": {
              "en": [
                "Buyers and sellers, through prices",
                "A central planning authority",
                "The largest firms only",
                "Elected representatives by vote"
              ],
              "es": [
                "Compradores y vendedores, a través de los precios",
                "Una autoridad central de planificación",
                "Solo las empresas más grandes",
                "Los representantes electos por votación"
              ]
            },
            "a": 0,
            "why": {
              "en": "Prices carry the information and the incentive: what buyers will pay signals what is worth producing.",
              "es": "Los precios llevan la información y el incentivo: lo que los compradores pagan señala qué vale la pena producir."
            }
          },
          {
            "id": "api109",
            "type": "short",
            "diff": 2,
            "q": {
              "en": "In one sentence, explain why a country can consume beyond its own production possibilities curve when it specialises and trades.",
              "es": "En una oración, explica por qué un país puede consumir más allá de su propia curva de posibilidades cuando se especializa y comercia."
            },
            "keys": [
              "trade",
              "specializ",
              "specialis",
              "comparative advantage",
              "lower opportunity cost",
              "exchange"
            ],
            "why": {
              "en": "Each country produces what it gives up least to make, then trades. The combined output is larger, so both can consume outside their own curve — though neither can PRODUCE outside it.",
              "es": "Cada país produce lo que menos sacrifica y luego comercia. La producción conjunta es mayor, así que ambos consumen fuera de su curva, aunque ninguno pueda PRODUCIR fuera de ella."
            }
          },
          {
            "id": "api110",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A firm has already spent $8,000 on equipment that cannot be resold. When deciding whether to continue the project, that $8,000 should be:",
              "es": "Una empresa ya gastó $8,000 en equipo que no se puede revender. Al decidir si continuar el proyecto, esos $8,000 deben:"
            },
            "c": {
              "en": [
                "Ignored — it is a sunk cost and cannot be recovered",
                "Added to the future costs of continuing",
                "Subtracted from the expected benefit",
                "Treated as the opportunity cost of stopping"
              ],
              "es": [
                "Ignorarse: es un costo hundido y no se recupera",
                "Sumarse a los costos futuros de continuar",
                "Restarse del beneficio esperado",
                "Tratarse como el costo de oportunidad de parar"
              ]
            },
            "a": 0,
            "why": {
              "en": "A sunk cost is gone whichever choice you make, so it cannot change which choice is better. Only future costs and benefits belong in the decision.",
              "es": "Un costo hundido se pierde elijas lo que elijas, así que no puede cambiar qué opción es mejor. Solo los costos y beneficios futuros cuentan."
            }
          }
        ]
      },
      {
        "id": "ap-i2",
        "title": {
          "en": "Micro Unit 2 · Supply, Demand, Elasticity",
          "es": "Micro Unidad 2 · Oferta, demanda, elasticidad"
        },
        "brief": {
          "en": "A change in a good's own price moves you along its curve; anything else shifts the curve. Demand shifters include income, tastes, prices of substitutes and complements, expectations, and the number of buyers. Supply shifters include input costs, technology, taxes and subsidies, and the number of sellers. Equilibrium is where quantity supplied equals quantity demanded; a binding price ceiling causes shortage and a binding price floor causes surplus. Price elasticity of demand is %ΔQ ÷ %ΔP in absolute value: elastic demand means a price cut raises total revenue, inelastic means a price increase raises it.",
          "es": "Un cambio en el precio propio de un bien mueve a lo largo de su curva; cualquier otra cosa la desplaza. Desplazan la demanda: ingreso, gustos, precios de sustitutos y complementarios, expectativas y número de compradores. Desplazan la oferta: costos de insumos, tecnología, impuestos y subsidios, y número de vendedores. El equilibrio ocurre donde la cantidad ofrecida iguala a la demandada; un precio máximo vinculante causa escasez y uno mínimo causa excedente. La elasticidad precio de la demanda es %ΔQ ÷ %ΔP en valor absoluto: si es elástica, bajar el precio sube el ingreso total; si es inelástica, subirlo lo aumenta."
        },
        "items": [
          {
            "id": "api201",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The price of coffee falls. In the coffee market this causes:",
              "es": "El precio del café baja. En el mercado del café esto causa:"
            },
            "c": {
              "en": [
                "A rise in quantity demanded, with no shift in demand",
                "A rightward shift of demand",
                "A rightward shift of supply",
                "A leftward shift of demand"
              ],
              "es": [
                "Un aumento en la cantidad demandada, sin desplazar la demanda",
                "Un desplazamiento de la demanda a la derecha",
                "Un desplazamiento de la oferta a la derecha",
                "Un desplazamiento de la demanda a la izquierda"
              ]
            },
            "a": 0,
            "why": {
              "en": "A good's own price change is a movement along the demand curve, never a shift.",
              "es": "Un cambio en el precio propio del bien es un movimiento sobre la curva, nunca un desplazamiento."
            }
          },
          {
            "id": "api202",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Tea and coffee are substitutes. The price of tea rises. In the coffee market:",
              "es": "El té y el café son sustitutos. Sube el precio del té. En el mercado del café:"
            },
            "c": {
              "en": [
                "Demand shifts right, raising price and quantity",
                "Demand shifts left, lowering price",
                "Supply shifts right",
                "Nothing changes"
              ],
              "es": [
                "La demanda se desplaza a la derecha, subiendo precio y cantidad",
                "La demanda se desplaza a la izquierda, bajando el precio",
                "La oferta se desplaza a la derecha",
                "Nada cambia"
              ]
            },
            "a": 0,
            "why": {
              "en": "Buyers move away from the pricier substitute toward coffee, raising demand for coffee.",
              "es": "Los compradores dejan el sustituto más caro y prefieren café, elevando su demanda."
            }
          },
          {
            "id": "api203",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A binding price ceiling on apartments causes:",
              "es": "Un precio máximo vinculante en apartamentos causa:"
            },
            "c": {
              "en": [
                "A shortage of apartments",
                "A surplus of apartments",
                "Immediate equilibrium",
                "Higher rents than before"
              ],
              "es": [
                "Escasez de apartamentos",
                "Excedente de apartamentos",
                "Equilibrio inmediato",
                "Rentas más altas que antes"
              ]
            },
            "a": 0,
            "why": {
              "en": "Set below equilibrium, quantity demanded exceeds quantity supplied.",
              "es": "Fijado bajo el equilibrio, la cantidad demandada supera a la ofrecida."
            }
          },
          {
            "id": "api204",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "Qd = 100 − 2P and Qs = 40 + P. Find the equilibrium price.",
              "es": "Qd = 100 − 2P y Qs = 40 + P. Halla el precio de equilibrio."
            },
            "a": 20,
            "tol": 0,
            "why": {
              "en": "100 − 2P = 40 + P gives 60 = 3P, so P = 20.",
              "es": "100 − 2P = 40 + P da 60 = 3P, así que P = 20."
            }
          },
          {
            "id": "api205",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "Using Qd = 100 − 2P and Qs = 40 + P, find the equilibrium quantity.",
              "es": "Con Qd = 100 − 2P y Qs = 40 + P, halla la cantidad de equilibrio."
            },
            "a": 60,
            "tol": 0,
            "why": {
              "en": "At P = 20, Qs = 40 + 20 = 60 and Qd = 100 − 40 = 60.",
              "es": "En P = 20, Qs = 40 + 20 = 60 y Qd = 100 − 40 = 60."
            }
          },
          {
            "id": "api206",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every change that shifts the DEMAND curve for pizza to the right.",
              "es": "Selecciona cada cambio que desplaza la curva de DEMANDA de pizza a la derecha."
            },
            "c": {
              "en": [
                "Buyer incomes rise and pizza is a normal good",
                "The price of burgers rises",
                "The price of pizza falls",
                "More families move into town"
              ],
              "es": [
                "Sube el ingreso y la pizza es un bien normal",
                "Sube el precio de las hamburguesas",
                "Baja el precio de la pizza",
                "Llegan más familias a la ciudad"
              ]
            },
            "a": [
              0,
              1,
              3
            ],
            "why": {
              "en": "Income, substitute prices, and the number of buyers shift demand; pizza's own price does not.",
              "es": "Ingreso, precio de sustitutos y número de compradores desplazan la demanda; el precio propio no."
            }
          },
          {
            "id": "api207",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Price rises 10% and quantity demanded falls 20%. Give the price elasticity of demand as an absolute value.",
              "es": "El precio sube 10% y la cantidad demandada cae 20%. Da la elasticidad precio de la demanda en valor absoluto."
            },
            "a": 2,
            "tol": 0.05,
            "why": {
              "en": "20 ÷ 10 = 2, so demand is elastic.",
              "es": "20 ÷ 10 = 2, así que la demanda es elástica."
            }
          },
          {
            "id": "api208",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Demand for a life-saving medicine is highly inelastic. To raise total revenue, the seller should:",
              "es": "La demanda de un medicamento vital es muy inelástica. Para aumentar el ingreso total, el vendedor debe:"
            },
            "c": {
              "en": [
                "Raise the price",
                "Lower the price",
                "Hold price constant forever",
                "Stop producing"
              ],
              "es": [
                "Subir el precio",
                "Bajar el precio",
                "Mantener el precio para siempre",
                "Dejar de producir"
              ]
            },
            "a": 0,
            "why": {
              "en": "With inelastic demand quantity barely falls, so a higher price raises revenue.",
              "es": "Con demanda inelástica la cantidad apenas cae, así que un precio mayor eleva el ingreso."
            }
          },
          {
            "id": "api209",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every factor that makes demand MORE elastic.",
              "es": "Selecciona cada factor que hace la demanda MÁS elástica."
            },
            "c": {
              "en": [
                "Many close substitutes exist",
                "The good takes a large share of income",
                "Buyers have a long time to adjust",
                "The good is a medical necessity"
              ],
              "es": [
                "Existen muchos sustitutos cercanos",
                "El bien ocupa gran parte del ingreso",
                "Los compradores tienen mucho tiempo para ajustarse",
                "El bien es una necesidad médica"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Substitutes, budget share, and time raise elasticity; necessity lowers it.",
              "es": "Sustitutos, peso presupuestario y tiempo elevan la elasticidad; la necesidad la reduce."
            }
          },
          {
            "id": "api210",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Supply shifts right while demand shifts left. Equilibrium price and quantity:",
              "es": "La oferta se desplaza a la derecha y la demanda a la izquierda. El precio y la cantidad de equilibrio:"
            },
            "c": {
              "en": [
                "Price falls; quantity is indeterminate",
                "Both certainly rise",
                "Both certainly fall",
                "Price rises; quantity falls"
              ],
              "es": [
                "El precio baja; la cantidad es indeterminada",
                "Ambos suben con certeza",
                "Ambos bajan con certeza",
                "El precio sube; la cantidad baja"
              ]
            },
            "a": 0,
            "why": {
              "en": "Both shifts push price down but pull quantity in opposite directions.",
              "es": "Ambos desplazamientos bajan el precio pero mueven la cantidad en direcciones opuestas."
            }
          }
        ]
      },
      {
        "id": "ap-i3",
        "title": {
          "en": "Micro Unit 3 · Costs, Competition, Market Power",
          "es": "Micro Unidad 3 · Costos, competencia, poder de mercado"
        },
        "brief": {
          "en": "Fixed costs do not change with output; variable costs do. Marginal cost is the cost of one more unit, and average total cost is total cost divided by quantity. Marginal cost crosses average total cost at its minimum. Every firm maximizes profit where marginal revenue equals marginal cost. In perfect competition firms are price takers, so price equals marginal revenue, and long-run economic profit is driven to zero by entry. A monopoly faces the whole market demand curve, so its marginal revenue lies below price, and it produces less at a higher price, creating deadweight loss.",
          "es": "Los costos fijos no cambian con la producción; los variables sí. El costo marginal es el de una unidad más y el costo total medio es el costo total dividido entre la cantidad. El costo marginal corta al costo total medio en su mínimo. Toda empresa maximiza beneficio donde el ingreso marginal iguala al costo marginal. En competencia perfecta las empresas son tomadoras de precio, por lo que el precio iguala al ingreso marginal y la entrada lleva el beneficio económico de largo plazo a cero. Un monopolio enfrenta toda la demanda del mercado, así que su ingreso marginal está por debajo del precio, produce menos a un precio mayor y genera pérdida de eficiencia."
        },
        "items": [
          {
            "id": "api301",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which cost is fixed in the short run?",
              "es": "¿Cuál costo es fijo en el corto plazo?"
            },
            "c": {
              "en": [
                "Monthly factory rent",
                "Wages for extra shifts",
                "Raw materials",
                "Shipping per order"
              ],
              "es": [
                "La renta mensual de la fábrica",
                "Salarios de turnos extra",
                "Materias primas",
                "Envío por pedido"
              ]
            },
            "a": 0,
            "why": {
              "en": "Rent is owed whether output is zero or at capacity.",
              "es": "La renta se paga tanto si la producción es cero como si está a tope."
            }
          },
          {
            "id": "api302",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Total cost is 500 at 20 units and 560 at 21 units. What is the marginal cost of the 21st unit?",
              "es": "El costo total es 500 con 20 unidades y 560 con 21. ¿Cuál es el costo marginal de la unidad 21?"
            },
            "a": 60,
            "tol": 0,
            "why": {
              "en": "560 − 500 = 60.",
              "es": "560 − 500 = 60."
            }
          },
          {
            "id": "api303",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Total cost is 900 for 30 units. What is average total cost?",
              "es": "El costo total es 900 para 30 unidades. ¿Cuál es el costo total medio?"
            },
            "a": 30,
            "tol": 0,
            "why": {
              "en": "900 ÷ 30 = 30.",
              "es": "900 ÷ 30 = 30."
            }
          },
          {
            "id": "api304",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "When marginal cost is below average total cost, average total cost is:",
              "es": "Cuando el costo marginal está por debajo del costo total medio, este:"
            },
            "c": {
              "en": [
                "Falling",
                "Rising",
                "At its maximum",
                "Constant"
              ],
              "es": [
                "Está bajando",
                "Está subiendo",
                "Está en su máximo",
                "Es constante"
              ]
            },
            "a": 0,
            "why": {
              "en": "An extra unit cheaper than the current average pulls the average down.",
              "es": "Una unidad extra más barata que el promedio actual arrastra el promedio hacia abajo."
            }
          },
          {
            "id": "api305",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A perfectly competitive firm maximizes profit by producing where:",
              "es": "Una empresa en competencia perfecta maximiza beneficio produciendo donde:"
            },
            "c": {
              "en": [
                "Price equals marginal cost",
                "Price equals average total cost",
                "Total revenue is highest",
                "Average cost is lowest"
              ],
              "es": [
                "El precio iguala al costo marginal",
                "El precio iguala al costo total medio",
                "El ingreso total es máximo",
                "El costo medio es mínimo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Price equals marginal revenue for a price taker, so MR = MC becomes P = MC.",
              "es": "Para una tomadora de precios el precio iguala al ingreso marginal, así que IMg = CMg es P = CMg."
            }
          },
          {
            "id": "api306",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "A competitive firm sells at $12. Marginal cost of the next unit is $9. By how many dollars does producing that unit change profit?",
              "es": "Una empresa competitiva vende a $12. El costo marginal de la siguiente unidad es $9. ¿En cuántos dólares cambia el beneficio al producirla?"
            },
            "a": 3,
            "tol": 0,
            "why": {
              "en": "12 − 9 = 3, so the unit adds $3 of profit and should be produced.",
              "es": "12 − 9 = 3, así que la unidad suma $3 de beneficio y debe producirse."
            }
          },
          {
            "id": "api307",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "In long-run equilibrium, perfectly competitive firms earn:",
              "es": "En equilibrio de largo plazo, las empresas en competencia perfecta obtienen:"
            },
            "c": {
              "en": [
                "Zero economic profit",
                "Large economic profit",
                "Persistent economic losses",
                "Profit equal to fixed cost"
              ],
              "es": [
                "Beneficio económico cero",
                "Un gran beneficio económico",
                "Pérdidas económicas persistentes",
                "Beneficio igual al costo fijo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Entry competes profit away until price equals minimum average total cost.",
              "es": "La entrada elimina el beneficio hasta que el precio iguala el costo total medio mínimo."
            }
          },
          {
            "id": "api308",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Compared with perfect competition, a single-price monopoly produces:",
              "es": "Comparado con la competencia perfecta, un monopolio de precio único produce:"
            },
            "c": {
              "en": [
                "Less output at a higher price",
                "More output at a lower price",
                "The same output and price",
                "Output where price equals marginal cost"
              ],
              "es": [
                "Menos producción a un precio mayor",
                "Más producción a un precio menor",
                "La misma producción y precio",
                "Producción donde el precio iguala al costo marginal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Marginal revenue lies below price, so the profit-maximizing quantity is smaller and price is higher.",
              "es": "El ingreso marginal está bajo el precio, así que la cantidad óptima es menor y el precio mayor."
            }
          },
          {
            "id": "api309",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every characteristic of a perfectly competitive market.",
              "es": "Selecciona cada característica de un mercado de competencia perfecta."
            },
            "c": {
              "en": [
                "Many small buyers and sellers",
                "An identical, standardized product",
                "Easy entry and exit",
                "One firm setting the market price"
              ],
              "es": [
                "Muchos compradores y vendedores pequeños",
                "Un producto idéntico y estandarizado",
                "Entrada y salida fáciles",
                "Una empresa que fija el precio"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "A single price-setting firm describes monopoly, the opposite of perfect competition.",
              "es": "Una sola empresa que fija el precio describe al monopolio, lo opuesto a la competencia perfecta."
            }
          },
          {
            "id": "api310",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "A firm sells 100 units at $8 with marginal cost $5. Should it produce more? Use MR and MC in your answer.",
              "es": "Una empresa vende 100 unidades a $8 con costo marginal $5. ¿Debe producir más? Usa IMg y CMg en tu respuesta."
            },
            "keys": [
              "yes",
              "more",
              "expand",
              "exceed",
              "greater",
              "above",
              "mr",
              "marginal revenue",
              "sí",
              "si",
              "mayor",
              "supera",
              "ingreso marginal"
            ],
            "why": {
              "en": "Marginal revenue above marginal cost means each extra unit adds profit, so expand until MR = MC.",
              "es": "Un ingreso marginal mayor que el costo marginal significa que cada unidad extra suma beneficio; expande hasta IMg = CMg."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "us-gov",
    "color": "#F2B441",
    "name": {
      "en": "U.S. Government Honors",
      "es": "Gobierno de EE. UU. Honores"
    },
    "units": [
      {
        "id": "gov-u1",
        "title": {
          "en": "Unit 1 · Founding Principles (SS.912.CG.1.1–1.4)",
          "es": "Unidad 1 · Principios fundacionales (SS.912.CG.1.1–1.4)"
        },
        "brief": {
          "en": "The Founders drew on natural rights philosophy from John Locke, separation of powers from Montesquieu, and the social contract idea that government exists by consent of the governed. The Declaration of Independence states that people hold unalienable rights and may alter a government that destroys them. The Articles of Confederation failed because Congress could not tax, regulate trade, or enforce laws, and Shays' Rebellion exposed that weakness. The Federalist Papers argued for ratification: Federalist 10 on controlling faction through a large republic, Federalist 51 on checks and balances. Anti-Federalists demanded a Bill of Rights as the price of ratification.",
          "es": "Los fundadores tomaron la filosofía de los derechos naturales de John Locke, la separación de poderes de Montesquieu y la idea del contrato social: el gobierno existe por consentimiento de los gobernados. La Declaración de Independencia afirma que las personas tienen derechos inalienables y pueden cambiar un gobierno que los destruya. Los Artículos de la Confederación fracasaron porque el Congreso no podía cobrar impuestos, regular el comercio ni hacer cumplir las leyes, y la Rebelión de Shays expuso esa debilidad. Los Papeles Federalistas defendieron la ratificación: el 10 sobre controlar las facciones mediante una república grande y el 51 sobre pesos y contrapesos. Los antifederalistas exigieron una Carta de Derechos como condición."
        },
        "items": [
          {
            "id": "gov101",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The idea that government power comes from the consent of the governed is called:",
              "es": "La idea de que el poder del gobierno proviene del consentimiento de los gobernados se llama:"
            },
            "c": {
              "en": [
                "Popular sovereignty",
                "Judicial review",
                "Federalism",
                "Eminent domain"
              ],
              "es": [
                "Soberanía popular",
                "Revisión judicial",
                "Federalismo",
                "Dominio eminente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Popular sovereignty places ultimate authority with the people, expressed through elections.",
              "es": "La soberanía popular sitúa la autoridad última en el pueblo, expresada mediante elecciones."
            }
          },
          {
            "id": "gov102",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which philosopher's natural rights argument most directly shaped the Declaration of Independence?",
              "es": "¿El argumento de derechos naturales de qué filósofo influyó más directamente en la Declaración de Independencia?"
            },
            "c": {
              "en": [
                "John Locke",
                "Karl Marx",
                "Thomas Hobbes",
                "Niccolò Machiavelli"
              ],
              "es": [
                "John Locke",
                "Karl Marx",
                "Thomas Hobbes",
                "Nicolás Maquiavelo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Locke argued people possess life, liberty, and property rights that government must protect.",
              "es": "Locke sostuvo que las personas tienen derechos a la vida, la libertad y la propiedad que el gobierno debe proteger."
            }
          },
          {
            "id": "gov103",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every weakness of the Articles of Confederation.",
              "es": "Selecciona cada debilidad de los Artículos de la Confederación."
            },
            "c": {
              "en": [
                "Congress could not levy taxes",
                "Congress could not regulate interstate trade",
                "There was no national executive to enforce laws",
                "The federal courts could overturn state laws"
              ],
              "es": [
                "El Congreso no podía cobrar impuestos",
                "El Congreso no podía regular el comercio entre estados",
                "No había un ejecutivo nacional que hiciera cumplir las leyes",
                "Los tribunales federales podían anular leyes estatales"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "There was no strong national judiciary under the Articles; that came with the Constitution.",
              "es": "Bajo los Artículos no existía un poder judicial nacional fuerte; eso llegó con la Constitución."
            }
          },
          {
            "id": "gov104",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Federalist 10 argues that the danger of faction is best controlled by:",
              "es": "El Federalista 10 sostiene que el peligro de las facciones se controla mejor mediante:"
            },
            "c": {
              "en": [
                "A large republic with many competing interests",
                "Abolishing political parties by law",
                "Direct democracy in every state",
                "Giving states a veto over federal law"
              ],
              "es": [
                "Una república grande con muchos intereses en competencia",
                "Prohibir los partidos políticos por ley",
                "Democracia directa en cada estado",
                "Dar a los estados veto sobre la ley federal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Madison argued a large republic makes it hard for any one faction to form a lasting majority.",
              "es": "Madison sostuvo que en una república grande es difícil que una facción forme una mayoría duradera."
            }
          },
          {
            "id": "gov105",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which document declared that people may alter or abolish a government that destroys their rights?",
              "es": "¿Qué documento declaró que el pueblo puede cambiar o abolir un gobierno que destruya sus derechos?"
            },
            "c": {
              "en": [
                "The Declaration of Independence",
                "The Mayflower Compact",
                "The Northwest Ordinance",
                "The Emancipation Proclamation"
              ],
              "es": [
                "La Declaración de Independencia",
                "El Pacto del Mayflower",
                "La Ordenanza del Noroeste",
                "La Proclamación de Emancipación"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Declaration lists unalienable rights and the right of the people to change a destructive government.",
              "es": "La Declaración enumera derechos inalienables y el derecho del pueblo a cambiar un gobierno destructivo."
            }
          },
          {
            "id": "gov106",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Anti-Federalists agreed to ratification largely in exchange for:",
              "es": "Los antifederalistas aceptaron la ratificación en gran medida a cambio de:"
            },
            "c": {
              "en": [
                "A promised Bill of Rights",
                "An immediate end to slavery",
                "Direct election of senators",
                "A single-term presidency"
              ],
              "es": [
                "La promesa de una Carta de Derechos",
                "El fin inmediato de la esclavitud",
                "La elección directa de senadores",
                "Una presidencia de un solo mandato"
              ]
            },
            "a": 0,
            "why": {
              "en": "They feared a strong central government would trample individual liberties without written protections.",
              "es": "Temían que un gobierno central fuerte pisoteara las libertades individuales sin protecciones escritas."
            }
          },
          {
            "id": "gov107",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Great Compromise at the Constitutional Convention resolved a dispute over:",
              "es": "El Gran Compromiso en la Convención Constitucional resolvió una disputa sobre:"
            },
            "c": {
              "en": [
                "Representation in Congress",
                "Presidential term limits",
                "The location of the capital",
                "Freedom of the press"
              ],
              "es": [
                "La representación en el Congreso",
                "Los límites del mandato presidencial",
                "La ubicación de la capital",
                "La libertad de prensa"
              ]
            },
            "a": 0,
            "why": {
              "en": "It created a House based on population and a Senate with equal state representation.",
              "es": "Creó una Cámara según la población y un Senado con representación igual por estado."
            }
          },
          {
            "id": "gov108",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A constitutional republic differs from a pure democracy because:",
              "es": "Una república constitucional se diferencia de una democracia pura porque:"
            },
            "c": {
              "en": [
                "Citizens elect representatives who govern under written limits",
                "All citizens vote directly on every law",
                "Only judges make policy",
                "The military selects leaders"
              ],
              "es": [
                "Los ciudadanos eligen representantes que gobiernan bajo límites escritos",
                "Todos votan directamente cada ley",
                "Solo los jueces hacen política",
                "Los militares eligen a los líderes"
              ]
            },
            "a": 0,
            "why": {
              "en": "A republic filters public will through elected representatives bound by a constitution.",
              "es": "Una república canaliza la voluntad pública mediante representantes electos limitados por una constitución."
            }
          },
          {
            "id": "gov109",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "In one sentence, explain the social contract as the Founders understood it.",
              "es": "En una oración, explica el contrato social tal como lo entendían los fundadores."
            },
            "keys": [
              "consent",
              "people",
              "give up",
              "protect",
              "rights",
              "agreement",
              "govern",
              "consentimiento",
              "derechos",
              "proteger",
              "acuerdo"
            ],
            "why": {
              "en": "People consent to be governed in exchange for government protection of their natural rights.",
              "es": "Las personas consienten ser gobernadas a cambio de que el gobierno proteja sus derechos naturales."
            }
          },
          {
            "id": "gov110",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Separation of powers, as described by Montesquieu, means:",
              "es": "La separación de poderes, según Montesquieu, significa:"
            },
            "c": {
              "en": [
                "Dividing government into legislative, executive, and judicial branches",
                "Splitting power between two political parties",
                "Giving each state its own army",
                "Electing judges by popular vote"
              ],
              "es": [
                "Dividir el gobierno en poderes legislativo, ejecutivo y judicial",
                "Repartir el poder entre dos partidos",
                "Dar a cada estado su propio ejército",
                "Elegir jueces por voto popular"
              ]
            },
            "a": 0,
            "why": {
              "en": "Splitting functions among branches prevents any one from accumulating unchecked power.",
              "es": "Dividir funciones entre poderes evita que uno acumule poder sin control."
            }
          }
        ]
      },
      {
        "id": "gov-u2",
        "title": {
          "en": "Unit 2 · The Constitution and Federalism (SS.912.CG.1.5–1.9)",
          "es": "Unidad 2 · La Constitución y el federalismo (SS.912.CG.1.5–1.9)"
        },
        "brief": {
          "en": "The Constitution opens with the Preamble, then Articles I, II, and III creating the legislative, executive, and judicial branches. Article IV covers relations among states, Article V the amendment process, and Article VI the Supremacy Clause. Federalism divides power: delegated powers belong to the national government, reserved powers to the states under the Tenth Amendment, and concurrent powers to both. Checks and balances let each branch limit the others through vetoes, overrides, confirmations, and judicial review. Amendments require two-thirds of both chambers of Congress and ratification by three-fourths of the states.",
          "es": "La Constitución abre con el Preámbulo y luego los Artículos I, II y III crean los poderes legislativo, ejecutivo y judicial. El Artículo IV trata las relaciones entre estados, el V el proceso de enmienda y el VI la Cláusula de Supremacía. El federalismo divide el poder: los poderes delegados son del gobierno nacional, los reservados de los estados según la Décima Enmienda, y los concurrentes de ambos. Los pesos y contrapesos permiten que cada poder limite a los otros mediante vetos, anulaciones, confirmaciones y revisión judicial. Las enmiendas requieren dos tercios de ambas cámaras del Congreso y la ratificación de tres cuartas partes de los estados."
        },
        "items": [
          {
            "id": "gov201",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which article of the Constitution creates the legislative branch?",
              "es": "¿Qué artículo de la Constitución crea el poder legislativo?"
            },
            "c": {
              "en": [
                "Article I",
                "Article II",
                "Article III",
                "Article V"
              ],
              "es": [
                "Artículo I",
                "Artículo II",
                "Artículo III",
                "Artículo V"
              ]
            },
            "a": 0,
            "why": {
              "en": "Article I establishes Congress and lists its enumerated powers.",
              "es": "El Artículo I establece el Congreso y enumera sus poderes."
            }
          },
          {
            "id": "gov202",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Supremacy Clause establishes that:",
              "es": "La Cláusula de Supremacía establece que:"
            },
            "c": {
              "en": [
                "Federal law prevails when it conflicts with state law",
                "States may nullify federal law",
                "The president outranks Congress",
                "Treaties are unconstitutional"
              ],
              "es": [
                "La ley federal prevalece cuando entra en conflicto con la estatal",
                "Los estados pueden anular la ley federal",
                "El presidente está por encima del Congreso",
                "Los tratados son inconstitucionales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Article VI makes the Constitution and federal law the supreme law of the land.",
              "es": "El Artículo VI hace de la Constitución y la ley federal la ley suprema del país."
            }
          },
          {
            "id": "gov203",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every power reserved primarily to the states.",
              "es": "Selecciona cada poder reservado principalmente a los estados."
            },
            "c": {
              "en": [
                "Running elections",
                "Licensing doctors and teachers",
                "Establishing local school systems",
                "Coining money"
              ],
              "es": [
                "Organizar elecciones",
                "Otorgar licencias a médicos y maestros",
                "Establecer sistemas escolares locales",
                "Acuñar moneda"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Coining money is delegated exclusively to the national government.",
              "es": "Acuñar moneda es un poder delegado exclusivamente al gobierno nacional."
            }
          },
          {
            "id": "gov204",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Congress can override a presidential veto with:",
              "es": "El Congreso puede anular un veto presidencial con:"
            },
            "c": {
              "en": [
                "A two-thirds vote in both chambers",
                "A simple majority in the House",
                "A ruling from the Supreme Court",
                "Approval of three-fourths of the states"
              ],
              "es": [
                "Dos tercios de los votos en ambas cámaras",
                "Mayoría simple en la Cámara",
                "Un fallo de la Corte Suprema",
                "La aprobación de tres cuartos de los estados"
              ]
            },
            "a": 0,
            "why": {
              "en": "The two-thirds override is one of Congress's core checks on the executive.",
              "es": "La anulación por dos tercios es uno de los controles clave del Congreso sobre el ejecutivo."
            }
          },
          {
            "id": "gov205",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is a concurrent power?",
              "es": "¿Cuál es un poder concurrente?"
            },
            "c": {
              "en": [
                "Levying taxes",
                "Declaring war",
                "Printing currency",
                "Ratifying treaties"
              ],
              "es": [
                "Cobrar impuestos",
                "Declarar la guerra",
                "Imprimir moneda",
                "Ratificar tratados"
              ]
            },
            "a": 0,
            "why": {
              "en": "Both national and state governments may tax; the other powers are federal only.",
              "es": "Tanto el gobierno nacional como los estatales pueden cobrar impuestos; los demás son solo federales."
            }
          },
          {
            "id": "gov206",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "An amendment is proposed by two-thirds of Congress. Ratification then requires approval by:",
              "es": "Una enmienda es propuesta por dos tercios del Congreso. La ratificación requiere después la aprobación de:"
            },
            "c": {
              "en": [
                "Three-fourths of the states",
                "A majority of voters nationwide",
                "The Supreme Court",
                "The president alone"
              ],
              "es": [
                "Tres cuartas partes de los estados",
                "Una mayoría de votantes a nivel nacional",
                "La Corte Suprema",
                "El presidente por sí solo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Article V requires ratification by 38 of the 50 state legislatures or conventions.",
              "es": "El Artículo V exige la ratificación de 38 de las 50 legislaturas o convenciones estatales."
            }
          },
          {
            "id": "gov207",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Necessary and Proper Clause is significant because it:",
              "es": "La Cláusula de lo Necesario y Adecuado es importante porque:"
            },
            "c": {
              "en": [
                "Lets Congress pass laws to carry out its enumerated powers",
                "Gives states veto power",
                "Limits Congress to only listed powers",
                "Creates the federal courts"
              ],
              "es": [
                "Permite al Congreso aprobar leyes para ejercer sus poderes enumerados",
                "Da a los estados poder de veto",
                "Limita al Congreso solo a los poderes listados",
                "Crea los tribunales federales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Also called the elastic clause, it is the basis for implied powers.",
              "es": "También llamada cláusula elástica, es la base de los poderes implícitos."
            }
          },
          {
            "id": "gov208",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every example of a check on the judicial branch.",
              "es": "Selecciona cada ejemplo de control sobre el poder judicial."
            },
            "c": {
              "en": [
                "The president nominates federal judges",
                "The Senate confirms or rejects nominees",
                "Congress can impeach and remove judges",
                "The Court can veto a bill"
              ],
              "es": [
                "El presidente nomina jueces federales",
                "El Senado confirma o rechaza a los nominados",
                "El Congreso puede acusar y destituir jueces",
                "La Corte puede vetar un proyecto de ley"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Courts do not veto bills; the veto belongs to the president.",
              "es": "Los tribunales no vetan leyes; el veto corresponde al presidente."
            }
          },
          {
            "id": "gov209",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain federalism in one sentence.",
              "es": "Explica el federalismo en una oración."
            },
            "keys": [
              "divide",
              "shared",
              "between",
              "national",
              "state",
              "levels",
              "divid",
              "compart",
              "estatal",
              "nacional",
              "niveles"
            ],
            "why": {
              "en": "Federalism divides governing power between a national government and the states.",
              "es": "El federalismo divide el poder de gobierno entre un gobierno nacional y los estados."
            }
          },
          {
            "id": "gov210",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Preamble's phrase 'We the People' signals that authority rests with:",
              "es": "La frase del Preámbulo 'Nosotros el Pueblo' señala que la autoridad reside en:"
            },
            "c": {
              "en": [
                "The citizens of the nation",
                "The state legislatures",
                "The Congress",
                "The president"
              ],
              "es": [
                "Los ciudadanos de la nación",
                "Las legislaturas estatales",
                "El Congreso",
                "El presidente"
              ]
            },
            "a": 0,
            "why": {
              "en": "The opening words assert that the people, not the states or a ruler, establish the government.",
              "es": "Las palabras iniciales afirman que el pueblo, no los estados ni un gobernante, establece el gobierno."
            }
          }
        ]
      },
      {
        "id": "gov-u3",
        "title": {
          "en": "Unit 3 · The Three Branches at Work",
          "es": "Unidad 3 · Los tres poderes en acción"
        },
        "brief": {
          "en": "Congress has two chambers: the House with 435 members serving two-year terms and the Senate with 100 members serving six-year terms. A bill must pass both chambers in identical form before going to the president, who signs or vetoes it. The president serves as chief executive, commander in chief, and chief diplomat, and issues executive orders that carry the force of law without congressional approval. The federal courts interpret law, and Marbury v. Madison established judicial review, the power to strike down unconstitutional acts. The Senate confirms appointments and ratifies treaties by a two-thirds vote.",
          "es": "El Congreso tiene dos cámaras: la Cámara de Representantes con 435 miembros por dos años y el Senado con 100 miembros por seis. Un proyecto debe aprobarse en ambas cámaras con el mismo texto antes de pasar al presidente, que lo firma o lo veta. El presidente es jefe del ejecutivo, comandante en jefe y jefe diplomático, y emite órdenes ejecutivas con fuerza de ley sin aprobación del Congreso. Los tribunales federales interpretan la ley, y Marbury contra Madison estableció la revisión judicial, el poder de anular actos inconstitucionales. El Senado confirma nombramientos y ratifica tratados por dos tercios de los votos."
        },
        "items": [
          {
            "id": "gov301",
            "type": "numeric",
            "diff": 1,
            "q": {
              "en": "How many voting members serve in the U.S. House of Representatives?",
              "es": "¿Cuántos miembros con voto tiene la Cámara de Representantes de EE. UU.?"
            },
            "a": 435,
            "tol": 0,
            "why": {
              "en": "The House has been fixed at 435 voting members since 1929.",
              "es": "La Cámara está fijada en 435 miembros con voto desde 1929."
            }
          },
          {
            "id": "gov302",
            "type": "numeric",
            "diff": 1,
            "q": {
              "en": "How many years are in a U.S. senator's term?",
              "es": "¿Cuántos años dura el mandato de un senador de EE. UU.?"
            },
            "a": 6,
            "tol": 0,
            "why": {
              "en": "Senators serve six-year terms, with about a third of seats up every two years.",
              "es": "Los senadores sirven seis años, y cerca de un tercio de los escaños se renueva cada dos."
            }
          },
          {
            "id": "gov303",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Marbury v. Madison established the principle of:",
              "es": "Marbury contra Madison estableció el principio de:"
            },
            "c": {
              "en": [
                "Judicial review",
                "Executive privilege",
                "Federal supremacy over trade",
                "One person, one vote"
              ],
              "es": [
                "Revisión judicial",
                "Privilegio ejecutivo",
                "Supremacía federal sobre el comercio",
                "Una persona, un voto"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Court claimed the power to declare acts of Congress unconstitutional.",
              "es": "La Corte se atribuyó el poder de declarar inconstitucionales las leyes del Congreso."
            }
          },
          {
            "id": "gov304",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An executive order is best described as:",
              "es": "Una orden ejecutiva se describe mejor como:"
            },
            "c": {
              "en": [
                "A presidential directive with the force of law that Congress did not pass",
                "A law passed by both chambers",
                "A Supreme Court ruling",
                "A state governor's proclamation"
              ],
              "es": [
                "Una directiva presidencial con fuerza de ley que el Congreso no aprobó",
                "Una ley aprobada por ambas cámaras",
                "Un fallo de la Corte Suprema",
                "Una proclamación de un gobernador"
              ]
            },
            "a": 0,
            "why": {
              "en": "Executive orders direct the executive branch and can be reversed by later presidents or courts.",
              "es": "Las órdenes ejecutivas dirigen al poder ejecutivo y pueden revertirlas presidentes posteriores o los tribunales."
            }
          },
          {
            "id": "gov305",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Which chamber holds the sole power to impeach a federal official?",
              "es": "¿Qué cámara tiene el poder exclusivo de acusar (impeach) a un funcionario federal?"
            },
            "c": {
              "en": [
                "The House of Representatives",
                "The Senate",
                "The Supreme Court",
                "The Electoral College"
              ],
              "es": [
                "La Cámara de Representantes",
                "El Senado",
                "La Corte Suprema",
                "El Colegio Electoral"
              ]
            },
            "a": 0,
            "why": {
              "en": "The House impeaches by majority vote; the Senate then holds the trial.",
              "es": "La Cámara acusa por mayoría simple; el Senado luego celebra el juicio."
            }
          },
          {
            "id": "gov306",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Conviction and removal after impeachment requires:",
              "es": "La condena y destitución tras el impeachment requiere:"
            },
            "c": {
              "en": [
                "A two-thirds vote of the Senate",
                "A simple majority of the Senate",
                "A unanimous Supreme Court",
                "Approval by the states"
              ],
              "es": [
                "Dos tercios de los votos del Senado",
                "Mayoría simple del Senado",
                "Unanimidad de la Corte Suprema",
                "La aprobación de los estados"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Constitution sets a deliberately high bar of two-thirds for removal.",
              "es": "La Constitución fija deliberadamente un umbral alto de dos tercios para destituir."
            }
          },
          {
            "id": "gov307",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every formal role of the president.",
              "es": "Selecciona cada función formal del presidente."
            },
            "c": {
              "en": [
                "Commander in chief",
                "Chief diplomat",
                "Chief executive",
                "Chief justice"
              ],
              "es": [
                "Comandante en jefe",
                "Jefe diplomático",
                "Jefe del ejecutivo",
                "Presidente de la Corte Suprema"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "The chief justice heads the Supreme Court, a separate branch.",
              "es": "El presidente de la Corte Suprema encabeza el poder judicial, un poder separado."
            }
          },
          {
            "id": "gov308",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A bill passes the House but is changed in the Senate. What must happen next?",
              "es": "Un proyecto pasa la Cámara pero se modifica en el Senado. ¿Qué debe ocurrir después?"
            },
            "c": {
              "en": [
                "The chambers must agree on identical text before it reaches the president",
                "It goes straight to the president",
                "The Supreme Court decides the wording",
                "It becomes law automatically"
              ],
              "es": [
                "Las cámaras deben acordar un texto idéntico antes de llegar al presidente",
                "Va directo al presidente",
                "La Corte Suprema decide la redacción",
                "Se convierte en ley automáticamente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Differences are resolved, often in conference committee, before final passage.",
              "es": "Las diferencias se resuelven, a menudo en comité de conferencia, antes de la aprobación final."
            }
          },
          {
            "id": "gov309",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Treaties negotiated by the president take effect only after:",
              "es": "Los tratados negociados por el presidente entran en vigor solo después de:"
            },
            "c": {
              "en": [
                "The Senate ratifies them by a two-thirds vote",
                "The House votes to fund them",
                "A national referendum",
                "A Supreme Court review"
              ],
              "es": [
                "Que el Senado los ratifique por dos tercios",
                "Que la Cámara vote su financiamiento",
                "Un referéndum nacional",
                "Una revisión de la Corte Suprema"
              ]
            },
            "a": 0,
            "why": {
              "en": "Senate ratification is a check on presidential control of foreign policy.",
              "es": "La ratificación del Senado es un control sobre el manejo presidencial de la política exterior."
            }
          },
          {
            "id": "gov310",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain one way the judicial branch checks the legislative branch.",
              "es": "Explica una forma en que el poder judicial controla al legislativo."
            },
            "keys": [
              "unconstitutional",
              "strike",
              "judicial review",
              "overturn",
              "invalid",
              "inconstitucional",
              "anular",
              "revisión judicial",
              "invalid"
            ],
            "why": {
              "en": "Through judicial review the courts can strike down a law as unconstitutional.",
              "es": "Mediante la revisión judicial los tribunales pueden anular una ley por inconstitucional."
            }
          }
        ]
      },
      {
        "id": "gov-u4",
        "title": {
          "en": "Unit 4 · Citizenship, Elections, Participation (SS.912.CG.2)",
          "es": "Unidad 4 · Ciudadanía, elecciones y participación (SS.912.CG.2)"
        },
        "brief": {
          "en": "Citizenship comes by birth or through naturalization, which requires lawful residency, an English and civics exam, and an oath of allegiance. Citizens hold both rights and responsibilities: voting, serving on juries, paying taxes, obeying the law, and registering for selective service. Primary elections narrow the field within a party; general elections decide the office. The Electoral College awards 538 votes based on congressional representation, and 270 are needed to win the presidency. Interest groups, political parties, and the media shape opinion, while citizens influence policy by contacting officials, petitioning, and running for office.",
          "es": "La ciudadanía se obtiene por nacimiento o por naturalización, que exige residencia legal, un examen de inglés y civismo y un juramento de lealtad. Los ciudadanos tienen derechos y responsabilidades: votar, servir en jurados, pagar impuestos, obedecer la ley e inscribirse en el servicio selectivo. Las elecciones primarias reducen los candidatos dentro de un partido; las generales deciden el cargo. El Colegio Electoral reparte 538 votos según la representación en el Congreso, y se necesitan 270 para ganar la presidencia. Los grupos de interés, los partidos y los medios moldean la opinión, mientras los ciudadanos influyen contactando a funcionarios, firmando peticiones y postulándose."
        },
        "items": [
          {
            "id": "gov401",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "How many electoral votes are needed to win the presidency?",
              "es": "¿Cuántos votos electorales se necesitan para ganar la presidencia?"
            },
            "a": 270,
            "tol": 0,
            "why": {
              "en": "A majority of the 538 electoral votes is 270.",
              "es": "La mayoría de los 538 votos electorales es 270."
            }
          },
          {
            "id": "gov402",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which is a responsibility of citizenship rather than a right?",
              "es": "¿Cuál es una responsabilidad de la ciudadanía y no un derecho?"
            },
            "c": {
              "en": [
                "Serving on a jury when called",
                "Speaking freely",
                "Practicing a religion",
                "Petitioning the government"
              ],
              "es": [
                "Servir en un jurado cuando se le convoca",
                "Hablar libremente",
                "Practicar una religión",
                "Peticionar al gobierno"
              ]
            },
            "a": 0,
            "why": {
              "en": "Jury duty is an obligation citizens owe the system that protects their rights.",
              "es": "El deber de jurado es una obligación que los ciudadanos deben al sistema que protege sus derechos."
            }
          },
          {
            "id": "gov403",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The main purpose of a primary election is to:",
              "es": "El propósito principal de una elección primaria es:"
            },
            "c": {
              "en": [
                "Choose a party's nominee for the general election",
                "Fill the office immediately",
                "Amend the state constitution",
                "Select judges by lottery"
              ],
              "es": [
                "Elegir al candidato de un partido para la elección general",
                "Ocupar el cargo de inmediato",
                "Enmendar la constitución estatal",
                "Elegir jueces por sorteo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Primaries narrow each party's field before voters decide the office in November.",
              "es": "Las primarias reducen los aspirantes de cada partido antes de la elección general."
            }
          },
          {
            "id": "gov404",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every requirement for naturalization as a U.S. citizen.",
              "es": "Selecciona cada requisito para naturalizarse como ciudadano de EE. UU."
            },
            "c": {
              "en": [
                "A period of lawful permanent residency",
                "Passing an English and civics test",
                "Taking an oath of allegiance",
                "Owning property"
              ],
              "es": [
                "Un período de residencia permanente legal",
                "Aprobar un examen de inglés y civismo",
                "Prestar juramento de lealtad",
                "Ser propietario de bienes"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Property ownership has never been a requirement for naturalization.",
              "es": "Ser propietario nunca ha sido requisito para la naturalización."
            }
          },
          {
            "id": "gov405",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Twenty-Sixth Amendment lowered the voting age to:",
              "es": "La Vigesimosexta Enmienda bajó la edad para votar a:"
            },
            "c": {
              "en": [
                "18",
                "21",
                "16",
                "25"
              ],
              "es": [
                "18",
                "21",
                "16",
                "25"
              ]
            },
            "a": 0,
            "why": {
              "en": "Ratified in 1971, it set the national voting age at eighteen.",
              "es": "Ratificada en 1971, fijó la edad nacional para votar en dieciocho años."
            }
          },
          {
            "id": "gov406",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A state gains population in the census. The most direct effect is:",
              "es": "Un estado gana población en el censo. El efecto más directo es:"
            },
            "c": {
              "en": [
                "It may gain House seats and electoral votes",
                "It gains extra senators",
                "Its governor gains veto power",
                "Its courts gain jurisdiction"
              ],
              "es": [
                "Puede ganar escaños en la Cámara y votos electorales",
                "Gana senadores adicionales",
                "Su gobernador gana poder de veto",
                "Sus tribunales ganan jurisdicción"
              ]
            },
            "a": 0,
            "why": {
              "en": "House seats are apportioned by population, and electoral votes follow congressional totals.",
              "es": "Los escaños de la Cámara se reparten por población y los votos electorales siguen esa suma."
            }
          },
          {
            "id": "gov407",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Interest groups most commonly influence policy by:",
              "es": "Los grupos de interés influyen en la política más comúnmente al:"
            },
            "c": {
              "en": [
                "Lobbying officials and funding campaigns",
                "Writing court opinions",
                "Appointing cabinet members",
                "Certifying election results"
              ],
              "es": [
                "Presionar a funcionarios y financiar campañas",
                "Redactar fallos judiciales",
                "Nombrar miembros del gabinete",
                "Certificar resultados electorales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Lobbying and campaign support are their main legal channels of influence.",
              "es": "El cabildeo y el apoyo a campañas son sus principales vías legales de influencia."
            }
          },
          {
            "id": "gov408",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which action is an example of direct civic participation at the local level?",
              "es": "¿Qué acción es un ejemplo de participación cívica directa a nivel local?"
            },
            "c": {
              "en": [
                "Speaking at a city council meeting",
                "Reading a national newspaper",
                "Watching a debate on television",
                "Following a senator online"
              ],
              "es": [
                "Hablar en una reunión del concejo municipal",
                "Leer un periódico nacional",
                "Ver un debate en televisión",
                "Seguir a un senador en línea"
              ]
            },
            "a": 0,
            "why": {
              "en": "Direct participation means acting to influence a decision, not just consuming information.",
              "es": "La participación directa implica actuar para influir en una decisión, no solo informarse."
            }
          },
          {
            "id": "gov409",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Give one argument critics make against the Electoral College.",
              "es": "Da un argumento que los críticos hacen contra el Colegio Electoral."
            },
            "keys": [
              "popular vote",
              "lose",
              "swing",
              "small states",
              "overrepresent",
              "equal",
              "voto popular",
              "estados pequeños",
              "sobrerrepresent",
              "igual"
            ],
            "why": {
              "en": "A candidate can win the presidency without winning the national popular vote.",
              "es": "Un candidato puede ganar la presidencia sin ganar el voto popular nacional."
            }
          },
          {
            "id": "gov410",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Political parties primarily serve to:",
              "es": "Los partidos políticos sirven principalmente para:"
            },
            "c": {
              "en": [
                "Organize voters and nominate candidates",
                "Write Supreme Court rulings",
                "Run the census",
                "Certify naturalization"
              ],
              "es": [
                "Organizar a los votantes y nominar candidatos",
                "Redactar fallos de la Corte Suprema",
                "Administrar el censo",
                "Certificar la naturalización"
              ]
            },
            "a": 0,
            "why": {
              "en": "Parties recruit candidates, organize campaigns, and simplify choices for voters.",
              "es": "Los partidos reclutan candidatos, organizan campañas y simplifican las opciones del votante."
            }
          }
        ]
      },
      {
        "id": "gov-u5",
        "title": {
          "en": "Unit 5 · Rights, Landmark Cases, World Systems (SS.912.CG.3–4)",
          "es": "Unidad 5 · Derechos, casos históricos y sistemas mundiales (SS.912.CG.3–4)"
        },
        "brief": {
          "en": "The Bill of Rights protects speech, religion, press, assembly, and petition in the First Amendment, due process in the Fifth, and a fair trial in the Sixth. The Fourteenth Amendment applies most of these protections to the states through incorporation. Landmark rulings define the limits: Brown v. Board ended school segregation, Gideon v. Wainwright guaranteed counsel, Tinker v. Des Moines protected student speech that does not disrupt school, and Miranda v. Arizona required warnings before custodial questioning. Compared with a constitutional republic, an authoritarian or communist system concentrates power, restricts speech, and eliminates competitive elections.",
          "es": "La Carta de Derechos protege la expresión, la religión, la prensa, la reunión y la petición en la Primera Enmienda, el debido proceso en la Quinta y un juicio justo en la Sexta. La Decimocuarta Enmienda aplica la mayoría de estas protecciones a los estados mediante la incorporación. Fallos históricos definen los límites: Brown contra el Consejo terminó la segregación escolar, Gideon contra Wainwright garantizó abogado, Tinker contra Des Moines protegió la expresión estudiantil que no interrumpe la escuela y Miranda contra Arizona exigió advertencias antes del interrogatorio bajo custodia. Frente a una república constitucional, un sistema autoritario o comunista concentra el poder, restringe la expresión y elimina las elecciones competitivas."
        },
        "items": [
          {
            "id": "gov501",
            "type": "multi",
            "diff": 1,
            "q": {
              "en": "Select every freedom protected by the First Amendment.",
              "es": "Selecciona cada libertad protegida por la Primera Enmienda."
            },
            "c": {
              "en": [
                "Speech",
                "Religion",
                "Assembly",
                "Trial by jury"
              ],
              "es": [
                "Expresión",
                "Religión",
                "Reunión",
                "Juicio por jurado"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Trial by jury is protected by the Sixth and Seventh Amendments.",
              "es": "El juicio por jurado está protegido por las Enmiendas Sexta y Séptima."
            }
          },
          {
            "id": "gov502",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Brown v. Board of Education (1954) held that:",
              "es": "Brown contra el Consejo de Educación (1954) sostuvo que:"
            },
            "c": {
              "en": [
                "Segregated public schools are inherently unequal",
                "Students may not protest at school",
                "Police must give warnings",
                "States may ban interstate trade"
              ],
              "es": [
                "Las escuelas públicas segregadas son intrínsecamente desiguales",
                "Los estudiantes no pueden protestar en la escuela",
                "La policía debe dar advertencias",
                "Los estados pueden prohibir el comercio interestatal"
              ]
            },
            "a": 0,
            "why": {
              "en": "The ruling overturned the separate-but-equal doctrine in public education.",
              "es": "El fallo revocó la doctrina de 'separados pero iguales' en la educación pública."
            }
          },
          {
            "id": "gov503",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Gideon v. Wainwright guaranteed that defendants who cannot afford a lawyer:",
              "es": "Gideon contra Wainwright garantizó que los acusados que no pueden pagar un abogado:"
            },
            "c": {
              "en": [
                "Must be provided one by the state",
                "Must represent themselves",
                "Receive a reduced sentence",
                "Are released immediately"
              ],
              "es": [
                "Deben recibir uno del estado",
                "Deben representarse a sí mismos",
                "Reciben una sentencia reducida",
                "Son liberados de inmediato"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Sixth Amendment right to counsel applies to state felony trials.",
              "es": "El derecho a un abogado de la Sexta Enmienda aplica a los juicios estatales por delitos graves."
            }
          },
          {
            "id": "gov504",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Tinker v. Des Moines protected student expression as long as it:",
              "es": "Tinker contra Des Moines protegió la expresión estudiantil siempre que:"
            },
            "c": {
              "en": [
                "Does not substantially disrupt school operations",
                "Is approved by the principal",
                "Happens off campus only",
                "Concerns school policy only"
              ],
              "es": [
                "No interrumpa sustancialmente el funcionamiento escolar",
                "Sea aprobada por el director",
                "Ocurra solo fuera del campus",
                "Trate solo de política escolar"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Court said students do not shed their rights at the schoolhouse gate.",
              "es": "La Corte dijo que los estudiantes no pierden sus derechos en la puerta de la escuela."
            }
          },
          {
            "id": "gov505",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Miranda v. Arizona requires police to:",
              "es": "Miranda contra Arizona exige que la policía:"
            },
            "c": {
              "en": [
                "Inform suspects of their rights before custodial questioning",
                "Obtain a warrant for every arrest",
                "Provide a jury within 24 hours",
                "Record all traffic stops"
              ],
              "es": [
                "Informe a los sospechosos de sus derechos antes del interrogatorio bajo custodia",
                "Obtenga una orden para cada arresto",
                "Provea un jurado en 24 horas",
                "Grabe todas las paradas de tráfico"
              ]
            },
            "a": 0,
            "why": {
              "en": "The warning protects the Fifth Amendment right against self-incrimination.",
              "es": "La advertencia protege el derecho de la Quinta Enmienda a no autoincriminarse."
            }
          },
          {
            "id": "gov506",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Incorporation through the Fourteenth Amendment means that:",
              "es": "La incorporación mediante la Decimocuarta Enmienda significa que:"
            },
            "c": {
              "en": [
                "Most Bill of Rights protections apply to state governments",
                "Only Congress is limited by the Bill of Rights",
                "States may write their own bills of rights instead",
                "Federal law no longer applies in states"
              ],
              "es": [
                "La mayoría de las protecciones de la Carta de Derechos aplican a los estados",
                "Solo el Congreso está limitado por la Carta de Derechos",
                "Los estados pueden escribir su propia carta en su lugar",
                "La ley federal ya no aplica en los estados"
              ]
            },
            "a": 0,
            "why": {
              "en": "Due process incorporation extended federal protections against state action.",
              "es": "La incorporación por debido proceso extendió las protecciones federales frente a los estados."
            }
          },
          {
            "id": "gov507",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which feature distinguishes a constitutional republic from an authoritarian regime?",
              "es": "¿Qué rasgo distingue a una república constitucional de un régimen autoritario?"
            },
            "c": {
              "en": [
                "Competitive elections and protected dissent",
                "A written flag code",
                "A national anthem",
                "A single capital city"
              ],
              "es": [
                "Elecciones competitivas y disenso protegido",
                "Un código de bandera escrito",
                "Un himno nacional",
                "Una sola ciudad capital"
              ]
            },
            "a": 0,
            "why": {
              "en": "Authoritarian systems concentrate power and suppress opposition and free speech.",
              "es": "Los sistemas autoritarios concentran el poder y suprimen la oposición y la libre expresión."
            }
          },
          {
            "id": "gov508",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "In a command economy under a communist system, most production decisions are made by:",
              "es": "En una economía centralizada bajo un sistema comunista, la mayoría de las decisiones de producción las toma:"
            },
            "c": {
              "en": [
                "Central government planners",
                "Individual consumers",
                "Independent private firms",
                "Local stock exchanges"
              ],
              "es": [
                "Los planificadores del gobierno central",
                "Los consumidores individuales",
                "Empresas privadas independientes",
                "Las bolsas de valores locales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Central planning replaces market prices with state allocation of resources.",
              "es": "La planificación central sustituye los precios de mercado por la asignación estatal de recursos."
            }
          },
          {
            "id": "gov509",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A primary goal of U.S. foreign policy is to:",
              "es": "Un objetivo principal de la política exterior de EE. UU. es:"
            },
            "c": {
              "en": [
                "Protect national security and economic interests",
                "Set state property tax rates",
                "Certify local elections",
                "License in-state businesses"
              ],
              "es": [
                "Proteger la seguridad nacional y los intereses económicos",
                "Fijar impuestos estatales a la propiedad",
                "Certificar elecciones locales",
                "Otorgar licencias a negocios estatales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Foreign policy deals with relations abroad, not domestic administration.",
              "es": "La política exterior trata las relaciones con el exterior, no la administración interna."
            }
          },
          {
            "id": "gov510",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Name one limit the Supreme Court has placed on free speech, and why.",
              "es": "Nombra un límite que la Corte Suprema ha puesto a la libertad de expresión, y por qué."
            },
            "keys": [
              "threat",
              "incit",
              "danger",
              "disrupt",
              "defam",
              "libel",
              "violence",
              "harm",
              "amenaza",
              "incit",
              "peligro",
              "interrump",
              "difam",
              "violencia",
              "daño"
            ],
            "why": {
              "en": "Speech that incites imminent lawless action or substantially disrupts school can be limited.",
              "es": "Se puede limitar la expresión que incita a la violencia inminente o interrumpe sustancialmente la escuela."
            }
          }
        ]
      },
      {
        "id": "gov-u6",
        "title": {
          "en": "Unit 6 · Smith Island Scenarios",
          "es": "Unidad 6 · Escenarios de la Isla Smith"
        },
        "brief": {
          "en": "You have been hired to build a government for Smith Island, and Coach Smith wants to run it his way. Every scenario here puts a real constitutional principle into that story: limits on power from the Magna Carta forward, the failure of the Articles of Confederation, how a bill survives a veto, how districts get drawn, what the Bill of Rights stops a ruler from doing, and how courts, voters, interest groups, and the media check whoever is in charge. Answer as the island's constitutional adviser: the correct answer is always the one that keeps power divided and rights protected.",
          "es": "Te contrataron para construir un gobierno en la Isla Smith, y Coach Smith quiere dirigirlo a su manera. Cada escenario aquí pone un principio constitucional real dentro de esa historia: los límites al poder desde la Carta Magna, el fracaso de los Artículos de la Confederación, cómo un proyecto sobrevive a un veto, cómo se trazan los distritos, qué le impide hacer al gobernante la Carta de Derechos y cómo los tribunales, los votantes, los grupos de interés y los medios controlan a quien manda. Responde como asesor constitucional de la isla: la respuesta correcta siempre es la que mantiene el poder dividido y los derechos protegidos."
        },
        "items": [
          {
            "id": "si01",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Islanders hand Coach Smith a document forcing him to follow the law, the way King John was forced to limit his own power in 1215. What is the model?",
              "es": "Los isleños entregan a Coach Smith un documento que lo obliga a cumplir la ley, como se obligó al rey Juan a limitar su poder en 1215. ¿Cuál es el modelo?"
            },
            "c": {
              "en": [
                "The Magna Carta",
                "The Mayflower Compact",
                "Common Sense",
                "The Northwest Ordinance"
              ],
              "es": [
                "La Carta Magna",
                "El Pacto del Mayflower",
                "El Sentido Común",
                "La Ordenanza del Noroeste"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Magna Carta established that even a ruler is bound by law.",
              "es": "La Carta Magna estableció que incluso el gobernante está sujeto a la ley."
            }
          },
          {
            "id": "si02",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Coach Smith reads a pamphlet that convinces the island to break from the mainland. Who wrote 'Common Sense'?",
              "es": "Coach Smith lee un panfleto que convence a la isla de separarse del continente. ¿Quién escribió 'El Sentido Común'?"
            },
            "c": {
              "en": [
                "Thomas Paine",
                "Thomas Jefferson",
                "Alexander Hamilton",
                "James Madison"
              ],
              "es": [
                "Thomas Paine",
                "Thomas Jefferson",
                "Alexander Hamilton",
                "James Madison"
              ]
            },
            "a": 0,
            "why": {
              "en": "Paine's 1776 pamphlet pushed ordinary colonists toward independence.",
              "es": "El panfleto de Paine de 1776 empujó a los colonos comunes hacia la independencia."
            }
          },
          {
            "id": "si03",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Citizens insist their rights to life, liberty, and property are unalienable; Coach Smith says he grants those rights. Who is right, per the Declaration?",
              "es": "Los ciudadanos insisten en que sus derechos a la vida, la libertad y la propiedad son inalienables; Coach Smith dice que él los concede. Según la Declaración, ¿quién tiene razón?"
            },
            "c": {
              "en": [
                "The citizens — rights are not given by rulers",
                "Coach Smith — government grants all rights",
                "Neither — rights are earned by paying taxes",
                "Both share ownership of rights"
              ],
              "es": [
                "Los ciudadanos: los derechos no los otorga el gobernante",
                "Coach Smith: el gobierno concede todos los derechos",
                "Ninguno: los derechos se ganan pagando impuestos",
                "Ambos comparten los derechos"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Declaration treats rights as inherent, which is why government may not remove them.",
              "es": "La Declaración considera los derechos como inherentes, por eso el gobierno no puede quitarlos."
            }
          },
          {
            "id": "si04",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Your first island charter leaves Coach Smith unable to collect taxes or enforce laws. Which failed U.S. framework does it copy?",
              "es": "Tu primera carta isleña deja a Coach Smith sin poder cobrar impuestos ni hacer cumplir leyes. ¿Qué marco estadounidense fallido copia?"
            },
            "c": {
              "en": [
                "The Articles of Confederation",
                "The Bill of Rights",
                "The Federalist Papers",
                "The Virginia Declaration"
              ],
              "es": [
                "Los Artículos de la Confederación",
                "La Carta de Derechos",
                "Los Papeles Federalistas",
                "La Declaración de Virginia"
              ]
            },
            "a": 0,
            "why": {
              "en": "Under the Articles the national government had no taxing or enforcement power.",
              "es": "Bajo los Artículos el gobierno nacional no tenía poder de recaudar ni de hacer cumplir."
            }
          },
          {
            "id": "si05",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Coach Smith creates an island bank even though the charter never mentions banks, citing the Necessary and Proper Clause. These powers are:",
              "es": "Coach Smith crea un banco isleño aunque la carta no menciona bancos, citando la Cláusula de lo Necesario y Adecuado. Esos poderes son:"
            },
            "c": {
              "en": [
                "Implied powers",
                "Expressed powers",
                "Reserved powers",
                "Inherent powers"
              ],
              "es": [
                "Poderes implícitos",
                "Poderes expresos",
                "Poderes reservados",
                "Poderes inherentes"
              ]
            },
            "a": 0,
            "why": {
              "en": "Implied powers are not listed but are reasonably needed to carry out listed ones.",
              "es": "Los poderes implícitos no están listados pero son necesarios para ejercer los que sí lo están."
            }
          },
          {
            "id": "si06",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Which case upheld exactly that reasoning when a state tried to tax the national bank?",
              "es": "¿Qué caso confirmó ese razonamiento cuando un estado intentó gravar al banco nacional?"
            },
            "c": {
              "en": [
                "McCulloch v. Maryland",
                "Marbury v. Madison",
                "Gibbons v. Ogden",
                "Plessy v. Ferguson"
              ],
              "es": [
                "McCulloch contra Maryland",
                "Marbury contra Madison",
                "Gibbons contra Ogden",
                "Plessy contra Ferguson"
              ]
            },
            "a": 0,
            "why": {
              "en": "McCulloch confirmed implied powers and federal supremacy over conflicting state taxes.",
              "es": "McCulloch confirmó los poderes implícitos y la supremacía federal sobre impuestos estatales contrarios."
            }
          },
          {
            "id": "si07",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The island legislature passes a budget Coach Smith hates and he refuses to sign it. This power is a:",
              "es": "La legislatura isleña aprueba un presupuesto que Coach Smith detesta y se niega a firmarlo. Ese poder es un:"
            },
            "c": {
              "en": [
                "Veto",
                "Filibuster",
                "Pardon",
                "Writ"
              ],
              "es": [
                "Veto",
                "Obstruccionismo",
                "Indulto",
                "Auto judicial"
              ]
            },
            "a": 0,
            "why": {
              "en": "A veto rejects a bill and sends it back to the legislature.",
              "es": "El veto rechaza un proyecto y lo devuelve a la legislatura."
            }
          },
          {
            "id": "si08",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A senator on the island talks for fourteen straight hours to stall a vote. This delay tactic is a:",
              "es": "Un senador de la isla habla catorce horas seguidas para retrasar una votación. Esa táctica es un:"
            },
            "c": {
              "en": [
                "Filibuster",
                "Cloture",
                "Quorum call",
                "Pocket veto"
              ],
              "es": [
                "Obstruccionismo (filibuster)",
                "Clausura",
                "Llamado a quórum",
                "Veto de bolsillo"
              ]
            },
            "a": 0,
            "why": {
              "en": "A filibuster stalls debate; cloture is the vote that ends one.",
              "es": "El filibuster retrasa el debate; la clausura es el voto que lo termina."
            }
          },
          {
            "id": "si09",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Coach Smith redraws island voting districts so his party is guaranteed to win. This practice is:",
              "es": "Coach Smith redibuja los distritos de la isla para que su partido gane siempre. Esa práctica es:"
            },
            "c": {
              "en": [
                "Gerrymandering",
                "Reapportionment",
                "Cloture",
                "Logrolling"
              ],
              "es": [
                "Manipulación de distritos (gerrymandering)",
                "Reasignación",
                "Clausura",
                "Intercambio de favores"
              ]
            },
            "a": 0,
            "why": {
              "en": "Gerrymandering draws boundaries to favor one party rather than to reflect voters fairly.",
              "es": "El gerrymandering traza límites para favorecer a un partido en vez de reflejar al electorado."
            }
          },
          {
            "id": "si10",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The island congress has a chamber based on population and a chamber with equal representation. This structure is:",
              "es": "El congreso isleño tiene una cámara por población y otra con representación igual. Esa estructura es:"
            },
            "c": {
              "en": [
                "Bicameral",
                "Unicameral",
                "Parliamentary",
                "Confederal"
              ],
              "es": [
                "Bicameral",
                "Unicameral",
                "Parlamentaria",
                "Confederal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Two chambers with different bases of representation is the Great Compromise design.",
              "es": "Dos cámaras con bases distintas de representación es el diseño del Gran Compromiso."
            }
          },
          {
            "id": "si11",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A hurricane hits. Rather than wait for the legislature, Coach Smith issues a directive with the force of law. That is an:",
              "es": "Llega un huracán. En vez de esperar a la legislatura, Coach Smith emite una directiva con fuerza de ley. Eso es una:"
            },
            "c": {
              "en": [
                "Executive order",
                "Executive privilege",
                "Amnesty",
                "Impeachment"
              ],
              "es": [
                "Orden ejecutiva",
                "Privilegio ejecutivo",
                "Amnistía",
                "Acusación (impeachment)"
              ]
            },
            "a": 0,
            "why": {
              "en": "Executive orders direct the executive branch and can be undone by courts or a later leader.",
              "es": "Las órdenes ejecutivas dirigen al ejecutivo y pueden anularlas los tribunales o un sucesor."
            }
          },
          {
            "id": "si12",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Coach Smith appoints an island judge, but the senate must approve. That senate power is:",
              "es": "Coach Smith nombra a un juez isleño, pero el senado debe aprobarlo. Ese poder del senado es:"
            },
            "c": {
              "en": [
                "Advice and consent",
                "Judicial review",
                "Cloture",
                "Executive privilege"
              ],
              "es": [
                "Consejo y consentimiento",
                "Revisión judicial",
                "Clausura",
                "Privilegio ejecutivo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Confirmation is the legislature's check on executive appointments.",
              "es": "La confirmación es el control del legislativo sobre los nombramientos del ejecutivo."
            }
          },
          {
            "id": "si13",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Coach Smith hides recordings of his own corruption, claiming executive privilege. Which case forced a president to hand such tapes over?",
              "es": "Coach Smith esconde grabaciones de su corrupción alegando privilegio ejecutivo. ¿Qué caso obligó a un presidente a entregar esas cintas?"
            },
            "c": {
              "en": [
                "United States v. Nixon",
                "Citizens United v. FEC",
                "Korematsu v. United States",
                "Baker v. Carr"
              ],
              "es": [
                "Estados Unidos contra Nixon",
                "Citizens United contra FEC",
                "Korematsu contra Estados Unidos",
                "Baker contra Carr"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Court held that executive privilege is not absolute in a criminal investigation.",
              "es": "La Corte sostuvo que el privilegio ejecutivo no es absoluto en una investigación penal."
            }
          },
          {
            "id": "si14",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Coach Smith orders the island newspaper shut down for criticizing him. Which First Amendment freedom is violated?",
              "es": "Coach Smith ordena cerrar el periódico isleño por criticarlo. ¿Qué libertad de la Primera Enmienda se viola?"
            },
            "c": {
              "en": [
                "Freedom of the press",
                "Freedom of assembly",
                "Free exercise of religion",
                "Right to petition"
              ],
              "es": [
                "Libertad de prensa",
                "Libertad de reunión",
                "Libre ejercicio de la religión",
                "Derecho de petición"
              ]
            },
            "a": 0,
            "why": {
              "en": "Shutting down a publication for its content is prior restraint on the press.",
              "es": "Cerrar una publicación por su contenido es censura previa contra la prensa."
            }
          },
          {
            "id": "si15",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Island police search a home with no warrant and no probable cause. Which amendment does that violate?",
              "es": "La policía isleña registra una casa sin orden ni causa probable. ¿Qué enmienda viola?"
            },
            "c": {
              "en": [
                "Fourth",
                "Second",
                "Third",
                "Eighth"
              ],
              "es": [
                "Cuarta",
                "Segunda",
                "Tercera",
                "Octava"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Fourth Amendment bars unreasonable searches and seizures.",
              "es": "La Cuarta Enmienda prohíbe registros e incautaciones irrazonables."
            }
          },
          {
            "id": "si16",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "On trial, an islander refuses to testify against himself. He is invoking the:",
              "es": "En juicio, un isleño se niega a declarar contra sí mismo. Está invocando la:"
            },
            "c": {
              "en": [
                "Fifth Amendment",
                "First Amendment",
                "Sixth Amendment",
                "Tenth Amendment"
              ],
              "es": [
                "Quinta Enmienda",
                "Primera Enmienda",
                "Sexta Enmienda",
                "Décima Enmienda"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Fifth Amendment protects against compelled self-incrimination.",
              "es": "La Quinta Enmienda protege contra la autoincriminación forzada."
            }
          },
          {
            "id": "si17",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "After an acquittal, Coach Smith tries the same islander again for the identical crime. This is barred as:",
              "es": "Tras una absolución, Coach Smith juzga otra vez al mismo isleño por el mismo delito. Esto se prohíbe como:"
            },
            "c": {
              "en": [
                "Double jeopardy",
                "Ex post facto",
                "Eminent domain",
                "Prior restraint"
              ],
              "es": [
                "Doble enjuiciamiento",
                "Ley ex post facto",
                "Dominio eminente",
                "Censura previa"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Fifth Amendment forbids a second prosecution for the same offense after acquittal.",
              "es": "La Quinta Enmienda prohíbe un segundo proceso por el mismo delito tras la absolución."
            }
          },
          {
            "id": "si18",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Coach Smith sentences a student to forty years of hard labor for chewing gum. This violates the Eighth Amendment ban on:",
              "es": "Coach Smith condena a un estudiante a cuarenta años de trabajos forzados por mascar chicle. Esto viola la prohibición de la Octava Enmienda de:"
            },
            "c": {
              "en": [
                "Cruel and unusual punishment",
                "Unreasonable searches",
                "Self-incrimination",
                "Excessive taxation"
              ],
              "es": [
                "Castigos crueles e inusuales",
                "Registros irrazonables",
                "Autoincriminación",
                "Impuestos excesivos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Punishment grossly out of proportion to the offense is unconstitutional.",
              "es": "Un castigo muy desproporcionado frente al delito es inconstitucional."
            }
          },
          {
            "id": "si19",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The island builds a highway through a citizen's land and pays fair market value. This power is:",
              "es": "La isla construye una carretera sobre el terreno de un ciudadano y paga su valor justo. Ese poder es:"
            },
            "c": {
              "en": [
                "Eminent domain",
                "Gerrymandering",
                "Incorporation",
                "Due process"
              ],
              "es": [
                "Dominio eminente",
                "Gerrymandering",
                "Incorporación",
                "Debido proceso"
              ]
            },
            "a": 0,
            "why": {
              "en": "Government may take property for public use, but only with just compensation.",
              "es": "El gobierno puede tomar propiedad para uso público, pero solo con compensación justa."
            }
          },
          {
            "id": "si20",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Coach Smith rules that only blue-eyed islanders get free public school. This violates the Fourteenth Amendment's:",
              "es": "Coach Smith decreta que solo los isleños de ojos azules tienen escuela pública gratis. Esto viola de la Decimocuarta Enmienda la:"
            },
            "c": {
              "en": [
                "Equal Protection Clause",
                "Establishment Clause",
                "Free Exercise Clause",
                "Commerce Clause"
              ],
              "es": [
                "Cláusula de Igual Protección",
                "Cláusula de Establecimiento",
                "Cláusula de Libre Ejercicio",
                "Cláusula de Comercio"
              ]
            },
            "a": 0,
            "why": {
              "en": "Equal protection forbids arbitrary classifications that deny a public benefit.",
              "es": "La igual protección prohíbe clasificaciones arbitrarias que nieguen un beneficio público."
            }
          },
          {
            "id": "si21",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The process of applying Bill of Rights protections to state and local government is called:",
              "es": "El proceso de aplicar las protecciones de la Carta de Derechos a los gobiernos estatales y locales se llama:"
            },
            "c": {
              "en": [
                "Selective incorporation",
                "Suffrage",
                "Reapportionment",
                "Devolution"
              ],
              "es": [
                "Incorporación selectiva",
                "Sufragio",
                "Reasignación",
                "Devolución"
              ]
            },
            "a": 0,
            "why": {
              "en": "Courts incorporated rights one at a time through the Fourteenth Amendment's due process clause.",
              "es": "Los tribunales incorporaron derechos uno a uno mediante la cláusula del debido proceso de la Decimocuarta."
            }
          },
          {
            "id": "si22",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "To become a naturalized citizen of the island, an applicant must do all of these EXCEPT:",
              "es": "Para naturalizarse en la isla, un solicitante debe hacer todo esto EXCEPTO:"
            },
            "c": {
              "en": [
                "Be related to Coach Smith",
                "Be at least 18 years old",
                "Pass a civics test",
                "Swear an oath of allegiance"
              ],
              "es": [
                "Ser pariente de Coach Smith",
                "Tener al menos 18 años",
                "Aprobar un examen de civismo",
                "Prestar juramento de lealtad"
              ]
            },
            "a": 0,
            "why": {
              "en": "Citizenship rules cannot depend on personal connection to whoever holds power.",
              "es": "Las reglas de ciudadanía no pueden depender de la relación personal con quien gobierna."
            }
          },
          {
            "id": "si23",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An island group hires people to meet legislators and push for favorable laws. They are:",
              "es": "Un grupo isleño contrata personas para reunirse con legisladores y presionar por leyes favorables. Son:"
            },
            "c": {
              "en": [
                "Lobbyists",
                "Bureaucrats",
                "Electors",
                "Justices"
              ],
              "es": [
                "Cabilderos",
                "Burócratas",
                "Electores",
                "Jueces"
              ]
            },
            "a": 0,
            "why": {
              "en": "Lobbying is legal advocacy aimed directly at lawmakers.",
              "es": "El cabildeo es la defensa legal de intereses dirigida a los legisladores."
            }
          },
          {
            "id": "si24",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Supporters form an organization whose only job is raising money for Coach Smith's campaign ads. That is a:",
              "es": "Sus partidarios forman una organización cuya única función es recaudar dinero para los anuncios de campaña de Coach Smith. Eso es un:"
            },
            "c": {
              "en": [
                "Political action committee",
                "Regulatory agency",
                "Third party",
                "Cabinet department"
              ],
              "es": [
                "Comité de acción política (PAC)",
                "Agencia reguladora",
                "Tercer partido",
                "Departamento del gabinete"
              ]
            },
            "a": 0,
            "why": {
              "en": "PACs collect and spend money to influence elections.",
              "es": "Los PAC recaudan y gastan dinero para influir en las elecciones."
            }
          },
          {
            "id": "si25",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "An island news station runs nightly stories on crumbling roads until officials act. The press is acting as a:",
              "es": "Una estación isleña transmite cada noche reportajes sobre carreteras destruidas hasta que las autoridades actúan. La prensa actúa como:"
            },
            "c": {
              "en": [
                "Watchdog and agenda setter",
                "Lobbyist",
                "Regulator",
                "Party organizer"
              ],
              "es": [
                "Vigilante y fijadora de agenda",
                "Cabildera",
                "Reguladora",
                "Organizadora de partido"
              ]
            },
            "a": 0,
            "why": {
              "en": "Sustained coverage pressures officials and pushes an issue up the public agenda.",
              "es": "La cobertura sostenida presiona a las autoridades y eleva un tema en la agenda pública."
            }
          },
          {
            "id": "si26",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Coach Smith reads only sources that already agree with him and dismisses the rest. This voter behavior is:",
              "es": "Coach Smith solo lee fuentes que ya coinciden con él y descarta el resto. Ese comportamiento del votante es:"
            },
            "c": {
              "en": [
                "Confirmation bias",
                "Retrospective voting",
                "Rational choice",
                "Split-ticket voting"
              ],
              "es": [
                "Sesgo de confirmación",
                "Voto retrospectivo",
                "Elección racional",
                "Voto dividido"
              ]
            },
            "a": 0,
            "why": {
              "en": "Confirmation bias filters information to protect what a person already believes.",
              "es": "El sesgo de confirmación filtra la información para proteger lo que la persona ya cree."
            }
          },
          {
            "id": "si27",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Coach Smith wants to govern alone. Select every structure that stops him.",
              "es": "Coach Smith quiere gobernar solo. Selecciona cada estructura que se lo impide."
            },
            "c": {
              "en": [
                "A legislature that can override his veto",
                "Courts with judicial review",
                "Regular competitive elections",
                "A press office that reports only his statements"
              ],
              "es": [
                "Una legislatura que puede anular su veto",
                "Tribunales con revisión judicial",
                "Elecciones competitivas periódicas",
                "Una oficina de prensa que solo difunde sus declaraciones"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "A state-controlled press protects a ruler; the other three constrain one.",
              "es": "Una prensa controlada por el Estado protege al gobernante; las otras tres lo limitan."
            }
          },
          {
            "id": "si28",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every power the island's national government would hold exclusively.",
              "es": "Selecciona cada poder que el gobierno nacional de la isla tendría en exclusiva."
            },
            "c": {
              "en": [
                "Coining money",
                "Declaring war",
                "Making treaties",
                "Issuing teaching licenses"
              ],
              "es": [
                "Acuñar moneda",
                "Declarar la guerra",
                "Firmar tratados",
                "Otorgar licencias docentes"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Professional licensing is a reserved power of the states.",
              "es": "Otorgar licencias profesionales es un poder reservado a los estados."
            }
          },
          {
            "id": "si29",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Coach Smith says a ruler should not be limited during an emergency. Give one constitutional reason he is wrong.",
              "es": "Coach Smith dice que un gobernante no debe tener límites durante una emergencia. Da una razón constitucional de por qué se equivoca."
            },
            "keys": [
              "rights",
              "abuse",
              "permanent",
              "power",
              "court",
              "check",
              "law",
              "derechos",
              "abuso",
              "poder",
              "tribunal",
              "control",
              "ley"
            ],
            "why": {
              "en": "Emergency powers without limits let rights be suspended permanently, which is why courts and the legislature keep checking the executive.",
              "es": "Los poderes de emergencia sin límites permiten suspender derechos de forma permanente; por eso los tribunales y la legislatura siguen controlando al ejecutivo."
            }
          },
          {
            "id": "si30",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "The island must choose between a direct democracy and a constitutional republic. Give one advantage of the republic.",
              "es": "La isla debe elegir entre democracia directa y república constitucional. Da una ventaja de la república."
            },
            "keys": [
              "representative",
              "minority",
              "protect",
              "practical",
              "size",
              "expert",
              "deliberat",
              "representante",
              "minoría",
              "proteg",
              "práctic",
              "tamaño",
              "deliber"
            ],
            "why": {
              "en": "Representation scales to a large population and written limits protect minorities from a temporary majority.",
              "es": "La representación funciona en poblaciones grandes y los límites escritos protegen a las minorías de una mayoría temporal."
            }
          }
        ]
      }
    ]
  },
  {
    "id": "econ-h",
    "color": "#FF4D9D",
    "name": {
      "en": "Economics Honors",
      "es": "Economía Honores"
    },
    "units": [
      {
        "id": "eh-u1",
        "title": {
          "en": "Unit 1 · Markets and the U.S. Economy (SS.912.E.1)",
          "es": "Unidad 1 · Mercados y la economía de EE. UU. (SS.912.E.1)"
        },
        "brief": {
          "en": "Every economy answers three questions: what to produce, how to produce it, and for whom. A market economy answers them through prices set by supply and demand, a command economy through central planning, and a mixed economy through both. Prices act as signals: shortages push prices up, surpluses push them down, and profit draws producers toward what buyers want. Competition among sellers lowers prices and raises quality, while monopoly power does the opposite. Private property, voluntary exchange, and the profit motive are the defining features of the U.S. free enterprise system.",
          "es": "Toda economía responde tres preguntas: qué producir, cómo producirlo y para quién. Una economía de mercado las responde mediante precios fijados por la oferta y la demanda, una centralizada mediante planificación estatal y una mixta mediante ambas. Los precios son señales: la escasez los sube, el excedente los baja y el beneficio atrae a los productores hacia lo que los compradores quieren. La competencia entre vendedores baja precios y mejora la calidad; el poder monopólico hace lo contrario. La propiedad privada, el intercambio voluntario y el afán de lucro definen el sistema de libre empresa de EE. UU."
        },
        "items": [
          {
            "id": "eh101",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "In a market economy, what mainly determines which goods get produced?",
              "es": "En una economía de mercado, ¿qué determina principalmente qué bienes se producen?"
            },
            "c": {
              "en": [
                "Prices set by supply and demand",
                "A central planning agency",
                "A vote in Congress",
                "Random assignment"
              ],
              "es": [
                "Los precios fijados por la oferta y la demanda",
                "Una agencia de planificación central",
                "Una votación en el Congreso",
                "Asignación al azar"
              ]
            },
            "a": 0,
            "why": {
              "en": "Prices signal what buyers value, and profit pulls resources toward those goods.",
              "es": "Los precios señalan lo que valoran los compradores y el beneficio atrae recursos hacia esos bienes."
            }
          },
          {
            "id": "eh102",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which is a characteristic of the U.S. free enterprise system?",
              "es": "¿Cuál es una característica del sistema de libre empresa de EE. UU.?"
            },
            "c": {
              "en": [
                "Private ownership of property",
                "Government ownership of all factories",
                "Fixed wages set by law for every job",
                "A ban on competition"
              ],
              "es": [
                "Propiedad privada",
                "Propiedad estatal de todas las fábricas",
                "Salarios fijos por ley para cada empleo",
                "Prohibición de la competencia"
              ]
            },
            "a": 0,
            "why": {
              "en": "Private property and voluntary exchange are foundations of free enterprise.",
              "es": "La propiedad privada y el intercambio voluntario son bases de la libre empresa."
            }
          },
          {
            "id": "eh103",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select the three basic economic questions every society must answer.",
              "es": "Selecciona las tres preguntas económicas básicas que toda sociedad debe responder."
            },
            "c": {
              "en": [
                "What to produce",
                "How to produce it",
                "For whom to produce",
                "When to hold elections"
              ],
              "es": [
                "Qué producir",
                "Cómo producirlo",
                "Para quién producir",
                "Cuándo celebrar elecciones"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Elections are a political question, not one of the three economic questions.",
              "es": "Las elecciones son una cuestión política, no una de las tres preguntas económicas."
            }
          },
          {
            "id": "eh104",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A shortage of a good in a competitive market usually causes:",
              "es": "La escasez de un bien en un mercado competitivo suele causar:"
            },
            "c": {
              "en": [
                "The price to rise until quantity supplied and demanded match",
                "The price to fall",
                "Producers to leave the market",
                "Permanent rationing by the state"
              ],
              "es": [
                "Que el precio suba hasta igualar cantidad ofrecida y demandada",
                "Que el precio baje",
                "Que los productores salgan del mercado",
                "Racionamiento estatal permanente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Rising prices ration the good and encourage more production until the shortage clears.",
              "es": "El alza de precios raciona el bien y estimula más producción hasta acabar la escasez."
            }
          },
          {
            "id": "eh105",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which situation best describes a mixed economy?",
              "es": "¿Qué situación describe mejor una economía mixta?"
            },
            "c": {
              "en": [
                "Private markets operate alongside government regulation and public services",
                "All decisions come from central planners",
                "Barter replaces money entirely",
                "Only foreign firms may produce"
              ],
              "es": [
                "Los mercados privados conviven con la regulación estatal y los servicios públicos",
                "Todas las decisiones vienen de planificadores centrales",
                "El trueque reemplaza al dinero por completo",
                "Solo empresas extranjeras pueden producir"
              ]
            },
            "a": 0,
            "why": {
              "en": "Most modern economies, including the United States, mix market and government roles.",
              "es": "La mayoría de las economías modernas, incluida EE. UU., mezclan mercado y Estado."
            }
          },
          {
            "id": "eh106",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Increased competition in an industry most likely leads to:",
              "es": "Un aumento de la competencia en una industria probablemente lleva a:"
            },
            "c": {
              "en": [
                "Lower prices and better quality for consumers",
                "Higher prices and fewer choices",
                "Guaranteed profits for every firm",
                "Fewer products on the market"
              ],
              "es": [
                "Precios más bajos y mejor calidad para el consumidor",
                "Precios más altos y menos opciones",
                "Beneficios garantizados para toda empresa",
                "Menos productos en el mercado"
              ]
            },
            "a": 0,
            "why": {
              "en": "Firms compete for buyers by cutting prices and improving what they offer.",
              "es": "Las empresas compiten por los compradores bajando precios y mejorando su oferta."
            }
          },
          {
            "id": "eh107",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is an example of a public good?",
              "es": "¿Cuál es un ejemplo de bien público?"
            },
            "c": {
              "en": [
                "National defense",
                "A cheeseburger",
                "A concert ticket",
                "A private gym membership"
              ],
              "es": [
                "La defensa nacional",
                "Una hamburguesa",
                "Un boleto de concierto",
                "Una membresía de gimnasio privado"
              ]
            },
            "a": 0,
            "why": {
              "en": "Public goods are non-excludable and non-rival, so markets underprovide them.",
              "es": "Los bienes públicos no son excluyentes ni rivales, así que el mercado los provee de menos."
            }
          },
          {
            "id": "eh108",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A factory pollutes a river used by a town downstream. This is an example of:",
              "es": "Una fábrica contamina un río usado por un pueblo aguas abajo. Esto es un ejemplo de:"
            },
            "c": {
              "en": [
                "A negative externality",
                "A public good",
                "A subsidy",
                "A price ceiling"
              ],
              "es": [
                "Una externalidad negativa",
                "Un bien público",
                "Un subsidio",
                "Un precio máximo"
              ]
            },
            "a": 0,
            "why": {
              "en": "The cost falls on third parties who are not part of the transaction.",
              "es": "El costo recae en terceros que no participan en la transacción."
            }
          },
          {
            "id": "eh109",
            "type": "short",
            "diff": 2,
            "q": {
              "en": "Explain how profit acts as a signal to producers.",
              "es": "Explica cómo el beneficio funciona como señal para los productores."
            },
            "keys": [
              "profit",
              "attract",
              "enter",
              "signal",
              "demand",
              "want",
              "more",
              "beneficio",
              "atrae",
              "entrar",
              "señal",
              "demanda",
              "más"
            ],
            "why": {
              "en": "High profit attracts producers into a market, increasing supply of what buyers want most.",
              "es": "Un beneficio alto atrae productores al mercado y aumenta la oferta de lo que más quieren los compradores."
            }
          },
          {
            "id": "eh110",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Entrepreneurs are best described as people who:",
              "es": "Los emprendedores se describen mejor como personas que:"
            },
            "c": {
              "en": [
                "Take on risk to combine resources into a new business",
                "Are guaranteed a profit by law",
                "Work only for large corporations",
                "Set national interest rates"
              ],
              "es": [
                "Asumen riesgo para combinar recursos en un negocio nuevo",
                "Tienen beneficio garantizado por ley",
                "Solo trabajan para grandes corporaciones",
                "Fijan las tasas de interés nacionales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Entrepreneurship is the factor of production that organizes the others and bears risk.",
              "es": "El emprendimiento es el factor que organiza a los demás y asume el riesgo."
            }
          }
        ]
      },
      {
        "id": "eh-u2",
        "title": {
          "en": "Unit 2 · The National Economy (SS.912.E.2)",
          "es": "Unidad 2 · La economía nacional (SS.912.E.2)"
        },
        "brief": {
          "en": "GDP measures the value of final goods and services produced in a country in a year and is the standard gauge of economic health. The business cycle moves through expansion, peak, contraction, and trough; two consecutive quarters of falling real GDP is a common recession marker. Unemployment is measured as a share of the labor force and comes in frictional, structural, and cyclical forms. Inflation, tracked by the CPI, reduces purchasing power and hurts savers and lenders most. Government uses fiscal policy — taxes and spending — while the Federal Reserve uses monetary policy to steady growth, employment, and prices.",
          "es": "El PIB mide el valor de los bienes y servicios finales producidos en un país en un año y es la medida estándar de la salud económica. El ciclo económico pasa por expansión, cima, contracción y fondo; dos trimestres seguidos de caída del PIB real es una señal común de recesión. El desempleo se mide como porcentaje de la fuerza laboral y puede ser friccional, estructural o cíclico. La inflación, medida por el IPC, reduce el poder adquisitivo y perjudica sobre todo a ahorradores y prestamistas. El gobierno usa la política fiscal —impuestos y gasto— y la Reserva Federal la política monetaria para estabilizar crecimiento, empleo y precios."
        },
        "items": [
          {
            "id": "eh201",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Gross domestic product measures:",
              "es": "El producto interno bruto mide:"
            },
            "c": {
              "en": [
                "The value of final goods and services produced in a country in a year",
                "The total money in circulation",
                "The number of people employed",
                "Government debt"
              ],
              "es": [
                "El valor de bienes y servicios finales producidos en un país en un año",
                "El dinero total en circulación",
                "El número de personas empleadas",
                "La deuda del gobierno"
              ]
            },
            "a": 0,
            "why": {
              "en": "GDP counts production, not money supply, employment counts, or debt.",
              "es": "El PIB cuenta producción, no oferta monetaria, empleo ni deuda."
            }
          },
          {
            "id": "eh202",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which phase of the business cycle follows a peak?",
              "es": "¿Qué fase del ciclo económico sigue a una cima?"
            },
            "c": {
              "en": [
                "Contraction",
                "Expansion",
                "Trough",
                "Recovery"
              ],
              "es": [
                "Contracción",
                "Expansión",
                "Fondo",
                "Recuperación"
              ]
            },
            "a": 0,
            "why": {
              "en": "After a peak, output and employment decline into a contraction.",
              "es": "Tras la cima, la producción y el empleo caen en una contracción."
            }
          },
          {
            "id": "eh203",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "A worker earned $40,000 and prices rose 5% while their pay stayed the same. By how many dollars did their purchasing power effectively fall, to the nearest dollar?",
              "es": "Un trabajador ganó $40,000, los precios subieron 5% y su pago no cambió. ¿En cuántos dólares cayó efectivamente su poder adquisitivo, al dólar más cercano?"
            },
            "a": 2000,
            "tol": 0,
            "why": {
              "en": "5% of 40,000 = 2,000 in lost buying power.",
              "es": "5% de 40,000 = 2,000 de poder de compra perdido."
            }
          },
          {
            "id": "eh204",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A worker between jobs after moving to a new city is experiencing:",
              "es": "Un trabajador entre empleos tras mudarse de ciudad experimenta desempleo:"
            },
            "c": {
              "en": [
                "Frictional unemployment",
                "Structural unemployment",
                "Cyclical unemployment",
                "Permanent unemployment"
              ],
              "es": [
                "Friccional",
                "Estructural",
                "Cíclico",
                "Permanente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Frictional unemployment is short-term job searching and is normal in a healthy economy.",
              "es": "El desempleo friccional es la búsqueda de empleo a corto plazo y es normal en una economía sana."
            }
          },
          {
            "id": "eh205",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is an example of fiscal policy?",
              "es": "¿Cuál es un ejemplo de política fiscal?"
            },
            "c": {
              "en": [
                "Congress cutting income tax rates",
                "The Fed buying government bonds",
                "A bank raising its loan rates",
                "A company hiring more workers"
              ],
              "es": [
                "El Congreso recorta las tasas del impuesto sobre la renta",
                "La Fed compra bonos del gobierno",
                "Un banco sube sus tasas de préstamo",
                "Una empresa contrata más trabajadores"
              ]
            },
            "a": 0,
            "why": {
              "en": "Fiscal policy is government taxing and spending; bond operations are monetary policy.",
              "es": "La política fiscal son los impuestos y el gasto público; las operaciones con bonos son monetarias."
            }
          },
          {
            "id": "eh206",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every group typically hurt by unexpected high inflation.",
              "es": "Selecciona cada grupo perjudicado normalmente por una inflación alta inesperada."
            },
            "c": {
              "en": [
                "People living on fixed incomes",
                "Lenders holding fixed-rate loans",
                "Savers with low-interest accounts",
                "Borrowers repaying fixed-rate loans"
              ],
              "es": [
                "Personas con ingresos fijos",
                "Prestamistas con préstamos a tasa fija",
                "Ahorradores con cuentas de bajo interés",
                "Prestatarios que pagan préstamos a tasa fija"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Borrowers gain, because they repay with dollars worth less than they borrowed.",
              "es": "Los prestatarios ganan porque pagan con dinero que vale menos del que pidieron."
            }
          },
          {
            "id": "eh207",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "During a recession, the government would most likely:",
              "es": "Durante una recesión, el gobierno probablemente:"
            },
            "c": {
              "en": [
                "Increase spending or cut taxes to boost demand",
                "Cut spending and raise taxes sharply",
                "Stop issuing currency",
                "Raise tariffs on all exports"
              ],
              "es": [
                "Aumentaría el gasto o bajaría impuestos para impulsar la demanda",
                "Recortaría el gasto y subiría impuestos bruscamente",
                "Dejaría de emitir moneda",
                "Subiría aranceles a todas las exportaciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "Expansionary fiscal policy puts money into circulation and raises total demand.",
              "es": "La política fiscal expansiva pone dinero en circulación y eleva la demanda total."
            }
          },
          {
            "id": "eh208",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A progressive income tax means that as income rises, the:",
              "es": "Un impuesto progresivo sobre la renta significa que al subir el ingreso, la:"
            },
            "c": {
              "en": [
                "Percentage of income paid in tax rises",
                "Percentage paid falls",
                "Dollar amount paid stays fixed",
                "Tax disappears entirely"
              ],
              "es": [
                "Proporción del ingreso pagada en impuestos sube",
                "Proporción pagada baja",
                "Cantidad en dólares queda fija",
                "Impuesto desaparece por completo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher brackets pay a higher share; a regressive tax does the opposite.",
              "es": "Los tramos altos pagan una proporción mayor; un impuesto regresivo hace lo contrario."
            }
          },
          {
            "id": "eh209",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain why the unemployment rate can fall even when no new jobs are created.",
              "es": "Explica por qué la tasa de desempleo puede bajar aunque no se creen empleos nuevos."
            },
            "keys": [
              "labor force",
              "stop looking",
              "discouraged",
              "leave",
              "shrink",
              "fuerza laboral",
              "dejan de buscar",
              "desalentad",
              "salen",
              "reduce"
            ],
            "why": {
              "en": "People who stop looking leave the labor force and are no longer counted as unemployed.",
              "es": "Quienes dejan de buscar salen de la fuerza laboral y ya no cuentan como desempleados."
            }
          },
          {
            "id": "eh210",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Federal Reserve's main responsibilities include:",
              "es": "Las principales responsabilidades de la Reserva Federal incluyen:"
            },
            "c": {
              "en": [
                "Controlling the money supply and supervising banks",
                "Setting income tax rates",
                "Passing the federal budget",
                "Running Social Security"
              ],
              "es": [
                "Controlar la oferta monetaria y supervisar bancos",
                "Fijar las tasas del impuesto sobre la renta",
                "Aprobar el presupuesto federal",
                "Administrar la seguridad social"
              ]
            },
            "a": 0,
            "why": {
              "en": "Taxing and budgeting belong to Congress; the Fed handles monetary policy.",
              "es": "Impuestos y presupuesto corresponden al Congreso; la Fed maneja la política monetaria."
            }
          }
        ]
      },
      {
        "id": "eh-u3",
        "title": {
          "en": "Unit 3 · Trade and the Global Economy (SS.912.E.3)",
          "es": "Unidad 3 · Comercio y economía global (SS.912.E.3)"
        },
        "brief": {
          "en": "Nations trade because specialization based on comparative advantage lets both sides consume more than they could alone. Exports are goods sold abroad and imports are goods bought from abroad; the balance of trade is the difference. Tariffs are taxes on imports and quotas are limits on quantity; both protect domestic producers while raising prices for consumers. Exchange rates set the price of one currency in terms of another, and a weaker dollar makes U.S. exports cheaper abroad and imports more expensive at home. Trade agreements and organizations lower barriers, while embargoes cut trade off for political reasons.",
          "es": "Las naciones comercian porque la especialización basada en la ventaja comparativa permite a ambas partes consumir más que por separado. Las exportaciones son bienes vendidos al exterior y las importaciones bienes comprados del exterior; la balanza comercial es la diferencia. Los aranceles son impuestos a las importaciones y las cuotas limitan la cantidad; ambos protegen a los productores nacionales pero encarecen los precios al consumidor. Los tipos de cambio fijan el precio de una moneda en términos de otra, y un dólar más débil abarata las exportaciones de EE. UU. y encarece las importaciones. Los acuerdos comerciales reducen barreras, mientras los embargos cortan el comercio por razones políticas."
        },
        "items": [
          {
            "id": "eh301",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "A tariff is best described as:",
              "es": "Un arancel se describe mejor como:"
            },
            "c": {
              "en": [
                "A tax on imported goods",
                "A limit on how many goods may enter",
                "A ban on all trade",
                "A subsidy to foreign firms"
              ],
              "es": [
                "Un impuesto a los bienes importados",
                "Un límite a la cantidad que puede entrar",
                "Una prohibición total del comercio",
                "Un subsidio a empresas extranjeras"
              ]
            },
            "a": 0,
            "why": {
              "en": "A quota limits quantity; a tariff raises the price through a tax.",
              "es": "Una cuota limita la cantidad; un arancel sube el precio mediante un impuesto."
            }
          },
          {
            "id": "eh302",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "A country exports $500 billion and imports $620 billion. What is its trade balance in billions? Use a negative number for a deficit.",
              "es": "Un país exporta $500 mil millones e importa $620 mil millones. ¿Cuál es su balanza comercial en miles de millones? Usa número negativo si hay déficit."
            },
            "a": -120,
            "tol": 0,
            "why": {
              "en": "500 − 620 = −120, a trade deficit of $120 billion.",
              "es": "500 − 620 = −120, un déficit comercial de $120 mil millones."
            }
          },
          {
            "id": "eh303",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "If the U.S. dollar weakens against the euro, U.S. exports to Europe become:",
              "es": "Si el dólar se debilita frente al euro, las exportaciones de EE. UU. a Europa se vuelven:"
            },
            "c": {
              "en": [
                "Cheaper for European buyers",
                "More expensive for European buyers",
                "Illegal",
                "Unchanged in price"
              ],
              "es": [
                "Más baratas para los compradores europeos",
                "Más caras para los compradores europeos",
                "Ilegales",
                "Iguales en precio"
              ]
            },
            "a": 0,
            "why": {
              "en": "A weaker dollar means euros buy more dollars, so U.S. goods cost Europeans less.",
              "es": "Un dólar débil hace que los euros compren más dólares, así que los bienes de EE. UU. cuestan menos."
            }
          },
          {
            "id": "eh304",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every likely effect of a new tariff on imported steel.",
              "es": "Selecciona cada efecto probable de un nuevo arancel al acero importado."
            },
            "c": {
              "en": [
                "Domestic steel producers gain sales",
                "Steel-using manufacturers face higher costs",
                "Consumer prices for steel products rise",
                "Imported steel becomes cheaper"
              ],
              "es": [
                "Los productores nacionales de acero ganan ventas",
                "Los fabricantes que usan acero enfrentan costos mayores",
                "Suben los precios de productos de acero",
                "El acero importado se abarata"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "A tariff raises the price of imports, so imported steel becomes more expensive, not cheaper.",
              "es": "Un arancel sube el precio de las importaciones, así que el acero importado se encarece."
            }
          },
          {
            "id": "eh305",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Specialization and trade between two nations generally result in:",
              "es": "La especialización y el comercio entre dos naciones generalmente resultan en:"
            },
            "c": {
              "en": [
                "More total output and consumption for both",
                "Less output for both",
                "Gains only for the larger nation",
                "No change in living standards"
              ],
              "es": [
                "Mayor producción y consumo total para ambas",
                "Menor producción para ambas",
                "Ganancias solo para la nación más grande",
                "Ningún cambio en el nivel de vida"
              ]
            },
            "a": 0,
            "why": {
              "en": "Each nation produces where its opportunity cost is lower, expanding total output.",
              "es": "Cada nación produce donde su costo de oportunidad es menor, ampliando la producción total."
            }
          },
          {
            "id": "eh306",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "An embargo differs from a tariff because an embargo:",
              "es": "Un embargo difiere de un arancel porque el embargo:"
            },
            "c": {
              "en": [
                "Halts trade with a country, usually for political reasons",
                "Taxes imports at the border",
                "Subsidizes exporters",
                "Fixes the exchange rate"
              ],
              "es": [
                "Detiene el comercio con un país, normalmente por razones políticas",
                "Grava las importaciones en la frontera",
                "Subsidia a los exportadores",
                "Fija el tipo de cambio"
              ]
            },
            "a": 0,
            "why": {
              "en": "Embargoes are political tools that stop trade rather than tax it.",
              "es": "Los embargos son instrumentos políticos que detienen el comercio en vez de gravarlo."
            }
          },
          {
            "id": "eh307",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is the most common argument used to justify protectionism?",
              "es": "¿Cuál es el argumento más común para justificar el proteccionismo?"
            },
            "c": {
              "en": [
                "Protecting domestic jobs and new industries",
                "Lowering consumer prices",
                "Increasing product variety",
                "Speeding up global shipping"
              ],
              "es": [
                "Proteger empleos nacionales e industrias nuevas",
                "Bajar los precios al consumidor",
                "Aumentar la variedad de productos",
                "Acelerar el envío global"
              ]
            },
            "a": 0,
            "why": {
              "en": "Protection is usually defended on jobs and infant-industry grounds, though it raises prices.",
              "es": "El proteccionismo suele defenderse por el empleo y las industrias nacientes, aunque sube precios."
            }
          },
          {
            "id": "eh308",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Florida's economy depends heavily on international trade mainly through:",
              "es": "La economía de Florida depende del comercio internacional sobre todo mediante:"
            },
            "c": {
              "en": [
                "Its seaports, airports, and tourism links to Latin America",
                "Coal mining exports",
                "Automobile manufacturing",
                "Steel production"
              ],
              "es": [
                "Sus puertos, aeropuertos y vínculos turísticos con América Latina",
                "Exportaciones de carbón",
                "La fabricación de automóviles",
                "La producción de acero"
              ]
            },
            "a": 0,
            "why": {
              "en": "Florida's location makes it a shipping, aviation, and tourism gateway to the Americas.",
              "es": "La ubicación de Florida la hace una puerta de envíos, aviación y turismo hacia América."
            }
          },
          {
            "id": "eh309",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain one cost consumers pay when their government imposes tariffs.",
              "es": "Explica un costo que pagan los consumidores cuando su gobierno impone aranceles."
            },
            "keys": [
              "higher price",
              "more expensive",
              "pay more",
              "less choice",
              "fewer options",
              "precio",
              "más caro",
              "pagan más",
              "menos opciones"
            ],
            "why": {
              "en": "Tariffs raise the price of imports, so consumers pay more and have fewer options.",
              "es": "Los aranceles suben el precio de las importaciones, así que el consumidor paga más y tiene menos opciones."
            }
          },
          {
            "id": "eh310",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A trade surplus occurs when a country:",
              "es": "Un superávit comercial ocurre cuando un país:"
            },
            "c": {
              "en": [
                "Exports more than it imports",
                "Imports more than it exports",
                "Stops trading entirely",
                "Devalues its currency"
              ],
              "es": [
                "Exporta más de lo que importa",
                "Importa más de lo que exporta",
                "Deja de comerciar por completo",
                "Devalúa su moneda"
              ]
            },
            "a": 0,
            "why": {
              "en": "Surplus means exports exceed imports; a deficit is the reverse.",
              "es": "El superávit significa que las exportaciones superan a las importaciones; el déficit es lo contrario."
            }
          }
        ]
      },
      {
        "id": "eh-u4",
        "title": {
          "en": "Unit 4 · Financial Literacy (SS.912.FL)",
          "es": "Unidad 4 · Educación financiera (SS.912.FL)"
        },
        "brief": {
          "en": "Gross pay is what you earn; net pay is what remains after taxes and deductions. A budget gives every dollar of net pay a job, and a common starting frame is 50% needs, 30% wants, 20% saving and debt payoff. Credit scores are built mostly from payment history and credit utilization, the share of your limit you are using. Simple interest is paid on the principal alone; compound interest is paid on the principal plus prior interest, which is why saving early matters. Insurance transfers risk in exchange for a premium, and an emergency fund keeps a surprise expense from becoming high-interest debt.",
          "es": "El salario bruto es lo que ganas; el neto es lo que queda tras impuestos y deducciones. Un presupuesto asigna una función a cada dólar del salario neto, y un marco común es 50% necesidades, 30% deseos y 20% ahorro y pago de deudas. El puntaje de crédito se basa sobre todo en el historial de pagos y en la utilización del crédito, la parte del límite que usas. El interés simple se paga solo sobre el capital; el compuesto se paga sobre el capital más los intereses previos, por eso ahorrar temprano importa. El seguro transfiere el riesgo a cambio de una prima, y un fondo de emergencia evita que un gasto imprevisto se convierta en deuda cara."
        },
        "items": [
          {
            "id": "eh401",
            "type": "numeric",
            "diff": 1,
            "q": {
              "en": "You earn $18 per hour for 30 hours. What is your gross pay in dollars?",
              "es": "Ganas $18 por hora durante 30 horas. ¿Cuál es tu salario bruto en dólares?"
            },
            "a": 540,
            "tol": 0,
            "why": {
              "en": "18 × 30 = 540 before taxes or deductions.",
              "es": "18 × 30 = 540 antes de impuestos o deducciones."
            }
          },
          {
            "id": "eh402",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Net pay is best described as:",
              "es": "El salario neto se describe mejor como:"
            },
            "c": {
              "en": [
                "Take-home pay after taxes and deductions",
                "Total pay before deductions",
                "Pay plus benefits",
                "Hourly wage times 40"
              ],
              "es": [
                "El pago que recibes tras impuestos y deducciones",
                "El pago total antes de deducciones",
                "El pago más las prestaciones",
                "El salario por hora por 40"
              ]
            },
            "a": 0,
            "why": {
              "en": "Deductions come out first; what remains is take-home, or net, pay.",
              "es": "Las deducciones se restan primero; lo que queda es el pago neto."
            }
          },
          {
            "id": "eh403",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Net pay is $2,000 a month. Under a 50/30/20 budget, how many dollars go to saving and debt payoff?",
              "es": "El pago neto es $2,000 al mes. Con un presupuesto 50/30/20, ¿cuántos dólares van a ahorro y pago de deudas?"
            },
            "a": 400,
            "tol": 0,
            "why": {
              "en": "20% of 2,000 = 400.",
              "es": "20% de 2,000 = 400."
            }
          },
          {
            "id": "eh404",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "A card has a $2,000 limit and a $600 balance. What is the credit utilization percentage?",
              "es": "Una tarjeta tiene límite de $2,000 y saldo de $600. ¿Cuál es el porcentaje de utilización de crédito?"
            },
            "a": 30,
            "tol": 0,
            "why": {
              "en": "600 ÷ 2,000 = 0.30, or 30%.",
              "es": "600 ÷ 2,000 = 0.30, o sea 30%."
            }
          },
          {
            "id": "eh405",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "You deposit $1,000 at 5% simple interest for 3 years. How many dollars of interest do you earn?",
              "es": "Depositas $1,000 al 5% de interés simple durante 3 años. ¿Cuántos dólares de interés ganas?"
            },
            "a": 150,
            "tol": 0,
            "why": {
              "en": "1,000 × 0.05 × 3 = 150.",
              "es": "1,000 × 0.05 × 3 = 150."
            }
          },
          {
            "id": "eh406",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which action helps a credit score the most over time?",
              "es": "¿Qué acción mejora más el puntaje de crédito con el tiempo?"
            },
            "c": {
              "en": [
                "Paying every bill on time",
                "Closing your oldest account",
                "Using 95% of your credit limit",
                "Applying for many cards at once"
              ],
              "es": [
                "Pagar cada factura a tiempo",
                "Cerrar tu cuenta más antigua",
                "Usar el 95% de tu límite",
                "Solicitar muchas tarjetas a la vez"
              ]
            },
            "a": 0,
            "why": {
              "en": "Payment history is the single largest factor in most scoring models.",
              "es": "El historial de pagos es el factor más importante en la mayoría de los modelos."
            }
          },
          {
            "id": "eh407",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Why does compound interest grow savings faster than simple interest?",
              "es": "¿Por qué el interés compuesto hace crecer el ahorro más rápido que el simple?"
            },
            "c": {
              "en": [
                "Interest is earned on prior interest as well as the principal",
                "The interest rate is always higher",
                "Banks charge fewer fees",
                "Taxes are waived on it"
              ],
              "es": [
                "Se gana interés sobre los intereses previos además del capital",
                "La tasa siempre es más alta",
                "Los bancos cobran menos comisiones",
                "Está exento de impuestos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Each period's balance is larger, so the next interest payment is larger too.",
              "es": "El saldo de cada período es mayor, así que el siguiente interés también lo es."
            }
          },
          {
            "id": "eh408",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every expense that belongs in the 'needs' category of a budget.",
              "es": "Selecciona cada gasto que pertenece a la categoría de 'necesidades'."
            },
            "c": {
              "en": [
                "Rent",
                "Groceries",
                "Concert tickets",
                "Basic phone service"
              ],
              "es": [
                "Renta",
                "Comestibles",
                "Boletos de concierto",
                "Servicio telefónico básico"
              ]
            },
            "a": [
              0,
              1,
              3
            ],
            "why": {
              "en": "Needs cover housing, food, and basic utilities; entertainment is a want.",
              "es": "Las necesidades cubren vivienda, alimentos y servicios básicos; el entretenimiento es un deseo."
            }
          },
          {
            "id": "eh409",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The main purpose of insurance is to:",
              "es": "El propósito principal del seguro es:"
            },
            "c": {
              "en": [
                "Transfer the risk of a large loss in exchange for a premium",
                "Guarantee investment profits",
                "Eliminate all taxes",
                "Raise your credit score"
              ],
              "es": [
                "Transferir el riesgo de una pérdida grande a cambio de una prima",
                "Garantizar ganancias de inversión",
                "Eliminar todos los impuestos",
                "Subir tu puntaje de crédito"
              ]
            },
            "a": 0,
            "why": {
              "en": "You pay a predictable premium so an unpredictable loss does not ruin you.",
              "es": "Pagas una prima predecible para que una pérdida impredecible no te arruine."
            }
          },
          {
            "id": "eh410",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Why does an emergency fund reduce the need for high-interest debt?",
              "es": "¿Por qué un fondo de emergencia reduce la necesidad de deuda de alto interés?"
            },
            "keys": [
              "cash",
              "savings",
              "cover",
              "unexpected",
              "avoid",
              "borrow",
              "interest",
              "efectivo",
              "ahorro",
              "cubrir",
              "imprevist",
              "evita",
              "interés",
              "interes"
            ],
            "why": {
              "en": "Savings cover surprise costs, so you do not have to borrow at high interest.",
              "es": "El ahorro cubre gastos imprevistos, así que no tienes que endeudarte a alto interés."
            }
          }
        ]
      }
    ]
  }
];