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
            "diff": 1,
            "q": {
              "en": "Consumer confidence falls sharply after a stock-market crash. Aggregate demand:",
              "es": "La confianza del consumidor cae bruscamente tras un desplome bursátil. La demanda agregada:"
            },
            "c": {
              "en": [
                "Shifts left",
                "Shifts right",
                "Does not shift; the economy moves along it",
                "Becomes vertical"
              ],
              "es": [
                "Se desplaza a la izquierda",
                "Se desplaza a la derecha",
                "No se desplaza; la economía se mueve a lo largo de ella",
                "Se vuelve vertical"
              ]
            },
            "a": 0,
            "why": {
              "en": "Lower confidence cuts consumption (C), a component of AD, so AD shifts left. Only a change in the price level moves the economy along AD.",
              "es": "Menos confianza reduce el consumo (C), un componente de la DA, así que la DA se desplaza a la izquierda. Solo un cambio en el nivel de precios mueve la economía a lo largo de la DA."
            }
          },
          {
            "id": "apm305",
            "topic": "ad",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The U.S. dollar appreciates against other currencies. What happens to U.S. aggregate demand?",
              "es": "El dólar estadounidense se aprecia frente a otras monedas. ¿Qué pasa con la demanda agregada de EE. UU.?"
            },
            "c": {
              "en": [
                "It decreases, because net exports fall",
                "It increases, because imports get cheaper",
                "It increases, because exports rise",
                "It is unaffected; exchange rates only affect AS"
              ],
              "es": [
                "Disminuye, porque caen las exportaciones netas",
                "Aumenta, porque las importaciones se abaratan",
                "Aumenta, porque suben las exportaciones",
                "No cambia; el tipo de cambio solo afecta la OA"
              ]
            },
            "a": 0,
            "why": {
              "en": "A stronger dollar makes U.S. goods pricier abroad (exports fall) and foreign goods cheaper here (imports rise). Net exports drop, so AD shifts left.",
              "es": "Un dólar más fuerte encarece los bienes de EE. UU. en el exterior (bajan las exportaciones) y abarata los extranjeros aquí (suben las importaciones). Caen las exportaciones netas y la DA se desplaza a la izquierda."
            }
          },
          {
            "id": "apm306",
            "topic": "ad",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The wealth effect explains the downward slope of AD because a lower price level:",
              "es": "El efecto riqueza explica la pendiente negativa de la DA porque un nivel de precios más bajo:"
            },
            "c": {
              "en": [
                "Raises the real value of people's savings, so they buy more",
                "Raises interest rates, so firms invest more",
                "Makes exports more expensive",
                "Increases government spending"
              ],
              "es": [
                "Aumenta el valor real de los ahorros, así que la gente compra más",
                "Sube las tasas de interés, así que las empresas invierten más",
                "Encarece las exportaciones",
                "Aumenta el gasto público"
              ]
            },
            "a": 0,
            "why": {
              "en": "Lower prices mean the same savings buy more, so households feel wealthier and consume more. The interest-rate effect (lower rates → more investment) and the exchange-rate effect are the other two reasons.",
              "es": "Precios más bajos significan que los mismos ahorros compran más; los hogares se sienten más ricos y consumen más. Las otras dos razones son el efecto tasa de interés y el efecto tipo de cambio."
            }
          },
          {
            "id": "apm314",
            "topic": "as",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A major improvement in worker productivity (new software) will most likely:",
              "es": "Una gran mejora en la productividad laboral (nuevo software) probablemente:"
            },
            "c": {
              "en": [
                "Shift both SRAS and LRAS to the right",
                "Shift only AD to the right",
                "Shift SRAS left",
                "Shift LRAS left"
              ],
              "es": [
                "Desplace la OACP y la OALP a la derecha",
                "Desplace solo la DA a la derecha",
                "Desplace la OACP a la izquierda",
                "Desplace la OALP a la izquierda"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher productivity lowers per-unit costs (SRAS right) and raises the economy's full-employment output (LRAS right).",
              "es": "Mayor productividad baja los costos por unidad (OACP a la derecha) y eleva la producción de pleno empleo (OALP a la derecha)."
            }
          },
          {
            "id": "apm315",
            "topic": "as",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Starting at long-run equilibrium, AD falls. If the government does nothing, the long-run self-correction happens because:",
              "es": "Desde el equilibrio de largo plazo, cae la DA. Si el gobierno no hace nada, la autocorrección de largo plazo ocurre porque:"
            },
            "c": {
              "en": [
                "Nominal wages fall, shifting SRAS right",
                "Nominal wages rise, shifting SRAS left",
                "LRAS shifts left to meet AD",
                "AD automatically shifts back right"
              ],
              "es": [
                "Los salarios nominales bajan y la OACP se desplaza a la derecha",
                "Los salarios nominales suben y la OACP se desplaza a la izquierda",
                "La OALP se desplaza a la izquierda hasta la DA",
                "La DA vuelve sola a la derecha"
              ]
            },
            "a": 0,
            "why": {
              "en": "With unemployment above the natural rate, wages and input prices eventually fall. Cheaper inputs shift SRAS right until output returns to full employment at a lower price level.",
              "es": "Con desempleo por encima de la tasa natural, los salarios y costos terminan bajando. La OACP se desplaza a la derecha hasta volver al pleno empleo con un nivel de precios menor."
            }
          },
          {
            "id": "apm316",
            "topic": "as",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Stagflation is best shown on the AD–AS model as:",
              "es": "La estanflación se representa mejor en el modelo DA–OA como:"
            },
            "c": {
              "en": [
                "SRAS shifting left: price level up and output down",
                "AD shifting right: price level and output up",
                "AD shifting left: price level and output down",
                "LRAS shifting right"
              ],
              "es": [
                "La OACP a la izquierda: precios arriba y producción abajo",
                "La DA a la derecha: precios y producción arriba",
                "La DA a la izquierda: precios y producción abajo",
                "La OALP a la derecha"
              ]
            },
            "a": 0,
            "why": {
              "en": "A negative supply shock raises costs, so SRAS shifts left: inflation and unemployment rise together. That combination is stagflation.",
              "es": "Un choque de oferta negativo sube los costos y la OACP se desplaza a la izquierda: suben la inflación y el desempleo a la vez. Eso es estanflación."
            }
          },
          {
            "id": "apm324",
            "topic": "mult",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "The MPC is 0.9. What is the tax multiplier? (Enter the absolute value.)",
              "es": "La PMgC es 0.9. ¿Cuál es el multiplicador de impuestos? (Escribe el valor absoluto.)"
            },
            "a": 9,
            "tol": 0,
            "why": {
              "en": "Tax multiplier = MPC ÷ MPS = 0.9 ÷ 0.1 = 9 (it is −9 because tax increases reduce GDP).",
              "es": "Multiplicador de impuestos = PMgC ÷ PMgA = 0.9 ÷ 0.1 = 9 (es −9 porque subir impuestos reduce el PIB)."
            }
          },
          {
            "id": "apm325",
            "topic": "mult",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "The MPC is 0.8 and the government cuts taxes by $20 billion. What is the maximum change in real GDP, in billions?",
              "es": "La PMgC es 0.8 y el gobierno baja impuestos en $20 mil millones. ¿Cuál es el cambio máximo del PIB real, en miles de millones?"
            },
            "a": 80,
            "tol": 0,
            "why": {
              "en": "Tax multiplier = 0.8 ÷ 0.2 = 4. A $20B tax cut × 4 = $80B increase in real GDP.",
              "es": "Multiplicador de impuestos = 0.8 ÷ 0.2 = 4. Un recorte de $20 mil millones × 4 = aumento de $80 mil millones."
            }
          },
          {
            "id": "apm326",
            "topic": "mult",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "Real GDP is $40 billion below full employment and the MPC is 0.75. How much new government spending (in billions) closes the gap?",
              "es": "El PIB real está $40 mil millones por debajo del pleno empleo y la PMgC es 0.75. ¿Cuánto gasto público nuevo (en miles de millones) cierra la brecha?"
            },
            "a": 10,
            "tol": 0,
            "why": {
              "en": "Spending multiplier = 1 ÷ (1 − 0.75) = 4. Needed spending = gap ÷ multiplier = 40 ÷ 4 = $10 billion.",
              "es": "Multiplicador del gasto = 1 ÷ (1 − 0.75) = 4. Gasto necesario = brecha ÷ multiplicador = 40 ÷ 4 = $10 mil millones."
            }
          },
          {
            "id": "apm327",
            "topic": "mult",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "If government spending and taxes both rise by $50 billion, the balanced-budget multiplier says real GDP rises by:",
              "es": "Si el gasto público y los impuestos suben $50 mil millones cada uno, el multiplicador de presupuesto equilibrado dice que el PIB real sube:"
            },
            "c": {
              "en": [
                "$50 billion",
                "$0",
                "$250 billion",
                "$100 billion"
              ],
              "es": [
                "$50 mil millones",
                "$0",
                "$250 mil millones",
                "$100 mil millones"
              ]
            },
            "a": 0,
            "why": {
              "en": "The balanced-budget multiplier is 1, so equal changes in G and T change GDP by the same amount: $50 billion.",
              "es": "El multiplicador de presupuesto equilibrado es 1: cambios iguales en G y T cambian el PIB en ese mismo monto, $50 mil millones."
            }
          },
          {
            "id": "apm334",
            "topic": "fiscal",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Contractionary fiscal policy to fight an inflationary gap would be:",
              "es": "Una política fiscal contractiva para combatir una brecha inflacionaria sería:"
            },
            "c": {
              "en": [
                "Raising taxes or cutting government spending",
                "Cutting taxes or raising government spending",
                "The Fed selling bonds",
                "Lowering the reserve requirement"
              ],
              "es": [
                "Subir impuestos o recortar el gasto público",
                "Bajar impuestos o aumentar el gasto público",
                "Que la Fed venda bonos",
                "Bajar el encaje legal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Fiscal policy is Congress and the President changing taxes and spending. To shift AD left, raise taxes or cut spending. Bond sales and reserve requirements are monetary policy.",
              "es": "La política fiscal es el Congreso y el Presidente cambiando impuestos y gasto. Para desplazar la DA a la izquierda, se suben impuestos o se recorta el gasto. Los bonos y el encaje son política monetaria."
            }
          },
          {
            "id": "apm335",
            "topic": "fiscal",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every example of an automatic stabilizer.",
              "es": "Selecciona cada ejemplo de estabilizador automático."
            },
            "c": {
              "en": [
                "Unemployment insurance payments rising in a recession",
                "Progressive income-tax revenue falling as incomes fall",
                "Congress passing a new highway bill",
                "A one-time stimulus check approved by Congress"
              ],
              "es": [
                "Más pagos de seguro de desempleo en una recesión",
                "Menos recaudación del impuesto progresivo al caer los ingresos",
                "El Congreso aprobando una nueva ley de carreteras",
                "Un cheque de estímulo único aprobado por el Congreso"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "Automatic stabilizers kick in without new laws. Unemployment benefits and progressive taxes adjust on their own; a highway bill or stimulus check is discretionary.",
              "es": "Los estabilizadores automáticos actúan sin leyes nuevas. El seguro de desempleo y los impuestos progresivos se ajustan solos; una ley de carreteras o un cheque de estímulo son discrecionales."
            }
          },
          {
            "id": "apm336",
            "topic": "fiscal",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Draw it in words: the economy is in a recessionary gap and the government increases spending. On the AD–AS graph, the short-run result is:",
              "es": "Descríbelo: la economía está en una brecha recesiva y el gobierno aumenta el gasto. En el gráfico DA–OA, el resultado de corto plazo es:"
            },
            "c": {
              "en": [
                "AD shifts right; real GDP and the price level rise",
                "AD shifts right; real GDP rises and the price level falls",
                "SRAS shifts right; prices fall",
                "LRAS shifts right immediately"
              ],
              "es": [
                "La DA se desplaza a la derecha; suben el PIB real y el nivel de precios",
                "La DA a la derecha; sube el PIB real y baja el nivel de precios",
                "La OACP a la derecha; bajan los precios",
                "La OALP se desplaza a la derecha de inmediato"
              ]
            },
            "a": 0,
            "why": {
              "en": "More G raises AD. Moving up along SRAS, both output and the price level increase, closing the gap.",
              "es": "Más G aumenta la DA. Al moverse sobre la OACP, suben la producción y el nivel de precios, cerrando la brecha."
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
              "en": "A customer moves $500 from her savings account into her checking account. What happens?",
              "es": "Una clienta pasa $500 de su cuenta de ahorros a su cuenta corriente. ¿Qué pasa?"
            },
            "c": {
              "en": [
                "M1 rises; M2 is unchanged",
                "M1 and M2 both rise",
                "M1 falls; M2 rises",
                "Neither changes"
              ],
              "es": [
                "M1 sube; M2 no cambia",
                "M1 y M2 suben",
                "M1 baja; M2 sube",
                "Ninguno cambia"
              ]
            },
            "a": 0,
            "why": {
              "en": "Checking deposits are in M1; savings deposits are in M2 only. M2 already included both, so its total stays the same while M1 grows.",
              "es": "Los depósitos a la vista están en M1; los de ahorro solo en M2. M2 ya incluía ambos, así que no cambia, pero M1 crece."
            }
          },
          {
            "id": "apm405",
            "topic": "money",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which is a store of value?",
              "es": "¿Cuál es un depósito de valor?"
            },
            "c": {
              "en": [
                "Saving $200 in a bank to spend next year",
                "Paying $5 for lunch",
                "Comparing two prices on a menu",
                "Swiping a credit card"
              ],
              "es": [
                "Ahorrar $200 en el banco para gastarlos el próximo año",
                "Pagar $5 por el almuerzo",
                "Comparar dos precios en un menú",
                "Usar una tarjeta de crédito"
              ]
            },
            "a": 0,
            "why": {
              "en": "Money held to spend later is acting as a store of value. Buying lunch is a medium of exchange; comparing prices is a unit of account.",
              "es": "El dinero guardado para gastar después actúa como depósito de valor. Comprar el almuerzo es medio de cambio; comparar precios es unidad de cuenta."
            }
          },
          {
            "id": "apm414",
            "topic": "bank",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "On a bank's balance sheet (T-account), customers' checking deposits are:",
              "es": "En el balance de un banco (cuenta T), los depósitos a la vista de los clientes son:"
            },
            "c": {
              "en": [
                "Liabilities, because the bank owes them to depositors",
                "Assets, because the bank holds the cash",
                "Owners' equity",
                "Required reserves only"
              ],
              "es": [
                "Pasivos, porque el banco se los debe a los depositantes",
                "Activos, porque el banco tiene el efectivo",
                "Capital de los dueños",
                "Solo reservas obligatorias"
              ]
            },
            "a": 0,
            "why": {
              "en": "Deposits are money the bank owes back to customers, so they're liabilities. The reserves and loans those deposits fund are the bank's assets.",
              "es": "Los depósitos son dinero que el banco debe a sus clientes: son pasivos. Las reservas y los préstamos que financian son activos."
            }
          },
          {
            "id": "apm415",
            "topic": "bank",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "A bank has $1,000,000 in deposits and the reserve requirement is 10%. It holds $150,000 in reserves. What are its excess reserves, in dollars?",
              "es": "Un banco tiene $1,000,000 en depósitos y el encaje es 10%. Tiene $150,000 en reservas. ¿Cuántas son sus reservas excedentes, en dólares?"
            },
            "a": 50000,
            "tol": 0,
            "why": {
              "en": "Required reserves = 10% × $1,000,000 = $100,000. Excess = $150,000 − $100,000 = $50,000.",
              "es": "Reservas obligatorias = 10% × $1,000,000 = $100,000. Excedentes = $150,000 − $100,000 = $50,000."
            }
          },
          {
            "id": "apm416",
            "topic": "bank",
            "type": "numeric",
            "diff": 3,
            "q": {
              "en": "The Fed buys $10 million in bonds from a bank. The reserve requirement is 20%. What is the maximum change in the money supply, in millions?",
              "es": "La Fed compra $10 millones en bonos a un banco. El encaje es 20%. ¿Cuál es el cambio máximo de la oferta monetaria, en millones?"
            },
            "a": 50,
            "tol": 0,
            "why": {
              "en": "Buying from a bank adds $10M in excess reserves. Multiplier = 1 ÷ 0.20 = 5. Max change = 10 × 5 = $50 million.",
              "es": "Comprarle a un banco añade $10M en reservas excedentes. Multiplicador = 1 ÷ 0.20 = 5. Cambio máximo = 10 × 5 = $50 millones."
            }
          },
          {
            "id": "apm417",
            "topic": "bank",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Why is the real-world money multiplier usually smaller than 1 ÷ reserve requirement?",
              "es": "¿Por qué el multiplicador monetario real suele ser menor que 1 ÷ encaje?"
            },
            "c": {
              "en": [
                "Banks hold excess reserves and people keep some cash out of banks",
                "The Fed pays no interest on reserves",
                "Loans are not counted in M1",
                "Deposits are assets of the bank"
              ],
              "es": [
                "Los bancos guardan reservas excedentes y la gente mantiene efectivo fuera del banco",
                "La Fed no paga interés sobre reservas",
                "Los préstamos no cuentan en M1",
                "Los depósitos son activos del banco"
              ]
            },
            "a": 0,
            "why": {
              "en": "The simple multiplier assumes every dollar is re-lent and re-deposited. Excess reserves and cash leakages break that chain, so less money is created.",
              "es": "El multiplicador simple supone que cada dólar se presta y se vuelve a depositar. Las reservas excedentes y el efectivo fuera del banco rompen esa cadena."
            }
          },
          {
            "id": "apm423",
            "topic": "fed",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In today's ample-reserves system, the Fed's main tool for moving the federal funds rate is:",
              "es": "En el sistema actual de reservas amplias, la herramienta principal de la Fed para mover la tasa de fondos federales es:"
            },
            "c": {
              "en": [
                "Changing the interest rate it pays on reserves (IORB)",
                "Changing the reserve requirement every month",
                "Printing currency and mailing it to households",
                "Raising income taxes"
              ],
              "es": [
                "Cambiar la tasa que paga sobre las reservas (IORB)",
                "Cambiar el encaje cada mes",
                "Imprimir billetes y enviarlos a los hogares",
                "Subir el impuesto sobre la renta"
              ]
            },
            "a": 0,
            "why": {
              "en": "With ample reserves, the Fed sets administered rates — mainly interest on reserve balances — to steer the federal funds rate. Raising IORB pushes market rates up.",
              "es": "Con reservas amplias, la Fed fija tasas administradas, sobre todo el interés sobre reservas, para guiar la tasa de fondos federales. Subir el IORB eleva las tasas de mercado."
            }
          },
          {
            "id": "apm424",
            "topic": "fed",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The discount rate is:",
              "es": "La tasa de descuento es:"
            },
            "c": {
              "en": [
                "The interest rate the Fed charges banks for loans",
                "The rate banks charge each other overnight",
                "The rate stores offer on sale items",
                "The rate banks pay savers"
              ],
              "es": [
                "La tasa que la Fed cobra a los bancos por préstamos",
                "La tasa que los bancos se cobran entre sí de un día para otro",
                "El descuento de las tiendas en rebajas",
                "La tasa que los bancos pagan a los ahorradores"
              ]
            },
            "a": 0,
            "why": {
              "en": "The discount rate is what the Fed charges banks that borrow from it. The federal funds rate is what banks charge each other.",
              "es": "La tasa de descuento es lo que cobra la Fed a los bancos que le piden prestado. La tasa de fondos federales es la que se cobran los bancos entre sí."
            }
          },
          {
            "id": "apm434",
            "topic": "monpol",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In the money market graph, the Fed sells bonds. Which describes the result?",
              "es": "En el gráfico del mercado de dinero, la Fed vende bonos. ¿Qué describe el resultado?"
            },
            "c": {
              "en": [
                "Money supply shifts left; the nominal interest rate rises",
                "Money demand shifts right; the interest rate falls",
                "Money supply shifts right; the interest rate falls",
                "Nothing changes"
              ],
              "es": [
                "La oferta monetaria se desplaza a la izquierda; sube la tasa nominal",
                "La demanda de dinero a la derecha; baja la tasa",
                "La oferta monetaria a la derecha; baja la tasa",
                "No cambia nada"
              ]
            },
            "a": 0,
            "why": {
              "en": "Selling bonds pulls reserves out of banks. The vertical money supply curve shifts left and the nominal interest rate rises.",
              "es": "Vender bonos retira reservas de los bancos. La curva vertical de oferta monetaria se desplaza a la izquierda y sube la tasa nominal."
            }
          },
          {
            "id": "apm435",
            "topic": "monpol",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Holding the money supply fixed, a rise in nominal GDP (more transactions) will:",
              "es": "Con la oferta monetaria fija, un aumento del PIB nominal (más transacciones):"
            },
            "c": {
              "en": [
                "Shift money demand right and raise the nominal interest rate",
                "Shift money supply right",
                "Lower the nominal interest rate",
                "Shift money demand left"
              ],
              "es": [
                "Desplaza la demanda de dinero a la derecha y sube la tasa nominal",
                "Desplaza la oferta monetaria a la derecha",
                "Baja la tasa nominal",
                "Desplaza la demanda de dinero a la izquierda"
              ]
            },
            "a": 0,
            "why": {
              "en": "People need more money to make more transactions, so money demand rises. With supply fixed, the interest rate rises.",
              "es": "La gente necesita más dinero para más transacciones, así que sube la demanda de dinero. Con la oferta fija, sube la tasa."
            }
          },
          {
            "id": "apm440",
            "topic": "lf",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In the loanable funds market, a government budget deficit (more government borrowing) will:",
              "es": "En el mercado de fondos prestables, un déficit público (más endeudamiento del gobierno):"
            },
            "c": {
              "en": [
                "Increase demand for loanable funds and raise the real interest rate",
                "Increase supply of loanable funds and lower the real rate",
                "Lower demand and lower the real rate",
                "Leave the real interest rate unchanged"
              ],
              "es": [
                "Aumenta la demanda de fondos prestables y sube la tasa de interés real",
                "Aumenta la oferta de fondos prestables y baja la tasa real",
                "Baja la demanda y la tasa real",
                "Deja igual la tasa real"
              ]
            },
            "a": 0,
            "why": {
              "en": "The government borrows by competing for savings, so demand for loanable funds shifts right and the real interest rate rises. That higher rate can crowd out private investment.",
              "es": "El gobierno compite por el ahorro, así que la demanda de fondos prestables se desplaza a la derecha y sube la tasa real. Esa tasa más alta puede desplazar la inversión privada."
            }
          },
          {
            "id": "apm441",
            "topic": "lf",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Households decide to save a larger share of their income. In the loanable funds market:",
              "es": "Los hogares deciden ahorrar más de su ingreso. En el mercado de fondos prestables:"
            },
            "c": {
              "en": [
                "Supply shifts right and the real interest rate falls",
                "Demand shifts right and the real interest rate rises",
                "Supply shifts left and the real rate rises",
                "Nothing happens"
              ],
              "es": [
                "La oferta se desplaza a la derecha y baja la tasa real",
                "La demanda a la derecha y sube la tasa real",
                "La oferta a la izquierda y sube la tasa real",
                "No pasa nada"
              ]
            },
            "a": 0,
            "why": {
              "en": "Savings are the supply of loanable funds. More saving shifts supply right, lowering the real interest rate and encouraging investment.",
              "es": "El ahorro es la oferta de fondos prestables. Más ahorro la desplaza a la derecha, baja la tasa real y estimula la inversión."
            }
          },
          {
            "id": "apm442",
            "topic": "lf",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Which pairing is correct?",
              "es": "¿Qué pareja es correcta?"
            },
            "c": {
              "en": [
                "Money market → nominal interest rate; loanable funds → real interest rate",
                "Money market → real rate; loanable funds → nominal rate",
                "Both graphs use the price level on the vertical axis",
                "Both graphs use the exchange rate"
              ],
              "es": [
                "Mercado de dinero → tasa nominal; fondos prestables → tasa real",
                "Mercado de dinero → tasa real; fondos prestables → tasa nominal",
                "Ambos gráficos usan el nivel de precios en el eje vertical",
                "Ambos gráficos usan el tipo de cambio"
              ]
            },
            "a": 0,
            "why": {
              "en": "On the AP exam, the money market graph shows the nominal interest rate; the loanable funds graph shows the real interest rate.",
              "es": "En el examen AP, el gráfico del mercado de dinero muestra la tasa nominal; el de fondos prestables muestra la tasa real."
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
          },
          {
            "id": "lf",
            "en": "Money & Loanable Funds Markets",
            "es": "Mercados de dinero y fondos prestables"
          }
        ]
      },
      {
        "id": "ap-m5",
        "title": {
          "en": "Macro Unit 5 · Long-Run Consequences of Stabilization Policies",
          "es": "Macro Unidad 5 · Consecuencias de largo plazo de las políticas de estabilización"
        },
        "brief": {
          "en": "Policies that help in the short run can have different long-run effects. In the short run, fiscal and monetary policy move the economy along the short-run Phillips curve: lower unemployment comes with higher inflation. In the long run the Phillips curve is vertical at the natural rate of unemployment, so pushing unemployment below that rate only raises inflation expectations. The quantity theory of money (MV = PQ) shows why rapid money growth causes inflation in the long run. Persistent budget deficits add to the national debt; government borrowing can raise real interest rates and crowd out private investment, which slows growth in the capital stock. Long-run economic growth comes from more and better capital, human capital, technology, and institutions, which shift LRAS and the PPC outward.",
          "es": "Las políticas que ayudan a corto plazo pueden tener efectos distintos a largo plazo. A corto plazo, la política fiscal y monetaria mueven la economía a lo largo de la curva de Phillips de corto plazo: menos desempleo viene con más inflación. A largo plazo la curva de Phillips es vertical en la tasa natural de desempleo, así que bajar el desempleo por debajo de esa tasa solo eleva las expectativas de inflación. La teoría cuantitativa del dinero (MV = PQ) muestra por qué un crecimiento rápido del dinero causa inflación a largo plazo. Los déficits persistentes aumentan la deuda nacional; el endeudamiento público puede subir las tasas reales y desplazar la inversión privada, frenando el crecimiento del capital. El crecimiento de largo plazo viene de más y mejor capital, capital humano, tecnología e instituciones, que desplazan la OALP y la FPP hacia afuera."
        },
        "items": [
          {
            "id": "apm501",
            "topic": "pc",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The short-run Phillips curve shows a trade-off between:",
              "es": "La curva de Phillips de corto plazo muestra una disyuntiva entre:"
            },
            "c": {
              "en": [
                "Inflation and unemployment",
                "Interest rates and investment",
                "Exports and imports",
                "Taxes and spending"
              ],
              "es": [
                "Inflación y desempleo",
                "Tasas de interés e inversión",
                "Exportaciones e importaciones",
                "Impuestos y gasto"
              ]
            },
            "a": 0,
            "why": {
              "en": "Along the SRPC, lower unemployment comes with higher inflation and vice versa.",
              "es": "Sobre la CPCP, menos desempleo viene con más inflación y viceversa."
            }
          },
          {
            "id": "apm502",
            "topic": "pc",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The long-run Phillips curve is vertical at:",
              "es": "La curva de Phillips de largo plazo es vertical en:"
            },
            "c": {
              "en": [
                "The natural rate of unemployment",
                "Zero unemployment",
                "Zero inflation",
                "The cyclical unemployment rate"
              ],
              "es": [
                "La tasa natural de desempleo",
                "Desempleo cero",
                "Inflación cero",
                "La tasa de desempleo cíclico"
              ]
            },
            "a": 0,
            "why": {
              "en": "In the long run there is no trade-off: unemployment returns to the natural rate whatever the inflation rate. The LRPC matches the vertical LRAS.",
              "es": "A largo plazo no hay disyuntiva: el desempleo vuelve a la tasa natural con cualquier inflación. La CPLP corresponde a la OALP vertical."
            }
          },
          {
            "id": "apm503",
            "topic": "pc",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "AD increases. On the Phillips curve graph, the short-run effect is:",
              "es": "Aumenta la DA. En el gráfico de Phillips, el efecto de corto plazo es:"
            },
            "c": {
              "en": [
                "A move up and to the left along the SRPC",
                "A move down and to the right along the SRPC",
                "The SRPC shifts left",
                "The LRPC shifts right"
              ],
              "es": [
                "Un movimiento hacia arriba y a la izquierda sobre la CPCP",
                "Un movimiento hacia abajo y a la derecha sobre la CPCP",
                "La CPCP se desplaza a la izquierda",
                "La CPLP se desplaza a la derecha"
              ]
            },
            "a": 0,
            "why": {
              "en": "More AD raises output (lower unemployment) and the price level (higher inflation): up and to the left along the SRPC. AD changes move you ALONG the SRPC.",
              "es": "Más DA sube la producción (menos desempleo) y los precios (más inflación): arriba y a la izquierda sobre la CPCP. Los cambios en la DA mueven la economía A LO LARGO de la CPCP."
            }
          },
          {
            "id": "apm504",
            "topic": "pc",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A negative supply shock (oil prices spike) affects the Phillips curve by:",
              "es": "Un choque de oferta negativo (sube el petróleo) afecta la curva de Phillips así:"
            },
            "c": {
              "en": [
                "Shifting the SRPC to the right",
                "Moving down along the SRPC",
                "Shifting the LRPC left",
                "Having no effect"
              ],
              "es": [
                "Desplaza la CPCP a la derecha",
                "Mueve hacia abajo sobre la CPCP",
                "Desplaza la CPLP a la izquierda",
                "No tiene efecto"
              ]
            },
            "a": 0,
            "why": {
              "en": "An SRAS shift left raises both inflation and unemployment, which is a rightward shift of the SRPC. SRAS shifts shift the SRPC in the opposite direction.",
              "es": "Un desplazamiento de la OACP a la izquierda sube la inflación y el desempleo: la CPCP se desplaza a la derecha. Los cambios en la OACP mueven la CPCP en sentido opuesto."
            }
          },
          {
            "id": "apm505",
            "topic": "pc",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "People come to expect higher inflation. The SRPC:",
              "es": "La gente empieza a esperar más inflación. La CPCP:"
            },
            "c": {
              "en": [
                "Shifts up/right",
                "Shifts down/left",
                "Becomes vertical immediately",
                "Does not change"
              ],
              "es": [
                "Se desplaza hacia arriba/derecha",
                "Se desplaza hacia abajo/izquierda",
                "Se vuelve vertical de inmediato",
                "No cambia"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher expected inflation means workers demand higher wages, raising costs. Every unemployment rate now comes with more inflation, so the SRPC shifts up.",
              "es": "Más inflación esperada lleva a pedir salarios más altos y suben los costos. Cada tasa de desempleo viene con más inflación: la CPCP se desplaza hacia arriba."
            }
          },
          {
            "id": "apm506",
            "topic": "pc",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Actual unemployment is 4% and the natural rate is 5%. How many percentage points below the natural rate is the economy?",
              "es": "El desempleo es 4% y la tasa natural es 5%. ¿Cuántos puntos porcentuales por debajo de la tasa natural está la economía?"
            },
            "a": 1,
            "tol": 0,
            "why": {
              "en": "5% − 4% = 1 percentage point. Unemployment below the natural rate signals an inflationary gap: a point to the left of the LRPC.",
              "es": "5% − 4% = 1 punto porcentual. Desempleo por debajo de la tasa natural indica una brecha inflacionaria: un punto a la izquierda de la CPLP."
            }
          },
          {
            "id": "apm510",
            "topic": "qtm",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "In the equation of exchange MV = PQ, the letter V stands for:",
              "es": "En la ecuación de cambio MV = PQ, la V significa:"
            },
            "c": {
              "en": [
                "The velocity of money",
                "The value of exports",
                "The volume of loans",
                "Variable costs"
              ],
              "es": [
                "La velocidad del dinero",
                "El valor de las exportaciones",
                "El volumen de préstamos",
                "Costos variables"
              ]
            },
            "a": 0,
            "why": {
              "en": "V is velocity: how many times a dollar is spent in a year. M is money supply, P is the price level, Q is real output; PQ is nominal GDP.",
              "es": "V es velocidad: cuántas veces se gasta un dólar al año. M es la oferta monetaria, P el nivel de precios, Q la producción real; PQ es el PIB nominal."
            }
          },
          {
            "id": "apm511",
            "topic": "qtm",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Money supply = $2 trillion and nominal GDP = $20 trillion. What is the velocity of money?",
              "es": "Oferta monetaria = $2 billones y PIB nominal = $20 billones. ¿Cuál es la velocidad del dinero?"
            },
            "a": 10,
            "tol": 0,
            "why": {
              "en": "V = PQ ÷ M = 20 ÷ 2 = 10. Each dollar is spent about 10 times a year.",
              "es": "V = PQ ÷ M = 20 ÷ 2 = 10. Cada dólar se gasta unas 10 veces al año."
            }
          },
          {
            "id": "apm512",
            "topic": "qtm",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "According to the quantity theory of money, if V and Q are constant and the money supply doubles, then:",
              "es": "Según la teoría cuantitativa del dinero, si V y Q son constantes y la oferta monetaria se duplica:"
            },
            "c": {
              "en": [
                "The price level doubles",
                "Real output doubles",
                "Velocity falls by half",
                "Nothing changes"
              ],
              "es": [
                "El nivel de precios se duplica",
                "La producción real se duplica",
                "La velocidad cae a la mitad",
                "No cambia nada"
              ]
            },
            "a": 0,
            "why": {
              "en": "With V and Q fixed, MV = PQ means P must rise in proportion to M. That's why long-run inflation is 'too much money chasing too few goods.'",
              "es": "Con V y Q fijos, MV = PQ obliga a que P suba en proporción a M. Por eso la inflación de largo plazo es 'demasiado dinero persiguiendo pocos bienes'."
            }
          },
          {
            "id": "apm513",
            "topic": "qtm",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In the long run, an increase in the money supply affects:",
              "es": "A largo plazo, un aumento de la oferta monetaria afecta:"
            },
            "c": {
              "en": [
                "The price level, but not real output",
                "Real output, but not prices",
                "Both real output and LRAS permanently",
                "Only the unemployment rate"
              ],
              "es": [
                "El nivel de precios, pero no la producción real",
                "La producción real, pero no los precios",
                "La producción real y la OALP de forma permanente",
                "Solo el desempleo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Money is neutral in the long run: LRAS is vertical, so more money raises prices while real GDP returns to full employment.",
              "es": "El dinero es neutral a largo plazo: la OALP es vertical, así que más dinero sube los precios y el PIB real vuelve al pleno empleo."
            }
          },
          {
            "id": "apm520",
            "topic": "debt",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "A budget deficit occurs when, in one year:",
              "es": "Un déficit presupuestario ocurre cuando, en un año:"
            },
            "c": {
              "en": [
                "Government spending is greater than tax revenue",
                "Tax revenue is greater than spending",
                "Imports exceed exports",
                "The national debt is paid off"
              ],
              "es": [
                "El gasto público supera la recaudación",
                "La recaudación supera el gasto",
                "Las importaciones superan las exportaciones",
                "Se paga la deuda nacional"
              ]
            },
            "a": 0,
            "why": {
              "en": "A deficit is a one-year shortfall (G > T). The national debt is the total of all past deficits minus surpluses.",
              "es": "Un déficit es un faltante anual (G > T). La deuda nacional es la suma de todos los déficits pasados menos los superávits."
            }
          },
          {
            "id": "apm521",
            "topic": "debt",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "What is the difference between the deficit and the national debt?",
              "es": "¿Cuál es la diferencia entre el déficit y la deuda nacional?"
            },
            "c": {
              "en": [
                "The deficit is a one-year flow; the debt is the accumulated stock",
                "They mean the same thing",
                "The debt is one year; the deficit is accumulated",
                "Only states have deficits"
              ],
              "es": [
                "El déficit es un flujo anual; la deuda es el saldo acumulado",
                "Significan lo mismo",
                "La deuda es anual; el déficit es acumulado",
                "Solo los estados tienen déficits"
              ]
            },
            "a": 0,
            "why": {
              "en": "Think of a bathtub: the deficit is water pouring in this year; the debt is all the water in the tub.",
              "es": "Piensa en una bañera: el déficit es el agua que entra este año; la deuda es toda el agua acumulada."
            }
          },
          {
            "id": "apm522",
            "topic": "debt",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Crowding out happens when government borrowing:",
              "es": "El efecto expulsión ocurre cuando el endeudamiento público:"
            },
            "c": {
              "en": [
                "Raises real interest rates and reduces private investment",
                "Lowers real interest rates and raises investment",
                "Increases net exports",
                "Increases the money supply"
              ],
              "es": [
                "Sube las tasas reales y reduce la inversión privada",
                "Baja las tasas reales y sube la inversión",
                "Aumenta las exportaciones netas",
                "Aumenta la oferta monetaria"
              ]
            },
            "a": 0,
            "why": {
              "en": "Government demand for loanable funds pushes up the real rate, so some private investment no longer pays off. Less investment means a smaller future capital stock.",
              "es": "La demanda pública de fondos prestables sube la tasa real y parte de la inversión privada deja de ser rentable. Menos inversión significa menos capital en el futuro."
            }
          },
          {
            "id": "apm523",
            "topic": "debt",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Why might crowding out slow long-run economic growth?",
              "es": "¿Por qué el efecto expulsión podría frenar el crecimiento de largo plazo?"
            },
            "c": {
              "en": [
                "Less private investment means less physical capital, so LRAS grows more slowly",
                "It causes the money supply to shrink",
                "It lowers interest rates too much",
                "It raises net exports"
              ],
              "es": [
                "Menos inversión privada significa menos capital físico y la OALP crece más despacio",
                "Hace que la oferta monetaria se reduzca",
                "Baja demasiado las tasas de interés",
                "Sube las exportaciones netas"
              ]
            },
            "a": 0,
            "why": {
              "en": "Investment builds factories, machines and tools. If deficits crowd it out, the economy adds less capital and future productive capacity grows more slowly.",
              "es": "La inversión crea fábricas, máquinas y herramientas. Si el déficit la desplaza, se acumula menos capital y la capacidad futura crece más despacio."
            }
          },
          {
            "id": "apm524",
            "topic": "debt",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every way a government can finance a deficit.",
              "es": "Selecciona cada forma en que un gobierno puede financiar un déficit."
            },
            "c": {
              "en": [
                "Borrowing by selling Treasury bonds",
                "Raising taxes later to pay it back",
                "Running a trade surplus",
                "Lowering the reserve requirement"
              ],
              "es": [
                "Endeudarse vendiendo bonos del Tesoro",
                "Subir impuestos después para pagar",
                "Tener un superávit comercial",
                "Bajar el encaje legal"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "The Treasury borrows by selling bonds, and the debt is eventually serviced with future tax revenue. Trade balances and reserve requirements are not how the government pays for spending.",
              "es": "El Tesoro se endeuda vendiendo bonos y la deuda se atiende con impuestos futuros. La balanza comercial y el encaje no financian el gasto público."
            }
          },
          {
            "id": "apm530",
            "topic": "growth5",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Long-run economic growth is shown by:",
              "es": "El crecimiento económico de largo plazo se representa con:"
            },
            "c": {
              "en": [
                "LRAS and the PPC shifting outward",
                "A movement along AD",
                "SRAS shifting left",
                "A move inside the PPC"
              ],
              "es": [
                "La OALP y la FPP desplazándose hacia afuera",
                "Un movimiento sobre la DA",
                "La OACP a la izquierda",
                "Un movimiento hacia dentro de la FPP"
              ]
            },
            "a": 0,
            "why": {
              "en": "Growth means the economy can produce more at full employment: LRAS shifts right and the PPC shifts out.",
              "es": "Crecer significa poder producir más en pleno empleo: la OALP se desplaza a la derecha y la FPP hacia afuera."
            }
          },
          {
            "id": "apm531",
            "topic": "growth5",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every factor that raises productivity and long-run growth.",
              "es": "Selecciona cada factor que eleva la productividad y el crecimiento de largo plazo."
            },
            "c": {
              "en": [
                "More education and job training (human capital)",
                "New technology",
                "More physical capital per worker",
                "A temporary rise in consumer spending"
              ],
              "es": [
                "Más educación y capacitación (capital humano)",
                "Nueva tecnología",
                "Más capital físico por trabajador",
                "Un aumento temporal del consumo"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Human capital, technology and physical capital raise output per worker. A spending boom shifts AD, not long-run capacity.",
              "es": "El capital humano, la tecnología y el capital físico elevan la producción por trabajador. Un auge del gasto desplaza la DA, no la capacidad de largo plazo."
            }
          },
          {
            "id": "apm532",
            "topic": "growth5",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which policy is most likely to raise long-run growth?",
              "es": "¿Qué política es más probable que eleve el crecimiento de largo plazo?"
            },
            "c": {
              "en": [
                "Tax credits for business investment in new equipment",
                "A one-time stimulus check",
                "Raising tariffs on imported machines",
                "Cutting funding for schools"
              ],
              "es": [
                "Créditos fiscales a la inversión empresarial en equipos",
                "Un cheque de estímulo único",
                "Subir aranceles a máquinas importadas",
                "Recortar fondos a las escuelas"
              ]
            },
            "a": 0,
            "why": {
              "en": "Investment incentives add to the capital stock, raising productivity and shifting LRAS right. A stimulus check mainly shifts AD in the short run.",
              "es": "Los incentivos a la inversión aumentan el capital, la productividad y desplazan la OALP. Un cheque de estímulo desplaza la DA a corto plazo."
            }
          },
          {
            "id": "apm533",
            "topic": "growth5",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Supply-side economists argue that cutting marginal tax rates can:",
              "es": "Los economistas de la oferta sostienen que bajar las tasas impositivas marginales puede:"
            },
            "c": {
              "en": [
                "Increase incentives to work, save and invest, shifting LRAS right",
                "Shift only AD left",
                "Lower the natural rate of output",
                "Reduce the money supply"
              ],
              "es": [
                "Aumentar los incentivos a trabajar, ahorrar e invertir y desplazar la OALP",
                "Desplazar solo la DA a la izquierda",
                "Bajar la producción natural",
                "Reducir la oferta monetaria"
              ]
            },
            "a": 0,
            "why": {
              "en": "Supply-siders focus on incentives: lower tax rates may increase labor, saving and investment, expanding productive capacity. Critics argue the effects are smaller and deficits can rise.",
              "es": "Los partidarios de la oferta se centran en incentivos: tasas más bajas pueden aumentar el trabajo, el ahorro y la inversión. Los críticos dicen que el efecto es menor y que el déficit puede crecer."
            }
          },
          {
            "id": "apm534",
            "topic": "growth5",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Real GDP per capita grows from $50,000 to $51,500 in a year. What is the growth rate, in percent?",
              "es": "El PIB real per cápita pasa de $50,000 a $51,500 en un año. ¿Cuál es la tasa de crecimiento, en porcentaje?"
            },
            "a": 3,
            "tol": 0,
            "why": {
              "en": "(51,500 − 50,000) ÷ 50,000 × 100 = 3%.",
              "es": "(51,500 − 50,000) ÷ 50,000 × 100 = 3%."
            }
          },
          {
            "id": "apm535",
            "topic": "pc",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A central bank keeps expanding the money supply to hold unemployment below the natural rate. In the long run:",
              "es": "Un banco central sigue expandiendo el dinero para mantener el desempleo por debajo de la tasa natural. A largo plazo:"
            },
            "c": {
              "en": [
                "Unemployment returns to the natural rate and inflation keeps rising",
                "Unemployment stays low permanently with stable prices",
                "Real GDP rises permanently above potential",
                "The LRPC shifts left"
              ],
              "es": [
                "El desempleo vuelve a la tasa natural y la inflación sigue subiendo",
                "El desempleo queda bajo para siempre con precios estables",
                "El PIB real queda por encima del potencial para siempre",
                "La CPLP se desplaza a la izquierda"
              ]
            },
            "a": 0,
            "why": {
              "en": "Expectations catch up: the SRPC keeps shifting up. The economy ends on the vertical LRPC at the natural rate, only with higher inflation.",
              "es": "Las expectativas se ajustan: la CPCP sigue subiendo. La economía termina en la CPLP vertical, en la tasa natural, pero con más inflación."
            }
          },
          {
            "id": "apm536",
            "topic": "debt",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which statement about the national debt is accurate?",
              "es": "¿Qué afirmación sobre la deuda nacional es correcta?"
            },
            "c": {
              "en": [
                "Interest payments on the debt compete with other parts of the federal budget",
                "The debt disappears when the deficit shrinks",
                "Only foreign countries hold U.S. debt",
                "The debt is the same as the trade deficit"
              ],
              "es": [
                "Los intereses de la deuda compiten con otras partidas del presupuesto",
                "La deuda desaparece cuando el déficit se reduce",
                "Solo países extranjeros tienen deuda de EE. UU.",
                "La deuda es lo mismo que el déficit comercial"
              ]
            },
            "a": 0,
            "why": {
              "en": "A shrinking deficit still adds to the debt. Much of the debt is held by Americans and U.S. institutions, and rising interest costs take budget room from other programs.",
              "es": "Un déficit menor igual suma a la deuda. Gran parte la tienen estadounidenses e instituciones de EE. UU., y los intereses quitan espacio a otros programas."
            }
          },
          {
            "id": "apm507",
            "topic": "pc",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Contractionary monetary policy, in the short run, moves the economy:",
              "es": "La política monetaria contractiva, a corto plazo, mueve la economía:"
            },
            "c": {
              "en": [
                "Down and to the right along the SRPC",
                "Up and to the left along the SRPC",
                "Onto a new LRPC to the left",
                "Nowhere; money is neutral in the short run"
              ],
              "es": [
                "Hacia abajo y a la derecha sobre la CPCP",
                "Hacia arriba y a la izquierda sobre la CPCP",
                "A una nueva CPLP a la izquierda",
                "A ningún lado; el dinero es neutral a corto plazo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher rates reduce AD: inflation falls and unemployment rises, a move down and right along the SRPC. Money is neutral only in the long run.",
              "es": "Tasas más altas reducen la DA: baja la inflación y sube el desempleo, abajo y a la derecha sobre la CPCP. El dinero solo es neutral a largo plazo."
            }
          },
          {
            "id": "apm514",
            "topic": "qtm",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Money supply grows 6% a year, velocity is stable, and real GDP grows 2% a year. Using the quantity theory, inflation is about:",
              "es": "La oferta monetaria crece 6% al año, la velocidad es estable y el PIB real crece 2%. Según la teoría cuantitativa, la inflación es de aproximadamente:"
            },
            "c": {
              "en": [
                "4%",
                "8%",
                "2%",
                "6%"
              ],
              "es": [
                "4%",
                "8%",
                "2%",
                "6%"
              ]
            },
            "a": 0,
            "why": {
              "en": "%ΔM + %ΔV ≈ %ΔP + %ΔQ → 6% + 0 ≈ %ΔP + 2%, so inflation ≈ 4%.",
              "es": "%ΔM + %ΔV ≈ %ΔP + %ΔQ → 6% + 0 ≈ %ΔP + 2%, así que la inflación ≈ 4%."
            }
          },
          {
            "id": "apm525",
            "topic": "debt",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Which combination would most reduce crowding out while closing a recessionary gap?",
              "es": "¿Qué combinación reduciría más el efecto expulsión al cerrar una brecha recesiva?"
            },
            "c": {
              "en": [
                "Expansionary fiscal policy paired with expansionary monetary policy",
                "Expansionary fiscal policy paired with the Fed selling bonds",
                "Raising taxes and cutting spending",
                "Raising the reserve requirement"
              ],
              "es": [
                "Política fiscal expansiva junto con política monetaria expansiva",
                "Política fiscal expansiva con la Fed vendiendo bonos",
                "Subir impuestos y recortar el gasto",
                "Subir el encaje legal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Deficit spending pushes rates up; the Fed buying bonds pushes rates down, offsetting the rise and protecting private investment.",
              "es": "El gasto deficitario sube las tasas; la Fed comprando bonos las baja, compensa el aumento y protege la inversión privada."
            }
          },
          {
            "id": "apm537",
            "topic": "growth5",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Public investment in roads, ports and broadband is called:",
              "es": "La inversión pública en carreteras, puertos y banda ancha se llama:"
            },
            "c": {
              "en": [
                "Infrastructure, which can raise productivity",
                "Transfer payments",
                "Monetary policy",
                "Net exports"
              ],
              "es": [
                "Infraestructura, que puede elevar la productividad",
                "Transferencias",
                "Política monetaria",
                "Exportaciones netas"
              ]
            },
            "a": 0,
            "why": {
              "en": "Infrastructure is public capital. It lowers business costs and can raise productivity, shifting LRAS right over time.",
              "es": "La infraestructura es capital público. Baja los costos de las empresas y puede elevar la productividad, desplazando la OALP con el tiempo."
            }
          }
        ],
        "topics": [
          {
            "id": "pc",
            "en": "The Phillips Curve",
            "es": "La curva de Phillips"
          },
          {
            "id": "qtm",
            "en": "Money Growth & Inflation",
            "es": "Crecimiento del dinero e inflación"
          },
          {
            "id": "debt",
            "en": "Deficits, Debt & Crowding Out",
            "es": "Déficit, deuda y efecto expulsión"
          },
          {
            "id": "growth5",
            "en": "Economic Growth",
            "es": "Crecimiento económico"
          }
        ],
        "vocab": [
          {
            "t": "pc",
            "w": {
              "en": "Short-run Phillips curve",
              "es": "Curva de Phillips de corto plazo"
            },
            "d": {
              "en": "A downward curve showing the short-run trade-off between inflation and unemployment.",
              "es": "Curva descendente que muestra la disyuntiva de corto plazo entre inflación y desempleo."
            }
          },
          {
            "t": "pc",
            "w": {
              "en": "Long-run Phillips curve",
              "es": "Curva de Phillips de largo plazo"
            },
            "d": {
              "en": "A vertical line at the natural rate of unemployment — no long-run trade-off.",
              "es": "Línea vertical en la tasa natural de desempleo: no hay disyuntiva a largo plazo."
            }
          },
          {
            "t": "pc",
            "w": {
              "en": "Natural rate of unemployment",
              "es": "Tasa natural de desempleo"
            },
            "d": {
              "en": "Unemployment at full employment: frictional plus structural, no cyclical.",
              "es": "Desempleo en pleno empleo: friccional más estructural, sin cíclico."
            }
          },
          {
            "t": "qtm",
            "w": {
              "en": "Quantity theory of money",
              "es": "Teoría cuantitativa del dinero"
            },
            "d": {
              "en": "MV = PQ: in the long run, faster money growth means higher inflation.",
              "es": "MV = PQ: a largo plazo, más crecimiento del dinero significa más inflación."
            }
          },
          {
            "t": "qtm",
            "w": {
              "en": "Velocity of money",
              "es": "Velocidad del dinero"
            },
            "d": {
              "en": "How many times the average dollar is spent in a year (nominal GDP ÷ money supply).",
              "es": "Cuántas veces se gasta un dólar promedio al año (PIB nominal ÷ oferta monetaria)."
            }
          },
          {
            "t": "qtm",
            "w": {
              "en": "Money neutrality",
              "es": "Neutralidad del dinero"
            },
            "d": {
              "en": "In the long run, changing the money supply changes prices but not real output.",
              "es": "A largo plazo, cambiar el dinero cambia los precios, no la producción real."
            }
          },
          {
            "t": "debt",
            "w": {
              "en": "Budget deficit",
              "es": "Déficit presupuestario"
            },
            "d": {
              "en": "When government spending exceeds tax revenue in one year.",
              "es": "Cuando el gasto público supera la recaudación en un año."
            }
          },
          {
            "t": "debt",
            "w": {
              "en": "National debt",
              "es": "Deuda nacional"
            },
            "d": {
              "en": "The total amount the federal government owes: past deficits minus surpluses.",
              "es": "Lo que debe en total el gobierno federal: déficits pasados menos superávits."
            }
          },
          {
            "t": "debt",
            "w": {
              "en": "Crowding out",
              "es": "Efecto expulsión"
            },
            "d": {
              "en": "Government borrowing raises real interest rates and reduces private investment.",
              "es": "El endeudamiento público sube las tasas reales y reduce la inversión privada."
            }
          },
          {
            "t": "growth5",
            "w": {
              "en": "Productivity",
              "es": "Productividad"
            },
            "d": {
              "en": "Output per worker or per hour; the main driver of rising living standards.",
              "es": "Producción por trabajador u hora; el motor principal del nivel de vida."
            }
          },
          {
            "t": "growth5",
            "w": {
              "en": "Human capital",
              "es": "Capital humano"
            },
            "d": {
              "en": "The knowledge and skills workers gain through education and training.",
              "es": "Los conocimientos y destrezas que los trabajadores adquieren con educación y capacitación."
            }
          },
          {
            "t": "growth5",
            "w": {
              "en": "Supply-side policy",
              "es": "Política de oferta"
            },
            "d": {
              "en": "Policies aimed at incentives to work, save and invest, to shift LRAS right.",
              "es": "Políticas que buscan incentivar el trabajo, el ahorro y la inversión para desplazar la OALP."
            }
          }
        ]
      },
      {
        "id": "ap-m6",
        "title": {
          "en": "Macro Unit 6 · Open Economy: International Trade and Finance",
          "es": "Macro Unidad 6 · Economía abierta: comercio y finanzas internacionales"
        },
        "brief": {
          "en": "Countries record their transactions with the rest of the world in the balance of payments. The current account tracks trade in goods and services plus income and transfers; the capital and financial account tracks purchases of assets such as stocks, bonds, factories and real estate. The two sides must balance: a current account deficit is matched by a financial account surplus. Exchange rates are prices set in the foreign exchange market by the supply and demand for currencies. When a currency appreciates, a country's exports become more expensive and imports cheaper, so net exports fall; depreciation does the opposite. Higher real interest rates attract foreign financial capital, which increases demand for the domestic currency and makes it appreciate. Monetary and fiscal policy therefore affect exchange rates and net exports.",
          "es": "Los países registran sus transacciones con el resto del mundo en la balanza de pagos. La cuenta corriente registra el comercio de bienes y servicios más ingresos y transferencias; la cuenta de capital y financiera registra compras de activos como acciones, bonos, fábricas e inmuebles. Ambos lados deben equilibrarse: un déficit en cuenta corriente se compensa con un superávit en la cuenta financiera. Los tipos de cambio son precios fijados en el mercado de divisas por la oferta y la demanda de monedas. Cuando una moneda se aprecia, las exportaciones del país se encarecen y las importaciones se abaratan, así que caen las exportaciones netas; la depreciación hace lo contrario. Tasas de interés reales más altas atraen capital financiero extranjero, lo que aumenta la demanda de la moneda nacional y la aprecia. Por eso la política monetaria y fiscal afectan los tipos de cambio y las exportaciones netas."
        },
        "items": [
          {
            "id": "apm601",
            "topic": "bop",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "U.S. exports and imports of goods and services are recorded in the:",
              "es": "Las exportaciones e importaciones de bienes y servicios de EE. UU. se registran en la:"
            },
            "c": {
              "en": [
                "Current account",
                "Financial account",
                "Federal budget",
                "Money supply"
              ],
              "es": [
                "Cuenta corriente",
                "Cuenta financiera",
                "Presupuesto federal",
                "Oferta monetaria"
              ]
            },
            "a": 0,
            "why": {
              "en": "Trade in goods and services, plus investment income and transfers, goes in the current account.",
              "es": "El comercio de bienes y servicios, más rentas y transferencias, va en la cuenta corriente."
            }
          },
          {
            "id": "apm602",
            "topic": "bop",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A Japanese company buys a factory in Ohio. In the U.S. balance of payments, this is recorded in the:",
              "es": "Una empresa japonesa compra una fábrica en Ohio. En la balanza de pagos de EE. UU., esto se registra en la:"
            },
            "c": {
              "en": [
                "Financial (capital) account, as an inflow",
                "Current account, as an export",
                "Current account, as an import",
                "Federal budget"
              ],
              "es": [
                "Cuenta financiera (de capital), como entrada",
                "Cuenta corriente, como exportación",
                "Cuenta corriente, como importación",
                "Presupuesto federal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Buying a real asset in the U.S. is foreign direct investment: a financial account inflow for the U.S.",
              "es": "Comprar un activo real en EE. UU. es inversión extranjera directa: una entrada en la cuenta financiera de EE. UU."
            }
          },
          {
            "id": "apm603",
            "topic": "bop",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "If a country has a current account deficit, its financial account must have:",
              "es": "Si un país tiene déficit en cuenta corriente, su cuenta financiera debe tener:"
            },
            "c": {
              "en": [
                "A surplus of about the same size",
                "A deficit of the same size",
                "A balance of exactly zero",
                "No relationship"
              ],
              "es": [
                "Un superávit de tamaño similar",
                "Un déficit del mismo tamaño",
                "Un saldo de cero exacto",
                "Ninguna relación"
              ]
            },
            "a": 0,
            "why": {
              "en": "The balance of payments balances. Dollars spent on extra imports come back as foreigners buy U.S. assets, so a current account deficit pairs with a financial account surplus.",
              "es": "La balanza de pagos se equilibra. Los dólares gastados en importaciones regresan cuando extranjeros compran activos de EE. UU.: déficit corriente con superávit financiero."
            }
          },
          {
            "id": "apm604",
            "topic": "bop",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Exports of goods = $300B, imports of goods = $420B. What is the balance of trade in goods, in billions? (Use a minus sign for a deficit.)",
              "es": "Exportaciones de bienes = $300 mil millones, importaciones = $420 mil millones. ¿Cuál es la balanza comercial de bienes, en miles de millones? (Usa signo menos para un déficit.)"
            },
            "a": -120,
            "tol": 0,
            "why": {
              "en": "300 − 420 = −120: a $120 billion goods trade deficit.",
              "es": "300 − 420 = −120: un déficit comercial de $120 mil millones."
            }
          },
          {
            "id": "apm605",
            "topic": "bop",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An American student pays tuition to a university in Spain. For the U.S., this is:",
              "es": "Una estudiante estadounidense paga matrícula a una universidad en España. Para EE. UU., esto es:"
            },
            "c": {
              "en": [
                "An import of a service (current account debit)",
                "An export of a service",
                "A financial account inflow",
                "Not recorded"
              ],
              "es": [
                "Una importación de servicios (débito en cuenta corriente)",
                "Una exportación de servicios",
                "Una entrada en la cuenta financiera",
                "No se registra"
              ]
            },
            "a": 0,
            "why": {
              "en": "Education bought from abroad is an imported service, recorded as a debit in the U.S. current account.",
              "es": "La educación comprada en el extranjero es un servicio importado: un débito en la cuenta corriente."
            }
          },
          {
            "id": "apm610",
            "topic": "fx",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "If the exchange rate changes from 100 yen per dollar to 120 yen per dollar, the dollar has:",
              "es": "Si el tipo de cambio pasa de 100 yenes por dólar a 120 yenes por dólar, el dólar se ha:"
            },
            "c": {
              "en": [
                "Appreciated",
                "Depreciated",
                "Stayed the same",
                "Been devalued by the Fed"
              ],
              "es": [
                "Apreciado",
                "Depreciado",
                "Mantenido igual",
                "Devaluado por la Fed"
              ]
            },
            "a": 0,
            "why": {
              "en": "One dollar now buys more yen, so the dollar appreciated (and the yen depreciated).",
              "es": "Un dólar ahora compra más yenes: el dólar se apreció (y el yen se depreció)."
            }
          },
          {
            "id": "apm611",
            "topic": "fx",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "If $1 = 0.80 euros, how many dollars does 1 euro cost? (Two decimals.)",
              "es": "Si $1 = 0.80 euros, ¿cuántos dólares cuesta 1 euro? (Dos decimales.)"
            },
            "a": 1.25,
            "tol": 0.01,
            "why": {
              "en": "Take the reciprocal: 1 ÷ 0.80 = $1.25 per euro.",
              "es": "Saca el recíproco: 1 ÷ 0.80 = $1.25 por euro."
            }
          },
          {
            "id": "apm612",
            "topic": "fx",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "When the dollar appreciates, what happens to U.S. net exports?",
              "es": "Cuando el dólar se aprecia, ¿qué pasa con las exportaciones netas de EE. UU.?"
            },
            "c": {
              "en": [
                "They fall: exports cost more abroad and imports cost less",
                "They rise",
                "They do not change",
                "Only imports fall"
              ],
              "es": [
                "Bajan: las exportaciones cuestan más afuera y las importaciones menos",
                "Suben",
                "No cambian",
                "Solo bajan las importaciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "A stronger dollar makes U.S. goods pricier for foreigners and foreign goods cheaper for Americans. Net exports fall, shifting U.S. AD left.",
              "es": "Un dólar fuerte encarece los bienes de EE. UU. y abarata los extranjeros. Bajan las exportaciones netas y la DA se desplaza a la izquierda."
            }
          },
          {
            "id": "apm613",
            "topic": "fx",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In the market for U.S. dollars (traded for euros), who supplies dollars?",
              "es": "En el mercado de dólares (cambiados por euros), ¿quién ofrece dólares?"
            },
            "c": {
              "en": [
                "Americans who want to buy European goods or assets",
                "Europeans who want to buy U.S. goods",
                "The European Central Bank only",
                "U.S. exporters"
              ],
              "es": [
                "Estadounidenses que quieren comprar bienes o activos europeos",
                "Europeos que quieren comprar bienes de EE. UU.",
                "Solo el Banco Central Europeo",
                "Exportadores de EE. UU."
              ]
            },
            "a": 0,
            "why": {
              "en": "To buy European things, Americans trade dollars for euros: they supply dollars. Europeans buying U.S. goods demand dollars.",
              "es": "Para comprar cosas europeas, los estadounidenses cambian dólares por euros: ofrecen dólares. Los europeos que compran bienes de EE. UU. demandan dólares."
            }
          },
          {
            "id": "apm614",
            "topic": "fx",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A U.S. car company sells cars in Mexico. Which exchange-rate change helps it most?",
              "es": "Una empresa automotriz de EE. UU. vende carros en México. ¿Qué cambio en el tipo de cambio la ayuda más?"
            },
            "c": {
              "en": [
                "The dollar depreciates against the peso",
                "The dollar appreciates against the peso",
                "The peso depreciates against the dollar",
                "No change"
              ],
              "es": [
                "El dólar se deprecia frente al peso",
                "El dólar se aprecia frente al peso",
                "El peso se deprecia frente al dólar",
                "Ningún cambio"
              ]
            },
            "a": 0,
            "why": {
              "en": "A weaker dollar (stronger peso) lowers the peso price of U.S. cars, so Mexican buyers purchase more.",
              "es": "Un dólar débil (peso fuerte) baja el precio en pesos de los carros de EE. UU. y los compradores mexicanos compran más."
            }
          },
          {
            "id": "apm620",
            "topic": "fxshift",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Europeans develop a strong taste for U.S.-made sneakers. In the foreign exchange market for dollars:",
              "es": "A los europeos les encantan los tenis fabricados en EE. UU. En el mercado de divisas del dólar:"
            },
            "c": {
              "en": [
                "Demand for dollars rises and the dollar appreciates",
                "Supply of dollars rises and the dollar depreciates",
                "Demand for dollars falls",
                "Nothing happens"
              ],
              "es": [
                "Sube la demanda de dólares y el dólar se aprecia",
                "Sube la oferta de dólares y el dólar se deprecia",
                "Baja la demanda de dólares",
                "No pasa nada"
              ]
            },
            "a": 0,
            "why": {
              "en": "To buy U.S. sneakers, Europeans need dollars, so demand for dollars rises and the dollar appreciates.",
              "es": "Para comprar tenis de EE. UU., los europeos necesitan dólares: sube la demanda y el dólar se aprecia."
            }
          },
          {
            "id": "apm621",
            "topic": "fxshift",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "U.S. inflation rises faster than inflation in Canada. Over time the U.S. dollar tends to:",
              "es": "La inflación de EE. UU. sube más rápido que la de Canadá. Con el tiempo, el dólar tiende a:"
            },
            "c": {
              "en": [
                "Depreciate against the Canadian dollar",
                "Appreciate against the Canadian dollar",
                "Stay fixed",
                "Disappear from FX markets"
              ],
              "es": [
                "Depreciarse frente al dólar canadiense",
                "Apreciarse frente al dólar canadiense",
                "Quedarse fijo",
                "Desaparecer del mercado de divisas"
              ]
            },
            "a": 0,
            "why": {
              "en": "U.S. goods become relatively expensive, so Canadians buy fewer (less demand for USD) and Americans buy more Canadian goods (more supply of USD). The dollar depreciates.",
              "es": "Los bienes de EE. UU. se encarecen: los canadienses compran menos (menos demanda de USD) y los estadounidenses más bienes canadienses (más oferta de USD). El dólar se deprecia."
            }
          },
          {
            "id": "apm622",
            "topic": "fxshift",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every change that would make the U.S. dollar APPRECIATE.",
              "es": "Selecciona cada cambio que haría que el dólar se APRECIE."
            },
            "c": {
              "en": [
                "Higher real interest rates in the U.S.",
                "Foreign tourists flocking to U.S. theme parks",
                "Americans buying more imported electronics",
                "Rising U.S. inflation relative to other countries"
              ],
              "es": [
                "Tasas reales más altas en EE. UU.",
                "Turistas extranjeros llenando parques temáticos de EE. UU.",
                "Estadounidenses comprando más electrónicos importados",
                "Más inflación en EE. UU. que en otros países"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "Higher U.S. rates attract foreign savers and tourists need dollars: both raise demand for USD. Buying imports supplies dollars, and relative inflation weakens the dollar.",
              "es": "Tasas más altas atraen ahorradores y los turistas necesitan dólares: sube la demanda de USD. Comprar importaciones ofrece dólares y la inflación relativa debilita el dólar."
            }
          },
          {
            "id": "apm623",
            "topic": "fxshift",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "If the yen appreciates against the dollar, then the dollar has:",
              "es": "Si el yen se aprecia frente al dólar, entonces el dólar se ha:"
            },
            "c": {
              "en": [
                "Depreciated against the yen",
                "Appreciated against the yen",
                "Stayed the same",
                "Appreciated against every currency"
              ],
              "es": [
                "Depreciado frente al yen",
                "Apreciado frente al yen",
                "Mantenido igual",
                "Apreciado frente a todas las monedas"
              ]
            },
            "a": 0,
            "why": {
              "en": "Exchange rates are two sides of one price: if one currency gains against another, the other loses.",
              "es": "El tipo de cambio es un mismo precio visto de dos lados: si una moneda gana frente a otra, la otra pierde."
            }
          },
          {
            "id": "apm630",
            "topic": "flows",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Fed raises interest rates. What happens to the dollar and U.S. net exports?",
              "es": "La Fed sube las tasas de interés. ¿Qué pasa con el dólar y las exportaciones netas de EE. UU.?"
            },
            "c": {
              "en": [
                "The dollar appreciates and net exports fall",
                "The dollar depreciates and net exports rise",
                "The dollar appreciates and net exports rise",
                "No effect on either"
              ],
              "es": [
                "El dólar se aprecia y bajan las exportaciones netas",
                "El dólar se deprecia y suben las exportaciones netas",
                "El dólar se aprecia y suben las exportaciones netas",
                "Ningún efecto"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher U.S. rates attract foreign financial capital, raising demand for dollars. The stronger dollar makes exports pricier and imports cheaper, so net exports fall.",
              "es": "Tasas más altas atraen capital extranjero y sube la demanda de dólares. El dólar fuerte encarece las exportaciones y abarata las importaciones: bajan las exportaciones netas."
            }
          },
          {
            "id": "apm631",
            "topic": "flows",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Expansionary monetary policy in the U.S. (lower interest rates) tends to:",
              "es": "Una política monetaria expansiva en EE. UU. (tasas más bajas) tiende a:"
            },
            "c": {
              "en": [
                "Depreciate the dollar and raise net exports, adding to AD",
                "Appreciate the dollar and lower net exports",
                "Have no effect on trade",
                "Increase financial capital inflows"
              ],
              "es": [
                "Depreciar el dólar y subir las exportaciones netas, sumando a la DA",
                "Apreciar el dólar y bajar las exportaciones netas",
                "No afectar el comercio",
                "Aumentar las entradas de capital financiero"
              ]
            },
            "a": 0,
            "why": {
              "en": "Lower rates send financial capital abroad, reducing demand for dollars. The weaker dollar boosts net exports, reinforcing the AD increase.",
              "es": "Tasas más bajas sacan capital al exterior y baja la demanda de dólares. El dólar débil impulsa las exportaciones netas y refuerza el aumento de la DA."
            }
          },
          {
            "id": "apm632",
            "topic": "flows",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A large U.S. budget deficit raises U.S. real interest rates. The likely chain is:",
              "es": "Un gran déficit de EE. UU. sube las tasas reales. La cadena probable es:"
            },
            "c": {
              "en": [
                "Capital inflows ↑ → dollar appreciates → net exports ↓",
                "Capital inflows ↓ → dollar depreciates → net exports ↑",
                "Dollar depreciates → imports ↑",
                "No effect on trade"
              ],
              "es": [
                "Entradas de capital ↑ → dólar se aprecia → exportaciones netas ↓",
                "Entradas de capital ↓ → dólar se deprecia → exportaciones netas ↑",
                "El dólar se deprecia → importaciones ↑",
                "Ningún efecto en el comercio"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher real rates attract foreign savers, the dollar appreciates, and net exports fall. Economists sometimes call this international crowding out.",
              "es": "Tasas reales más altas atraen ahorradores extranjeros, el dólar se aprecia y bajan las exportaciones netas. A veces se llama efecto expulsión internacional."
            }
          },
          {
            "id": "apm633",
            "topic": "flows",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Financial capital tends to flow toward countries with:",
              "es": "El capital financiero tiende a fluir hacia países con:"
            },
            "c": {
              "en": [
                "Relatively higher real interest rates",
                "Relatively lower real interest rates",
                "Higher inflation and lower rates",
                "Larger trade deficits only"
              ],
              "es": [
                "Tasas de interés reales relativamente más altas",
                "Tasas reales relativamente más bajas",
                "Más inflación y tasas más bajas",
                "Solo mayores déficits comerciales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Savers look for the best real return, so capital flows toward higher real interest rates.",
              "es": "Los ahorradores buscan el mejor rendimiento real, así que el capital va hacia tasas reales más altas."
            }
          },
          {
            "id": "apm634",
            "topic": "flows",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A country wants to make its exports cheaper without changing tariffs. Its central bank could:",
              "es": "Un país quiere abaratar sus exportaciones sin cambiar aranceles. Su banco central podría:"
            },
            "c": {
              "en": [
                "Lower interest rates to depreciate its currency",
                "Raise interest rates to appreciate its currency",
                "Raise the reserve requirement",
                "Sell government bonds"
              ],
              "es": [
                "Bajar las tasas para depreciar su moneda",
                "Subir las tasas para apreciar su moneda",
                "Subir el encaje legal",
                "Vender bonos del gobierno"
              ]
            },
            "a": 0,
            "why": {
              "en": "Lower rates reduce demand for the currency, depreciating it and making exports cheaper for foreign buyers.",
              "es": "Tasas más bajas reducen la demanda de la moneda, la deprecian y abaratan las exportaciones."
            }
          },
          {
            "id": "apm635",
            "topic": "bop",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every transaction recorded in the U.S. financial account.",
              "es": "Selecciona cada transacción registrada en la cuenta financiera de EE. UU."
            },
            "c": {
              "en": [
                "A Canadian buys U.S. Treasury bonds",
                "An American buys shares of a German company",
                "The U.S. exports soybeans to China",
                "An American tourist eats in Paris"
              ],
              "es": [
                "Un canadiense compra bonos del Tesoro de EE. UU.",
                "Un estadounidense compra acciones de una empresa alemana",
                "EE. UU. exporta soya a China",
                "Un turista estadounidense come en París"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "Buying and selling assets (bonds, stocks, real estate, factories) is in the financial account. Soybeans and meals abroad are goods and services in the current account.",
              "es": "Comprar y vender activos (bonos, acciones, inmuebles, fábricas) va en la cuenta financiera. La soya y las comidas son bienes y servicios de la cuenta corriente."
            }
          },
          {
            "id": "apm636",
            "topic": "fx",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The euro depreciates against the dollar. Which group in the U.S. benefits most directly?",
              "es": "El euro se deprecia frente al dólar. ¿Qué grupo en EE. UU. se beneficia más directamente?"
            },
            "c": {
              "en": [
                "Americans traveling to Europe",
                "U.S. firms exporting to Europe",
                "U.S. hotels that host European tourists",
                "European importers of U.S. goods"
              ],
              "es": [
                "Estadounidenses que viajan a Europa",
                "Empresas de EE. UU. que exportan a Europa",
                "Hoteles de EE. UU. con turistas europeos",
                "Importadores europeos de bienes de EE. UU."
              ]
            },
            "a": 0,
            "why": {
              "en": "A weaker euro means each dollar buys more euros, so travel in Europe is cheaper for Americans. U.S. exporters and hotels lose European customers.",
              "es": "Un euro débil significa que cada dólar compra más euros: viajar a Europa es más barato. Los exportadores y hoteles de EE. UU. pierden clientes europeos."
            }
          },
          {
            "id": "apm606",
            "topic": "bop",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The United States has run a current account deficit for decades. This means that, overall:",
              "es": "EE. UU. ha tenido déficit en cuenta corriente por décadas. Esto significa que, en general:"
            },
            "c": {
              "en": [
                "Foreigners have been buying more U.S. assets than Americans buy abroad",
                "The U.S. has been exporting more than it imports",
                "The federal budget is balanced",
                "The dollar is fixed by law"
              ],
              "es": [
                "Los extranjeros compran más activos de EE. UU. que los estadounidenses en el exterior",
                "EE. UU. exporta más de lo que importa",
                "El presupuesto federal está equilibrado",
                "El dólar está fijado por ley"
              ]
            },
            "a": 0,
            "why": {
              "en": "A current account deficit is financed by a financial account surplus: net foreign purchases of U.S. stocks, bonds and other assets.",
              "es": "Un déficit corriente se financia con superávit financiero: compras netas extranjeras de acciones, bonos y otros activos de EE. UU."
            }
          },
          {
            "id": "apm615",
            "topic": "fx",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A hotel room in London costs £200. If £1 = $1.30, the room costs an American:",
              "es": "Una habitación de hotel en Londres cuesta £200. Si £1 = $1.30, a un estadounidense le cuesta:"
            },
            "c": {
              "en": [
                "$260",
                "$154",
                "$200",
                "$230"
              ],
              "es": [
                "$260",
                "$154",
                "$200",
                "$230"
              ]
            },
            "a": 0,
            "why": {
              "en": "£200 × $1.30 per pound = $260.",
              "es": "£200 × $1.30 por libra = $260."
            }
          },
          {
            "id": "apm624",
            "topic": "fxshift",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "U.S. consumers buy many more Japanese cars. In the market for yen:",
              "es": "Los consumidores de EE. UU. compran muchos más carros japoneses. En el mercado de yenes:"
            },
            "c": {
              "en": [
                "Demand for yen rises and the yen appreciates",
                "Supply of yen rises and the yen depreciates",
                "Demand for yen falls",
                "The dollar appreciates against the yen"
              ],
              "es": [
                "Sube la demanda de yenes y el yen se aprecia",
                "Sube la oferta de yenes y el yen se deprecia",
                "Baja la demanda de yenes",
                "El dólar se aprecia frente al yen"
              ]
            },
            "a": 0,
            "why": {
              "en": "Buying Japanese cars requires yen, so demand for yen rises and the yen appreciates (the dollar depreciates).",
              "es": "Comprar carros japoneses requiere yenes: sube la demanda de yenes y el yen se aprecia (el dólar se deprecia)."
            }
          },
          {
            "id": "apm637",
            "topic": "flows",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Investors fear a crisis abroad and rush to buy safe U.S. Treasury bonds. The dollar will most likely:",
              "es": "Los inversionistas temen una crisis en el exterior y compran bonos del Tesoro de EE. UU. El dólar probablemente:"
            },
            "c": {
              "en": [
                "Appreciate, lowering U.S. net exports",
                "Depreciate, raising U.S. net exports",
                "Stay the same",
                "Depreciate, lowering imports"
              ],
              "es": [
                "Se aprecie, bajando las exportaciones netas de EE. UU.",
                "Se deprecie, subiendo las exportaciones netas",
                "Se mantenga igual",
                "Se deprecie, bajando las importaciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "Buying U.S. bonds requires dollars, so demand for dollars rises. A stronger dollar lowers U.S. net exports.",
              "es": "Comprar bonos de EE. UU. requiere dólares: sube su demanda. Un dólar fuerte baja las exportaciones netas."
            }
          }
        ],
        "topics": [
          {
            "id": "bop",
            "en": "Balance of Payments",
            "es": "Balanza de pagos"
          },
          {
            "id": "fx",
            "en": "Exchange Rates",
            "es": "Tipos de cambio"
          },
          {
            "id": "fxshift",
            "en": "What Moves a Currency",
            "es": "Qué mueve una moneda"
          },
          {
            "id": "flows",
            "en": "Policy, Rates & Capital Flows",
            "es": "Política, tasas y flujos de capital"
          }
        ],
        "vocab": [
          {
            "t": "bop",
            "w": {
              "en": "Balance of payments",
              "es": "Balanza de pagos"
            },
            "d": {
              "en": "The record of all transactions between a country and the rest of the world.",
              "es": "Registro de todas las transacciones entre un país y el resto del mundo."
            }
          },
          {
            "t": "bop",
            "w": {
              "en": "Current account",
              "es": "Cuenta corriente"
            },
            "d": {
              "en": "Trade in goods and services, plus investment income and transfers.",
              "es": "Comercio de bienes y servicios, más rentas de inversión y transferencias."
            }
          },
          {
            "t": "bop",
            "w": {
              "en": "Financial account",
              "es": "Cuenta financiera"
            },
            "d": {
              "en": "Purchases and sales of assets like stocks, bonds, factories and real estate.",
              "es": "Compras y ventas de activos como acciones, bonos, fábricas e inmuebles."
            }
          },
          {
            "t": "fx",
            "w": {
              "en": "Exchange rate",
              "es": "Tipo de cambio"
            },
            "d": {
              "en": "The price of one currency in terms of another.",
              "es": "El precio de una moneda en términos de otra."
            }
          },
          {
            "t": "fx",
            "w": {
              "en": "Appreciation",
              "es": "Apreciación"
            },
            "d": {
              "en": "A currency buys more of another currency than before; exports get pricier.",
              "es": "Una moneda compra más de otra que antes; las exportaciones se encarecen."
            }
          },
          {
            "t": "fx",
            "w": {
              "en": "Depreciation",
              "es": "Depreciación"
            },
            "d": {
              "en": "A currency buys less of another currency than before; exports get cheaper.",
              "es": "Una moneda compra menos de otra que antes; las exportaciones se abaratan."
            }
          },
          {
            "t": "fxshift",
            "w": {
              "en": "Foreign exchange market",
              "es": "Mercado de divisas"
            },
            "d": {
              "en": "Where currencies are bought and sold; supply and demand set the exchange rate.",
              "es": "Donde se compran y venden monedas; la oferta y la demanda fijan el tipo de cambio."
            }
          },
          {
            "t": "fxshift",
            "w": {
              "en": "Relative inflation",
              "es": "Inflación relativa"
            },
            "d": {
              "en": "A country with faster inflation sees its currency weaken over time.",
              "es": "Un país con inflación más rápida ve su moneda debilitarse con el tiempo."
            }
          },
          {
            "t": "flows",
            "w": {
              "en": "Capital inflow",
              "es": "Entrada de capital"
            },
            "d": {
              "en": "Foreign savers buying a country's assets; pushes up demand for its currency.",
              "es": "Ahorradores extranjeros que compran activos del país; sube la demanda de su moneda."
            }
          },
          {
            "t": "flows",
            "w": {
              "en": "Real interest rate differential",
              "es": "Diferencial de tasas reales"
            },
            "d": {
              "en": "The gap between countries' real rates that steers financial capital.",
              "es": "La diferencia de tasas reales entre países que guía el capital financiero."
            }
          },
          {
            "t": "flows",
            "w": {
              "en": "Net exports",
              "es": "Exportaciones netas"
            },
            "d": {
              "en": "Exports minus imports; the (X − M) part of aggregate demand.",
              "es": "Exportaciones menos importaciones; la parte (X − M) de la demanda agregada."
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
          },
          {
            "id": "gov111",
            "topic": "documents",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The Magna Carta (1215) mattered to the Founders because it established that:",
              "es": "La Carta Magna (1215) importó a los Fundadores porque estableció que:"
            },
            "c": {
              "en": [
                "Even the king is subject to the law",
                "Kings rule by divine right",
                "All men can vote",
                "Colonies should be independent"
              ],
              "es": [
                "Incluso el rey está sujeto a la ley",
                "Los reyes gobiernan por derecho divino",
                "Todos los hombres pueden votar",
                "Las colonias debían ser independientes"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Magna Carta limited the monarch's power and introduced the rule of law, an idea built into the Constitution.",
              "es": "La Carta Magna limitó el poder del monarca e introdujo el Estado de derecho, idea incluida en la Constitución."
            }
          },
          {
            "id": "gov112",
            "topic": "documents",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Mayflower Compact (1620) is an early American example of:",
              "es": "El Pacto del Mayflower (1620) es un ejemplo temprano estadounidense de:"
            },
            "c": {
              "en": [
                "Self-government by agreement of the governed",
                "Absolute monarchy",
                "A national bill of rights",
                "Judicial review"
              ],
              "es": [
                "Autogobierno por acuerdo de los gobernados",
                "Monarquía absoluta",
                "Una carta de derechos nacional",
                "Revisión judicial"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Pilgrims agreed to form a 'civil body politic' and follow laws they made together: consent and self-government.",
              "es": "Los peregrinos acordaron formar un 'cuerpo político civil' y seguir leyes hechas en común: consentimiento y autogobierno."
            }
          },
          {
            "id": "gov113",
            "topic": "documents",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The English Bill of Rights (1689) influenced the U.S. Bill of Rights by:",
              "es": "La Carta de Derechos inglesa (1689) influyó en la de EE. UU. al:"
            },
            "c": {
              "en": [
                "Banning cruel and unusual punishment and protecting the right to petition",
                "Creating the Electoral College",
                "Ending slavery",
                "Establishing federalism"
              ],
              "es": [
                "Prohibir castigos crueles e inusuales y proteger el derecho de petición",
                "Crear el Colegio Electoral",
                "Abolir la esclavitud",
                "Establecer el federalismo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Several protections in the U.S. Bill of Rights, including limits on cruel punishment and the right to petition, trace back to the English Bill of Rights.",
              "es": "Varias protecciones de la Carta de Derechos de EE. UU., como límites a castigos crueles y el derecho de petición, vienen de la inglesa."
            }
          },
          {
            "id": "gov114",
            "topic": "thinkers",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Thomas Paine's Common Sense (1776) persuaded colonists to:",
              "es": "El Sentido común de Thomas Paine (1776) convenció a los colonos de:"
            },
            "c": {
              "en": [
                "Support independence from Britain",
                "Ratify the Articles of Confederation",
                "Remain loyal to the king",
                "Adopt a national religion"
              ],
              "es": [
                "Apoyar la independencia de Gran Bretaña",
                "Ratificar los Artículos de la Confederación",
                "Seguir leales al rey",
                "Adoptar una religión nacional"
              ]
            },
            "a": 0,
            "why": {
              "en": "Common Sense used plain language to argue that monarchy was unjust and the colonies should be independent.",
              "es": "Sentido común usó lenguaje sencillo para argumentar que la monarquía era injusta y que las colonias debían independizarse."
            }
          },
          {
            "id": "gov115",
            "topic": "thinkers",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Montesquieu's main contribution to the Constitution was the idea of:",
              "es": "La principal contribución de Montesquieu a la Constitución fue la idea de:"
            },
            "c": {
              "en": [
                "Separating government power into branches",
                "Natural rights to life, liberty and property",
                "A strong monarch",
                "Direct democracy"
              ],
              "es": [
                "Separar el poder del gobierno en ramas",
                "Derechos naturales a la vida, la libertad y la propiedad",
                "Un monarca fuerte",
                "Democracia directa"
              ]
            },
            "a": 0,
            "why": {
              "en": "Montesquieu argued liberty is safest when legislative, executive and judicial powers are held by different bodies. Natural rights is Locke.",
              "es": "Montesquieu sostuvo que la libertad está más segura cuando los poderes se reparten entre órganos distintos. Los derechos naturales son de Locke."
            }
          },
          {
            "id": "gov116",
            "topic": "principles",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Under the Articles of Confederation, Congress could NOT:",
              "es": "Bajo los Artículos de la Confederación, el Congreso NO podía:"
            },
            "c": {
              "en": [
                "Collect taxes from the states",
                "Declare war",
                "Make treaties",
                "Send ambassadors"
              ],
              "es": [
                "Cobrar impuestos a los estados",
                "Declarar la guerra",
                "Firmar tratados",
                "Enviar embajadores"
              ]
            },
            "a": 0,
            "why": {
              "en": "Without the power to tax, the national government could only request money from states and often went unpaid.",
              "es": "Sin poder para cobrar impuestos, el gobierno nacional solo podía pedir dinero a los estados y a menudo no recibía nada."
            }
          },
          {
            "id": "gov117",
            "topic": "principles",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Shays' Rebellion (1786–87) convinced many leaders that:",
              "es": "La Rebelión de Shays (1786–87) convenció a muchos líderes de que:"
            },
            "c": {
              "en": [
                "A stronger national government was needed",
                "The Articles were working well",
                "States should leave the union",
                "Farmers should lose the vote"
              ],
              "es": [
                "Hacía falta un gobierno nacional más fuerte",
                "Los Artículos funcionaban bien",
                "Los estados debían salir de la unión",
                "Los agricultores debían perder el voto"
              ]
            },
            "a": 0,
            "why": {
              "en": "The national government could not raise an army to stop the uprising, exposing the weakness of the Articles and leading to the Constitutional Convention.",
              "es": "El gobierno nacional no pudo formar un ejército para detener la revuelta, lo que mostró la debilidad de los Artículos y llevó a la Convención Constitucional."
            }
          },
          {
            "id": "gov118",
            "topic": "principles",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Three-Fifths Compromise dealt with:",
              "es": "El Compromiso de los Tres Quintos trató sobre:"
            },
            "c": {
              "en": [
                "How enslaved people would be counted for representation and taxes",
                "How many senators each state gets",
                "The length of the president's term",
                "The voting age"
              ],
              "es": [
                "Cómo contar a las personas esclavizadas para representación e impuestos",
                "Cuántos senadores tiene cada estado",
                "La duración del mandato presidencial",
                "La edad para votar"
              ]
            },
            "a": 0,
            "why": {
              "en": "Southern states wanted enslaved people counted for House seats; the compromise counted three of every five, a deal that entrenched slavery's political power.",
              "es": "Los estados del sur querían contar a los esclavizados para la Cámara; el pacto contó tres de cada cinco, lo que reforzó el poder político de la esclavitud."
            }
          },
          {
            "id": "gov119",
            "topic": "principles",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Limited government means that:",
              "es": "Gobierno limitado significa que:"
            },
            "c": {
              "en": [
                "Government can only use the powers the people grant it",
                "Government has unlimited power in emergencies",
                "Only the rich can hold office",
                "There are no taxes"
              ],
              "es": [
                "El gobierno solo puede usar los poderes que el pueblo le da",
                "El gobierno tiene poder ilimitado en emergencias",
                "Solo los ricos pueden gobernar",
                "No hay impuestos"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Constitution lists and limits government power, and the Bill of Rights adds specific limits to protect individuals.",
              "es": "La Constitución enumera y limita el poder del gobierno, y la Carta de Derechos añade límites para proteger a las personas."
            }
          },
          {
            "id": "gov120",
            "topic": "documents",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which grievance appears in the Declaration of Independence?",
              "es": "¿Qué queja aparece en la Declaración de Independencia?"
            },
            "c": {
              "en": [
                "Imposing taxes without the colonists' consent",
                "Refusing to create a national bank",
                "Allowing too many immigrants to vote",
                "Failing to build railroads"
              ],
              "es": [
                "Imponer impuestos sin el consentimiento de los colonos",
                "Negarse a crear un banco nacional",
                "Permitir votar a demasiados inmigrantes",
                "No construir ferrocarriles"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Declaration lists the king's abuses, including 'imposing Taxes on us without our Consent' and quartering troops.",
              "es": "La Declaración enumera abusos del rey, como 'imponernos impuestos sin nuestro consentimiento' y alojar tropas."
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
          },
          {
            "id": "gov211",
            "topic": "powers",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Powers specifically listed for Congress in Article I, Section 8 are called:",
              "es": "Los poderes enumerados del Congreso en el Artículo I, Sección 8 se llaman:"
            },
            "c": {
              "en": [
                "Enumerated (expressed) powers",
                "Reserved powers",
                "Implied powers",
                "Inherent powers"
              ],
              "es": [
                "Poderes enumerados (expresos)",
                "Poderes reservados",
                "Poderes implícitos",
                "Poderes inherentes"
              ]
            },
            "a": 0,
            "why": {
              "en": "Enumerated powers are written out, like coining money and declaring war. Implied powers come from the Necessary and Proper Clause.",
              "es": "Los poderes enumerados están escritos, como acuñar moneda y declarar la guerra. Los implícitos vienen de la Cláusula Necesaria y Apropiada."
            }
          },
          {
            "id": "gov212",
            "topic": "powers",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Tenth Amendment says that powers not delegated to the national government are:",
              "es": "La Décima Enmienda dice que los poderes no delegados al gobierno nacional:"
            },
            "c": {
              "en": [
                "Reserved to the states or the people",
                "Given to the president",
                "Held by the Supreme Court",
                "Shared with foreign nations"
              ],
              "es": [
                "Quedan reservados a los estados o al pueblo",
                "Pasan al presidente",
                "Los tiene la Corte Suprema",
                "Se comparten con otras naciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Tenth Amendment protects state authority over areas like schools, elections and local police.",
              "es": "La Décima Enmienda protege la autoridad estatal en áreas como escuelas, elecciones y policía local."
            }
          },
          {
            "id": "gov213",
            "topic": "structure",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Article II of the Constitution establishes the:",
              "es": "El Artículo II de la Constitución establece el:"
            },
            "c": {
              "en": [
                "Executive branch",
                "Legislative branch",
                "Judicial branch",
                "Amendment process"
              ],
              "es": [
                "Poder ejecutivo",
                "Poder legislativo",
                "Poder judicial",
                "Proceso de enmienda"
              ]
            },
            "a": 0,
            "why": {
              "en": "Article I = Congress, Article II = President, Article III = courts, Article V = amendments.",
              "es": "Artículo I = Congreso, Artículo II = Presidente, Artículo III = tribunales, Artículo V = enmiendas."
            }
          },
          {
            "id": "gov214",
            "topic": "structure",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Article IV's Full Faith and Credit Clause requires states to:",
              "es": "La Cláusula de Plena Fe y Crédito del Artículo IV obliga a los estados a:"
            },
            "c": {
              "en": [
                "Honor the public records and court rulings of other states",
                "Use the same taxes",
                "Elect the same number of senators",
                "Share police forces"
              ],
              "es": [
                "Respetar los registros públicos y fallos judiciales de otros estados",
                "Usar los mismos impuestos",
                "Elegir el mismo número de senadores",
                "Compartir policías"
              ]
            },
            "a": 0,
            "why": {
              "en": "A driver's license, marriage or court judgment from Florida is recognized in other states because of Full Faith and Credit.",
              "es": "Una licencia, matrimonio o sentencia de Florida se reconoce en otros estados por la Plena Fe y Crédito."
            }
          },
          {
            "id": "gov215",
            "topic": "amending",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is the most common method of amending the Constitution?",
              "es": "¿Cuál es el método más común para enmendar la Constitución?"
            },
            "c": {
              "en": [
                "Two-thirds of Congress proposes; three-fourths of state legislatures ratify",
                "A national referendum",
                "The president signs an amendment",
                "The Supreme Court rewrites the text"
              ],
              "es": [
                "Dos tercios del Congreso proponen; tres cuartos de las legislaturas estatales ratifican",
                "Un referéndum nacional",
                "El presidente firma una enmienda",
                "La Corte Suprema reescribe el texto"
              ]
            },
            "a": 0,
            "why": {
              "en": "Nearly every amendment has followed this path. A national convention or state ratifying conventions are alternatives used rarely (state conventions only for the 21st Amendment).",
              "es": "Casi todas las enmiendas siguieron este camino. Las convenciones son alternativas poco usadas (las estatales solo para la Enmienda 21)."
            }
          },
          {
            "id": "gov216",
            "topic": "powers",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which power belongs to the national government only?",
              "es": "¿Qué poder pertenece solo al gobierno nacional?"
            },
            "c": {
              "en": [
                "Coining money",
                "Setting up public schools",
                "Issuing driver's licenses",
                "Running elections"
              ],
              "es": [
                "Acuñar moneda",
                "Crear escuelas públicas",
                "Emitir licencias de conducir",
                "Organizar elecciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "Coining money is a delegated national power. Schools, licenses and running elections are reserved state powers.",
              "es": "Acuñar moneda es un poder nacional delegado. Escuelas, licencias y elecciones son poderes reservados a los estados."
            }
          },
          {
            "id": "gov217",
            "topic": "structure",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Federal grants that come with conditions (for example, highway money tied to a drinking age of 21) show:",
              "es": "Las subvenciones federales con condiciones (por ejemplo, dinero para carreteras ligado a la edad de 21 años para beber) muestran:"
            },
            "c": {
              "en": [
                "How the national government influences state policy",
                "That states control the national budget",
                "Judicial review",
                "The Supremacy Clause being repealed"
              ],
              "es": [
                "Cómo el gobierno nacional influye en la política estatal",
                "Que los estados controlan el presupuesto nacional",
                "La revisión judicial",
                "Que se derogó la Cláusula de Supremacía"
              ]
            },
            "a": 0,
            "why": {
              "en": "Conditional grants let Washington steer areas it can't directly regulate. South Dakota v. Dole (1987) upheld the drinking-age condition.",
              "es": "Las subvenciones condicionadas permiten a Washington influir en áreas que no regula directamente. South Dakota v. Dole (1987) avaló la condición."
            }
          },
          {
            "id": "gov218",
            "topic": "amending",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Constitution has been amended how many times?",
              "es": "¿Cuántas veces se ha enmendado la Constitución?"
            },
            "c": {
              "en": [
                "27",
                "10",
                "33",
                "50"
              ],
              "es": [
                "27",
                "10",
                "33",
                "50"
              ]
            },
            "a": 0,
            "why": {
              "en": "There are 27 amendments. The first ten, ratified in 1791, are the Bill of Rights.",
              "es": "Hay 27 enmiendas. Las diez primeras, ratificadas en 1791, son la Carta de Derechos."
            }
          },
          {
            "id": "gov219",
            "topic": "structure",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Checks and balances means that:",
              "es": "Los pesos y contrapesos significan que:"
            },
            "c": {
              "en": [
                "Each branch can limit the powers of the others",
                "The branches never interact",
                "The president controls Congress",
                "States check the president"
              ],
              "es": [
                "Cada rama puede limitar los poderes de las otras",
                "Las ramas nunca interactúan",
                "El presidente controla al Congreso",
                "Los estados controlan al presidente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Examples: the president vetoes, Congress overrides and confirms judges, courts strike down laws.",
              "es": "Ejemplos: el presidente veta, el Congreso anula vetos y confirma jueces, los tribunales anulan leyes."
            }
          },
          {
            "id": "gov220",
            "topic": "powers",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "McCulloch v. Maryland (1819) ruled that:",
              "es": "McCulloch v. Maryland (1819) decidió que:"
            },
            "c": {
              "en": [
                "Congress has implied powers and states cannot tax a federal bank",
                "States may ignore federal law",
                "The national bank was unconstitutional",
                "Segregation was legal"
              ],
              "es": [
                "El Congreso tiene poderes implícitos y los estados no pueden gravar un banco federal",
                "Los estados pueden ignorar la ley federal",
                "El banco nacional era inconstitucional",
                "La segregación era legal"
              ]
            },
            "a": 0,
            "why": {
              "en": "Chief Justice Marshall used the Necessary and Proper Clause to uphold the bank and the Supremacy Clause to block Maryland's tax.",
              "es": "El juez Marshall usó la Cláusula Necesaria y Apropiada para avalar el banco y la de Supremacía para bloquear el impuesto de Maryland."
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
          },
          {
            "id": "gov311",
            "topic": "legislative",
            "type": "numeric",
            "diff": 1,
            "q": {
              "en": "How many senators serve in the U.S. Senate?",
              "es": "¿Cuántos senadores hay en el Senado de EE. UU.?"
            },
            "a": 100,
            "tol": 0,
            "why": {
              "en": "Two senators per state × 50 states = 100.",
              "es": "Dos senadores por estado × 50 estados = 100."
            }
          },
          {
            "id": "gov312",
            "topic": "legislative",
            "type": "numeric",
            "diff": 1,
            "q": {
              "en": "How long is a term in the U.S. House of Representatives, in years?",
              "es": "¿Cuántos años dura un mandato en la Cámara de Representantes?"
            },
            "a": 2,
            "tol": 0,
            "why": {
              "en": "House members serve two-year terms, so the whole House is up for election every even year.",
              "es": "Los representantes sirven dos años; toda la Cámara se elige cada año par."
            }
          },
          {
            "id": "gov313",
            "topic": "legislative",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Most of the detailed work on bills in Congress happens in:",
              "es": "La mayor parte del trabajo detallado sobre proyectos de ley ocurre en:"
            },
            "c": {
              "en": [
                "Committees",
                "The Supreme Court",
                "The Cabinet",
                "State legislatures"
              ],
              "es": [
                "Los comités",
                "La Corte Suprema",
                "El Gabinete",
                "Las legislaturas estatales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Committees hold hearings, amend bills and decide which ones reach the floor. Most bills die in committee.",
              "es": "Los comités hacen audiencias, enmiendan proyectos y deciden cuáles llegan al pleno. La mayoría muere en comité."
            }
          },
          {
            "id": "gov314",
            "topic": "legislative",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A filibuster is a tactic used in the:",
              "es": "El filibusterismo es una táctica usada en:"
            },
            "c": {
              "en": [
                "Senate, to delay or block a vote by extended debate",
                "House, to speed up votes",
                "Supreme Court, to overturn cases",
                "Electoral College"
              ],
              "es": [
                "El Senado, para retrasar o bloquear una votación con debate prolongado",
                "La Cámara, para acelerar votaciones",
                "La Corte Suprema, para anular casos",
                "El Colegio Electoral"
              ]
            },
            "a": 0,
            "why": {
              "en": "Senators can talk a bill to death; ending debate (cloture) usually takes 60 votes.",
              "es": "Los senadores pueden bloquear un proyecto hablando; cerrar el debate (clausura) suele requerir 60 votos."
            }
          },
          {
            "id": "gov315",
            "topic": "executive",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The president's Cabinet is made up of:",
              "es": "El Gabinete del presidente está formado por:"
            },
            "c": {
              "en": [
                "The heads of the executive departments",
                "Senators from the president's party",
                "Supreme Court justices",
                "State governors"
              ],
              "es": [
                "Los jefes de los departamentos ejecutivos",
                "Senadores del partido del presidente",
                "Los jueces de la Corte Suprema",
                "Los gobernadores estatales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Cabinet secretaries (State, Treasury, Defense, etc.) lead executive departments and advise the president.",
              "es": "Los secretarios del Gabinete (Estado, Tesoro, Defensa, etc.) dirigen departamentos y asesoran al presidente."
            }
          },
          {
            "id": "gov316",
            "topic": "executive",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is a requirement to be president?",
              "es": "¿Cuál es un requisito para ser presidente?"
            },
            "c": {
              "en": [
                "At least 35 years old",
                "A college degree",
                "Prior service in Congress",
                "At least 25 years old"
              ],
              "es": [
                "Tener al menos 35 años",
                "Un título universitario",
                "Haber servido en el Congreso",
                "Tener al menos 25 años"
              ]
            },
            "a": 0,
            "why": {
              "en": "Article II requires a natural-born citizen, at least 35 years old, who has lived in the U.S. for 14 years.",
              "es": "El Artículo II exige ser ciudadano por nacimiento, tener al menos 35 años y 14 años de residencia."
            }
          },
          {
            "id": "gov317",
            "topic": "judicial",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "How do federal judges get their jobs?",
              "es": "¿Cómo obtienen su cargo los jueces federales?"
            },
            "c": {
              "en": [
                "Nominated by the president and confirmed by the Senate",
                "Elected by voters every four years",
                "Appointed by the House",
                "Chosen by state governors"
              ],
              "es": [
                "Los nomina el presidente y los confirma el Senado",
                "Los eligen los votantes cada cuatro años",
                "Los nombra la Cámara",
                "Los eligen los gobernadores"
              ]
            },
            "a": 0,
            "why": {
              "en": "Federal judges are nominated and confirmed, then serve 'during good behavior', which in practice means for life.",
              "es": "Los jueces federales son nominados y confirmados, y sirven 'mientras observen buena conducta', es decir, de por vida."
            }
          },
          {
            "id": "gov318",
            "topic": "judicial",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Most cases reach the U.S. Supreme Court through:",
              "es": "La mayoría de los casos llegan a la Corte Suprema mediante:"
            },
            "c": {
              "en": [
                "Appeals from lower courts (a writ of certiorari)",
                "Original jurisdiction trials",
                "Requests from the president",
                "Votes of Congress"
              ],
              "es": [
                "Apelaciones de tribunales inferiores (auto de certiorari)",
                "Juicios de jurisdicción original",
                "Solicitudes del presidente",
                "Votaciones del Congreso"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Court chooses a small number of appeals each year; granting review takes four justices (the rule of four).",
              "es": "La Corte elige pocas apelaciones al año; aceptar un caso requiere cuatro jueces (regla de cuatro)."
            }
          },
          {
            "id": "gov319",
            "topic": "executive",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The president's power to command the armed forces is checked by Congress's power to:",
              "es": "El poder del presidente como comandante en jefe lo limita el poder del Congreso de:"
            },
            "c": {
              "en": [
                "Declare war and fund the military",
                "Appoint generals",
                "Veto military orders",
                "Pardon soldiers"
              ],
              "es": [
                "Declarar la guerra y financiar las fuerzas armadas",
                "Nombrar generales",
                "Vetar órdenes militares",
                "Indultar a soldados"
              ]
            },
            "a": 0,
            "why": {
              "en": "Only Congress declares war and controls the money; the War Powers Resolution (1973) also limits troop deployments without approval.",
              "es": "Solo el Congreso declara la guerra y controla el dinero; la Resolución de Poderes de Guerra (1973) también limita despliegues sin aprobación."
            }
          },
          {
            "id": "gov320",
            "topic": "legislative",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The Senate, but not the House, has the power to:",
              "es": "El Senado, pero no la Cámara, tiene el poder de:"
            },
            "c": {
              "en": [
                "Confirm presidential appointments and ratify treaties",
                "Start all revenue (tax) bills",
                "Impeach officials",
                "Choose the president if no one wins the Electoral College"
              ],
              "es": [
                "Confirmar nombramientos presidenciales y ratificar tratados",
                "Iniciar todos los proyectos de impuestos",
                "Acusar a funcionarios (impeachment)",
                "Elegir al presidente si nadie gana el Colegio Electoral"
              ]
            },
            "a": 0,
            "why": {
              "en": "Advice and consent belongs to the Senate. Revenue bills start in the House, the House impeaches, and the House picks the president in an Electoral College deadlock.",
              "es": "El consejo y consentimiento es del Senado. Los proyectos de impuestos empiezan en la Cámara, que también acusa y elige al presidente en caso de empate."
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
          },
          {
            "id": "gov411",
            "topic": "citizenship",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which is an obligation (required by law) of U.S. citizens?",
              "es": "¿Cuál es una obligación (exigida por ley) de los ciudadanos?"
            },
            "c": {
              "en": [
                "Paying taxes",
                "Voting in every election",
                "Volunteering in the community",
                "Joining a political party"
              ],
              "es": [
                "Pagar impuestos",
                "Votar en cada elección",
                "Hacer voluntariado",
                "Afiliarse a un partido"
              ]
            },
            "a": 0,
            "why": {
              "en": "Obligations are legal duties: obeying laws, paying taxes, serving on juries when called, registering for Selective Service (men 18–25). Voting and volunteering are responsibilities.",
              "es": "Las obligaciones son deberes legales: obedecer leyes, pagar impuestos, servir de jurado, inscribirse en el Servicio Selectivo (hombres de 18–25). Votar y hacer voluntariado son responsabilidades."
            }
          },
          {
            "id": "gov412",
            "topic": "citizenship",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Fourteenth Amendment defines a citizen as anyone:",
              "es": "La Decimocuarta Enmienda define como ciudadano a cualquiera:"
            },
            "c": {
              "en": [
                "Born or naturalized in the United States and subject to its jurisdiction",
                "Who owns property",
                "Whose parents both voted",
                "Who has lived here 5 years"
              ],
              "es": [
                "Nacido o naturalizado en EE. UU. y sujeto a su jurisdicción",
                "Que tenga propiedades",
                "Cuyos padres votaron",
                "Que haya vivido aquí 5 años"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Citizenship Clause establishes birthright citizenship and citizenship by naturalization.",
              "es": "La Cláusula de Ciudadanía establece la ciudadanía por nacimiento y por naturalización."
            }
          },
          {
            "id": "gov413",
            "topic": "elections",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In Florida, a closed primary means:",
              "es": "En Florida, una primaria cerrada significa:"
            },
            "c": {
              "en": [
                "Only voters registered with a party can vote in that party's primary",
                "Anyone can vote in any primary",
                "Primaries are held in secret",
                "Only the party leaders vote"
              ],
              "es": [
                "Solo los votantes inscritos en un partido votan en la primaria de ese partido",
                "Cualquiera puede votar en cualquier primaria",
                "Las primarias son secretas",
                "Solo votan los líderes del partido"
              ]
            },
            "a": 0,
            "why": {
              "en": "Florida uses closed primaries, so a voter must be registered with a party to help choose its nominee (with a few exceptions).",
              "es": "Florida usa primarias cerradas: hay que estar inscrito en un partido para elegir a su candidato (con pocas excepciones)."
            }
          },
          {
            "id": "gov414",
            "topic": "elections",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Fifteenth, Nineteenth and Twenty-Sixth Amendments all:",
              "es": "Las Enmiendas Quince, Diecinueve y Veintiséis todas:"
            },
            "c": {
              "en": [
                "Expanded voting rights",
                "Limited the president's terms",
                "Created the income tax",
                "Ended Prohibition"
              ],
              "es": [
                "Ampliaron el derecho al voto",
                "Limitaron los mandatos presidenciales",
                "Crearon el impuesto sobre la renta",
                "Terminaron la Prohibición"
              ]
            },
            "a": 0,
            "why": {
              "en": "15th: no denial by race (1870). 19th: women (1920). 26th: age 18 (1971).",
              "es": "15ª: sin negar por raza (1870). 19ª: mujeres (1920). 26ª: 18 años (1971)."
            }
          },
          {
            "id": "gov415",
            "topic": "participation",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Writing a letter to your state representative about a bill is an example of:",
              "es": "Escribir una carta a tu representante estatal sobre un proyecto de ley es un ejemplo de:"
            },
            "c": {
              "en": [
                "Civic participation (petitioning government)",
                "A legal obligation",
                "Jury duty",
                "Judicial review"
              ],
              "es": [
                "Participación cívica (pedir al gobierno)",
                "Una obligación legal",
                "Servicio de jurado",
                "Revisión judicial"
              ]
            },
            "a": 0,
            "why": {
              "en": "The First Amendment protects the right to petition the government, one of the main ways citizens participate between elections.",
              "es": "La Primera Enmienda protege el derecho de petición, una de las formas principales de participar entre elecciones."
            }
          },
          {
            "id": "gov416",
            "topic": "elections",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Each state's number of electoral votes equals:",
              "es": "El número de votos electorales de cada estado es igual a:"
            },
            "c": {
              "en": [
                "Its number of House members plus its two senators",
                "Its population divided by 100,000",
                "The number of counties it has",
                "Ten, for every state"
              ],
              "es": [
                "Sus representantes en la Cámara más sus dos senadores",
                "Su población dividida entre 100,000",
                "El número de condados",
                "Diez para todos los estados"
              ]
            },
            "a": 0,
            "why": {
              "en": "Florida has 28 House seats + 2 senators = 30 electoral votes (after the 2020 census).",
              "es": "Florida tiene 28 escaños + 2 senadores = 30 votos electorales (tras el censo de 2020)."
            }
          },
          {
            "id": "gov417",
            "topic": "participation",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A political action committee (PAC) is mainly used to:",
              "es": "Un comité de acción política (PAC) se usa principalmente para:"
            },
            "c": {
              "en": [
                "Raise and spend money to support candidates or causes",
                "Write federal laws",
                "Count votes",
                "Appoint judges"
              ],
              "es": [
                "Recaudar y gastar dinero para apoyar candidatos o causas",
                "Redactar leyes federales",
                "Contar votos",
                "Nombrar jueces"
              ]
            },
            "a": 0,
            "why": {
              "en": "Interest groups often form PACs to contribute to campaigns within legal limits.",
              "es": "Los grupos de interés suelen formar PAC para contribuir a campañas dentro de los límites legales."
            }
          },
          {
            "id": "gov418",
            "topic": "citizenship",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which describes a lawful permanent resident ('green card' holder)?",
              "es": "¿Qué describe a un residente permanente legal ('green card')?"
            },
            "c": {
              "en": [
                "Can live and work in the U.S. but cannot vote in federal elections",
                "Is a citizen with full voting rights",
                "Must leave the country every year",
                "Can run for president"
              ],
              "es": [
                "Puede vivir y trabajar en EE. UU., pero no votar en elecciones federales",
                "Es ciudadano con pleno derecho a votar",
                "Debe salir del país cada año",
                "Puede postularse a presidente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Permanent residents have many rights and obligations, including paying taxes, but voting in federal elections is reserved for citizens.",
              "es": "Los residentes permanentes tienen muchos derechos y obligaciones, como pagar impuestos, pero votar en elecciones federales es solo para ciudadanos."
            }
          },
          {
            "id": "gov419",
            "topic": "participation",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Media acting as a 'watchdog' means the press:",
              "es": "Que los medios actúen como 'perro guardián' significa que la prensa:"
            },
            "c": {
              "en": [
                "Investigates and reports on government wrongdoing",
                "Writes laws for Congress",
                "Chooses party nominees",
                "Runs elections"
              ],
              "es": [
                "Investiga e informa sobre abusos del gobierno",
                "Redacta leyes para el Congreso",
                "Elige a los candidatos de los partidos",
                "Organiza las elecciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "A free press helps hold officials accountable by exposing corruption and abuse of power.",
              "es": "Una prensa libre ayuda a pedir cuentas a los funcionarios al revelar corrupción y abusos de poder."
            }
          },
          {
            "id": "gov420",
            "topic": "elections",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Which best describes how most states award electoral votes?",
              "es": "¿Qué describe mejor cómo la mayoría de los estados asigna sus votos electorales?"
            },
            "c": {
              "en": [
                "Winner-take-all: the statewide popular vote winner gets all of them",
                "Split evenly between the top two candidates",
                "By a vote of the state legislature after the election",
                "By congressional district in every state"
              ],
              "es": [
                "El ganador se lleva todo: quien gana el voto popular estatal se queda con todos",
                "Se reparten igual entre los dos primeros",
                "Por votación de la legislatura después de la elección",
                "Por distrito en todos los estados"
              ]
            },
            "a": 0,
            "why": {
              "en": "48 states and D.C. use winner-take-all. Maine and Nebraska split some votes by congressional district.",
              "es": "48 estados y D.C. usan 'el ganador se lleva todo'. Maine y Nebraska reparten algunos votos por distrito."
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
          },
          {
            "id": "gov511",
            "topic": "rights",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The Second Amendment protects:",
              "es": "La Segunda Enmienda protege:"
            },
            "c": {
              "en": [
                "The right to keep and bear arms",
                "Freedom of religion",
                "Protection from unreasonable searches",
                "The right to a jury trial in civil cases"
              ],
              "es": [
                "El derecho a poseer y portar armas",
                "La libertad de religión",
                "La protección contra registros irrazonables",
                "El derecho a jurado en casos civiles"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Second Amendment protects the right to keep and bear arms; McDonald v. Chicago (2010) applied it to the states.",
              "es": "La Segunda Enmienda protege el derecho a poseer y portar armas; McDonald v. Chicago (2010) lo aplicó a los estados."
            }
          },
          {
            "id": "gov512",
            "topic": "rights",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Police need a warrant based on probable cause to search your home because of the:",
              "es": "La policía necesita una orden basada en causa probable para registrar tu casa por la:"
            },
            "c": {
              "en": [
                "Fourth Amendment",
                "Fifth Amendment",
                "Sixth Amendment",
                "Eighth Amendment"
              ],
              "es": [
                "Cuarta Enmienda",
                "Quinta Enmienda",
                "Sexta Enmienda",
                "Octava Enmienda"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Fourth Amendment protects against unreasonable searches and seizures and requires warrants supported by probable cause.",
              "es": "La Cuarta Enmienda protege contra registros y detenciones irrazonables y exige órdenes con causa probable."
            }
          },
          {
            "id": "gov513",
            "topic": "rights",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "'Pleading the Fifth' refers to the right to:",
              "es": "'Acogerse a la Quinta' se refiere al derecho a:"
            },
            "c": {
              "en": [
                "Not testify against yourself",
                "A speedy trial",
                "Bear arms",
                "Freedom of the press"
              ],
              "es": [
                "No declarar contra uno mismo",
                "Un juicio rápido",
                "Portar armas",
                "La libertad de prensa"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Fifth Amendment protects against self-incrimination and double jeopardy and guarantees due process.",
              "es": "La Quinta Enmienda protege contra la autoincriminación y el doble enjuiciamiento y garantiza el debido proceso."
            }
          },
          {
            "id": "gov514",
            "topic": "cases",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Plessy v. Ferguson (1896) was overturned by:",
              "es": "Plessy v. Ferguson (1896) fue anulado por:"
            },
            "c": {
              "en": [
                "Brown v. Board of Education (1954)",
                "Marbury v. Madison (1803)",
                "Miranda v. Arizona (1966)",
                "Gideon v. Wainwright (1963)"
              ],
              "es": [
                "Brown v. Board of Education (1954)",
                "Marbury v. Madison (1803)",
                "Miranda v. Arizona (1966)",
                "Gideon v. Wainwright (1963)"
              ]
            },
            "a": 0,
            "why": {
              "en": "Plessy allowed 'separate but equal.' Brown ruled that segregated public schools are inherently unequal under the Fourteenth Amendment.",
              "es": "Plessy permitió 'separados pero iguales'. Brown decidió que las escuelas segregadas son desiguales por naturaleza según la Decimocuarta Enmienda."
            }
          },
          {
            "id": "gov515",
            "topic": "cases",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Hazelwood v. Kuhlmeier (1988) held that schools may:",
              "es": "Hazelwood v. Kuhlmeier (1988) decidió que las escuelas pueden:"
            },
            "c": {
              "en": [
                "Edit school-sponsored student newspapers for legitimate educational reasons",
                "Never limit student speech",
                "Require prayer in class",
                "Search students without any reason"
              ],
              "es": [
                "Editar periódicos escolares patrocinados por razones educativas legítimas",
                "Nunca limitar la expresión estudiantil",
                "Exigir oración en clase",
                "Registrar estudiantes sin motivo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Hazelwood gives schools more control over school-sponsored speech than Tinker allows over students' personal expression.",
              "es": "Hazelwood da a las escuelas más control sobre la expresión patrocinada que el que Tinker permite sobre la expresión personal."
            }
          },
          {
            "id": "gov516",
            "topic": "cases",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "In Bush v. Gore (2000), the Supreme Court:",
              "es": "En Bush v. Gore (2000), la Corte Suprema:"
            },
            "c": {
              "en": [
                "Stopped Florida's presidential recount, effectively deciding the election",
                "Ordered a new national election",
                "Abolished the Electoral College",
                "Ended segregation"
              ],
              "es": [
                "Detuvo el recuento presidencial de Florida, decidiendo en la práctica la elección",
                "Ordenó una nueva elección nacional",
                "Abolió el Colegio Electoral",
                "Terminó la segregación"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Court ruled the recount's inconsistent standards violated the Equal Protection Clause, leaving George W. Bush the winner of Florida's electoral votes.",
              "es": "La Corte decidió que los criterios desiguales del recuento violaban la Igualdad de Protección, y George W. Bush ganó los votos electorales de Florida."
            }
          },
          {
            "id": "gov517",
            "topic": "systems",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In a parliamentary system, the head of government (prime minister) is chosen by:",
              "es": "En un sistema parlamentario, el jefe de gobierno (primer ministro) lo elige:"
            },
            "c": {
              "en": [
                "The majority party or coalition in the legislature",
                "A separate national election",
                "The Supreme Court",
                "The military"
              ],
              "es": [
                "El partido o coalición mayoritaria del parlamento",
                "Una elección nacional separada",
                "La Corte Suprema",
                "Los militares"
              ]
            },
            "a": 0,
            "why": {
              "en": "In parliamentary systems like the U.K., the executive comes from the legislature. In the U.S. presidential system, voters elect the president separately.",
              "es": "En sistemas parlamentarios como el Reino Unido, el ejecutivo surge del parlamento. En el sistema presidencial de EE. UU., el presidente se elige aparte."
            }
          },
          {
            "id": "gov518",
            "topic": "systems",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A confederal system of government gives most power to:",
              "es": "Un sistema confederal da la mayor parte del poder a:"
            },
            "c": {
              "en": [
                "The member states, with a weak central government",
                "A strong central government only",
                "A single dictator",
                "International courts"
              ],
              "es": [
                "Los estados miembros, con un gobierno central débil",
                "Solo un gobierno central fuerte",
                "Un solo dictador",
                "Los tribunales internacionales"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Articles of Confederation were confederal. A unitary system centralizes power; federalism divides it.",
              "es": "Los Artículos de la Confederación eran confederales. Un sistema unitario centraliza el poder; el federalismo lo divide."
            }
          },
          {
            "id": "gov519",
            "topic": "systems",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is an example of U.S. foreign-policy diplomacy?",
              "es": "¿Cuál es un ejemplo de diplomacia en la política exterior de EE. UU.?"
            },
            "c": {
              "en": [
                "Negotiating a treaty through the State Department",
                "Passing a state budget",
                "Holding a county election",
                "Appointing a mayor"
              ],
              "es": [
                "Negociar un tratado a través del Departamento de Estado",
                "Aprobar un presupuesto estatal",
                "Hacer una elección de condado",
                "Nombrar un alcalde"
              ]
            },
            "a": 0,
            "why": {
              "en": "The State Department leads diplomacy; other tools include foreign aid, sanctions, alliances like NATO, and as a last resort, military force.",
              "es": "El Departamento de Estado dirige la diplomacia; otras herramientas son la ayuda exterior, sanciones, alianzas como la OTAN y, como último recurso, la fuerza militar."
            }
          },
          {
            "id": "gov520",
            "topic": "rights",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The Fourteenth Amendment's Equal Protection Clause requires that:",
              "es": "La Cláusula de Igualdad de Protección de la Decimocuarta Enmienda exige que:"
            },
            "c": {
              "en": [
                "States treat people equally under the law",
                "Everyone pays the same tax",
                "Every state has the same laws",
                "Only citizens can own property"
              ],
              "es": [
                "Los estados traten a las personas por igual ante la ley",
                "Todos paguen el mismo impuesto",
                "Todos los estados tengan las mismas leyes",
                "Solo los ciudadanos puedan tener propiedades"
              ]
            },
            "a": 0,
            "why": {
              "en": "Equal protection was the basis for Brown v. Board and many civil rights rulings.",
              "es": "La igualdad de protección fue la base de Brown v. Board y de muchos fallos de derechos civiles."
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
    "id": "ap-gov",
    "color": "#B58CFF",
    "name": {
      "en": "AP U.S. Government and Politics",
      "es": "Gobierno y Política de EE. UU. AP"
    },
    "units": [
      {
        "id": "apg-u1",
        "title": {
          "en": "AP Gov Unit 1 · Foundations of American Democracy",
          "es": "Gob AP Unidad 1 · Fundamentos de la democracia estadounidense"
        },
        "brief": {
          "en": "American government rests on Enlightenment ideas: natural rights, popular sovereignty, the social contract, and limited government, all stated in the Declaration of Independence. The Articles of Confederation created a weak national government that could not tax or regulate commerce, and crises like Shays' Rebellion pushed the states to write the Constitution. The framers compromised on representation (the Great Compromise), slavery (the Three-Fifths Compromise), and the executive. Federalists defended the new plan: Federalist No. 10 argues that a large republic controls factions, and Federalist No. 51 argues that separation of powers and checks and balances let ambition counteract ambition. Anti-Federalists, in Brutus No. 1, warned that a powerful central government would threaten liberty. Federalism divides power between national and state governments; McCulloch v. Maryland (1819) expanded national power through implied powers and the Supremacy Clause, while United States v. Lopez (1995) limited Congress's use of the Commerce Clause. Grants, mandates, and court rulings keep shifting that balance.",
          "es": "El gobierno estadounidense se basa en ideas de la Ilustración: derechos naturales, soberanía popular, contrato social y gobierno limitado, todas expresadas en la Declaración de Independencia. Los Artículos de la Confederación crearon un gobierno nacional débil que no podía cobrar impuestos ni regular el comercio, y crisis como la Rebelión de Shays llevaron a escribir la Constitución. Los constituyentes pactaron sobre la representación (Gran Compromiso), la esclavitud (Compromiso de los Tres Quintos) y el ejecutivo. Los federalistas defendieron el plan: el Federalista n.º 10 sostiene que una república grande controla las facciones y el n.º 51 que la separación de poderes y los contrapesos hacen que la ambición contrarreste a la ambición. Los antifederalistas, en Brutus n.º 1, advirtieron que un gobierno central poderoso amenazaría la libertad. El federalismo divide el poder entre el gobierno nacional y los estados; McCulloch v. Maryland (1819) amplió el poder nacional con los poderes implícitos y la Cláusula de Supremacía, mientras que United States v. Lopez (1995) limitó el uso de la Cláusula de Comercio. Las subvenciones, los mandatos y los fallos judiciales siguen moviendo ese equilibrio."
        },
        "items": [
          {
            "id": "apg101",
            "topic": "ideals",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The Declaration of Independence's claim that governments derive 'their just powers from the consent of the governed' expresses:",
              "es": "La afirmación de la Declaración de que los gobiernos derivan 'sus justos poderes del consentimiento de los gobernados' expresa:"
            },
            "c": {
              "en": [
                "Popular sovereignty",
                "Federalism",
                "Judicial review",
                "Checks and balances"
              ],
              "es": [
                "Soberanía popular",
                "Federalismo",
                "Revisión judicial",
                "Pesos y contrapesos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Popular sovereignty: the people are the source of government's authority.",
              "es": "Soberanía popular: el pueblo es la fuente de la autoridad del gobierno."
            }
          },
          {
            "id": "apg102",
            "topic": "ideals",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "John Locke's idea most clearly reflected in the Declaration is:",
              "es": "La idea de John Locke más reflejada en la Declaración es:"
            },
            "c": {
              "en": [
                "Natural rights to life, liberty and property",
                "Separation of powers",
                "The divine right of kings",
                "A large republic controls factions"
              ],
              "es": [
                "Los derechos naturales a la vida, la libertad y la propiedad",
                "La separación de poderes",
                "El derecho divino de los reyes",
                "Una república grande controla las facciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "Jefferson adapted Locke's natural rights into 'Life, Liberty and the pursuit of Happiness.'",
              "es": "Jefferson adaptó los derechos naturales de Locke como 'la vida, la libertad y la búsqueda de la felicidad'."
            }
          },
          {
            "id": "apg103",
            "topic": "ideals",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which model of democracy emphasizes broad citizen participation in politics and civil society?",
              "es": "¿Qué modelo de democracia destaca la participación amplia de los ciudadanos en la política y la sociedad civil?"
            },
            "c": {
              "en": [
                "Participatory democracy",
                "Elite democracy",
                "Pluralist democracy",
                "Direct monarchy"
              ],
              "es": [
                "Democracia participativa",
                "Democracia de élites",
                "Democracia pluralista",
                "Monarquía directa"
              ]
            },
            "a": 0,
            "why": {
              "en": "Participatory = broad participation. Pluralist = groups compete for influence. Elite = limited participation by a well-educated few.",
              "es": "Participativa = participación amplia. Pluralista = los grupos compiten por influencia. De élites = participación limitada de unos pocos."
            }
          },
          {
            "id": "apg104",
            "topic": "ideals",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Interest groups competing to influence policy best illustrates which model of democracy?",
              "es": "¿Qué modelo de democracia ilustran mejor los grupos de interés que compiten por influir en las políticas?"
            },
            "c": {
              "en": [
                "Pluralist",
                "Participatory",
                "Elite",
                "Direct"
              ],
              "es": [
                "Pluralista",
                "Participativa",
                "De élites",
                "Directa"
              ]
            },
            "a": 0,
            "why": {
              "en": "Pluralist democracy sees policy as the result of competition among organized groups.",
              "es": "La democracia pluralista ve las políticas como resultado de la competencia entre grupos organizados."
            }
          },
          {
            "id": "apg105",
            "topic": "ideals",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Constitution's design of the Electoral College and the original indirect election of senators best reflects:",
              "es": "El diseño del Colegio Electoral y la elección indirecta original de senadores reflejan mejor:"
            },
            "c": {
              "en": [
                "Elite democracy",
                "Participatory democracy",
                "Pluralist democracy",
                "Direct democracy"
              ],
              "es": [
                "Democracia de élites",
                "Democracia participativa",
                "Democracia pluralista",
                "Democracia directa"
              ]
            },
            "a": 0,
            "why": {
              "en": "Both put a filter between ordinary voters and the final choice, an elite model. The 17th Amendment (1913) moved senators to direct election.",
              "es": "Ambos ponen un filtro entre los votantes y la decisión final, un modelo de élites. La Enmienda 17 (1913) pasó a la elección directa de senadores."
            }
          },
          {
            "id": "apg110",
            "topic": "framing",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every weakness of the national government under the Articles of Confederation.",
              "es": "Selecciona cada debilidad del gobierno nacional bajo los Artículos de la Confederación."
            },
            "c": {
              "en": [
                "Could not levy taxes",
                "Could not regulate interstate commerce",
                "Amendments required unanimous consent",
                "Had a powerful president"
              ],
              "es": [
                "No podía cobrar impuestos",
                "No podía regular el comercio interestatal",
                "Las enmiendas requerían unanimidad",
                "Tenía un presidente poderoso"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "The Articles had no executive branch at all, no power to tax or regulate trade, and needed all 13 states to amend.",
              "es": "Los Artículos no tenían poder ejecutivo, ni poder para gravar o regular el comercio, y requerían los 13 estados para enmendarse."
            }
          },
          {
            "id": "apg111",
            "topic": "framing",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Great (Connecticut) Compromise created:",
              "es": "El Gran Compromiso (de Connecticut) creó:"
            },
            "c": {
              "en": [
                "A bicameral Congress: House by population, Senate with equal representation",
                "A unicameral legislature",
                "The Electoral College only",
                "The Bill of Rights"
              ],
              "es": [
                "Un Congreso bicameral: Cámara según población, Senado con representación igual",
                "Una legislatura unicameral",
                "Solo el Colegio Electoral",
                "La Carta de Derechos"
              ]
            },
            "a": 0,
            "why": {
              "en": "It blended the Virginia Plan (population) and the New Jersey Plan (equal votes per state).",
              "es": "Combinó el Plan de Virginia (población) y el de Nueva Jersey (votos iguales por estado)."
            }
          },
          {
            "id": "apg112",
            "topic": "framing",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Article V makes amending the Constitution:",
              "es": "El Artículo V hace que enmendar la Constitución sea:"
            },
            "c": {
              "en": [
                "Possible but difficult, requiring supermajorities",
                "Easy, with a simple majority of Congress",
                "Impossible",
                "A power of the president alone"
              ],
              "es": [
                "Posible pero difícil, con mayorías calificadas",
                "Fácil, con mayoría simple del Congreso",
                "Imposible",
                "Un poder exclusivo del presidente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Proposal needs two-thirds of both houses (or a convention called by two-thirds of states); ratification needs three-fourths of the states.",
              "es": "La propuesta requiere dos tercios de ambas cámaras (o una convención pedida por dos tercios de los estados); la ratificación, tres cuartos de los estados."
            }
          },
          {
            "id": "apg113",
            "topic": "framing",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The framers' decision to protect the slave trade until 1808 and adopt the Three-Fifths Compromise shows that:",
              "es": "La decisión de proteger la trata de esclavos hasta 1808 y adoptar los Tres Quintos muestra que:"
            },
            "c": {
              "en": [
                "The Constitution reflected political compromises over slavery",
                "The framers abolished slavery",
                "Slavery was left entirely to Congress",
                "Slavery was never discussed"
              ],
              "es": [
                "La Constitución reflejó pactos políticos sobre la esclavitud",
                "Los constituyentes abolieron la esclavitud",
                "La esclavitud quedó solo en manos del Congreso",
                "Nunca se discutió la esclavitud"
              ]
            },
            "a": 0,
            "why": {
              "en": "To secure Southern support, the framers made compromises that protected slavery; it took the Civil War and the 13th Amendment to end it.",
              "es": "Para obtener el apoyo del Sur, se hicieron pactos que protegieron la esclavitud; hizo falta la Guerra Civil y la Enmienda 13 para abolirla."
            }
          },
          {
            "id": "apg120",
            "topic": "fedpapers",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In Federalist No. 10, Madison argues that the best way to control the effects of faction is:",
              "es": "En el Federalista n.º 10, Madison sostiene que la mejor forma de controlar los efectos de las facciones es:"
            },
            "c": {
              "en": [
                "A large republic with many competing interests",
                "Banning political parties",
                "A direct democracy",
                "Giving states more power"
              ],
              "es": [
                "Una república grande con muchos intereses en competencia",
                "Prohibir los partidos políticos",
                "Una democracia directa",
                "Dar más poder a los estados"
              ]
            },
            "a": 0,
            "why": {
              "en": "Removing the causes of faction would destroy liberty, so Madison controls its effects: a large republic makes it hard for one faction to dominate.",
              "es": "Eliminar las causas de las facciones destruiría la libertad, así que Madison controla sus efectos: en una república grande es difícil que una facción domine."
            }
          },
          {
            "id": "apg121",
            "topic": "fedpapers",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "'Ambition must be made to counteract ambition' is a line from Federalist No. 51 defending:",
              "es": "'La ambición debe contrarrestar a la ambición' es una frase del Federalista n.º 51 que defiende:"
            },
            "c": {
              "en": [
                "Separation of powers and checks and balances",
                "A strong national bank",
                "Lifetime terms for judges",
                "A single executive"
              ],
              "es": [
                "La separación de poderes y los pesos y contrapesos",
                "Un banco nacional fuerte",
                "Mandatos vitalicios para los jueces",
                "Un ejecutivo único"
              ]
            },
            "a": 0,
            "why": {
              "en": "Madison argues each branch needs the means and motive to resist encroachment by the others.",
              "es": "Madison sostiene que cada rama necesita medios y motivos para resistir la intromisión de las demás."
            }
          },
          {
            "id": "apg122",
            "topic": "fedpapers",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Brutus No. 1 argued against ratification mainly because:",
              "es": "Brutus n.º 1 se opuso a la ratificación principalmente porque:"
            },
            "c": {
              "en": [
                "A large national republic would become too powerful and threaten liberty",
                "The national government would be too weak",
                "It gave states too much power",
                "It lacked an Electoral College"
              ],
              "es": [
                "Una república nacional grande sería demasiado poderosa y amenazaría la libertad",
                "El gobierno nacional sería demasiado débil",
                "Daba demasiado poder a los estados",
                "No tenía Colegio Electoral"
              ]
            },
            "a": 0,
            "why": {
              "en": "Brutus warned that the Necessary and Proper and Supremacy clauses would let the national government swallow the states, and that a large republic couldn't represent the people well.",
              "es": "Brutus advirtió que las cláusulas Necesaria y Apropiada y de Supremacía permitirían al gobierno nacional absorber a los estados."
            }
          },
          {
            "id": "apg123",
            "topic": "fedpapers",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Federalist No. 10 and Brutus No. 1 disagree most directly about:",
              "es": "El Federalista n.º 10 y Brutus n.º 1 discrepan más directamente sobre:"
            },
            "c": {
              "en": [
                "Whether a large republic can protect liberty",
                "Whether slavery should end",
                "Whether the president should be elected",
                "Whether judges should serve for life"
              ],
              "es": [
                "Si una república grande puede proteger la libertad",
                "Si la esclavitud debía terminar",
                "Si el presidente debía ser elegido",
                "Si los jueces debían ser vitalicios"
              ]
            },
            "a": 0,
            "why": {
              "en": "Madison saw size as a protection against faction; Brutus saw it as a danger to liberty and good representation.",
              "es": "Madison veía el tamaño como protección contra las facciones; Brutus, como un peligro para la libertad y la buena representación."
            }
          },
          {
            "id": "apg124",
            "topic": "fedpapers",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Anti-Federalists agreed to ratification after Federalists promised to add:",
              "es": "Los antifederalistas aceptaron la ratificación cuando los federalistas prometieron añadir:"
            },
            "c": {
              "en": [
                "A Bill of Rights",
                "A national bank",
                "A second Senate",
                "A king"
              ],
              "es": [
                "Una Carta de Derechos",
                "Un banco nacional",
                "Un segundo Senado",
                "Un rey"
              ]
            },
            "a": 0,
            "why": {
              "en": "Fears about individual liberty led to the first ten amendments, ratified in 1791.",
              "es": "El temor por las libertades individuales llevó a las diez primeras enmiendas, ratificadas en 1791."
            }
          },
          {
            "id": "apg130",
            "topic": "federalism",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In McCulloch v. Maryland (1819), the Court held that:",
              "es": "En McCulloch v. Maryland (1819), la Corte decidió que:"
            },
            "c": {
              "en": [
                "Congress may create a national bank under implied powers, and states may not tax it",
                "States may nullify federal laws",
                "Congress cannot regulate guns near schools",
                "The national bank was unconstitutional"
              ],
              "es": [
                "El Congreso puede crear un banco nacional por poderes implícitos y los estados no pueden gravarlo",
                "Los estados pueden anular leyes federales",
                "El Congreso no puede regular armas cerca de escuelas",
                "El banco nacional era inconstitucional"
              ]
            },
            "a": 0,
            "why": {
              "en": "Necessary and Proper Clause → implied powers; Supremacy Clause → no state tax on a federal institution. A major expansion of national power.",
              "es": "Cláusula Necesaria y Apropiada → poderes implícitos; Cláusula de Supremacía → ningún impuesto estatal a una institución federal."
            }
          },
          {
            "id": "apg131",
            "topic": "federalism",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "United States v. Lopez (1995) is significant because the Court:",
              "es": "United States v. Lopez (1995) es importante porque la Corte:"
            },
            "c": {
              "en": [
                "Limited Congress's power under the Commerce Clause",
                "Expanded Congress's power to regulate anything",
                "Created the right to privacy",
                "Upheld the national bank"
              ],
              "es": [
                "Limitó el poder del Congreso bajo la Cláusula de Comercio",
                "Amplió el poder del Congreso para regular cualquier cosa",
                "Creó el derecho a la privacidad",
                "Avaló el banco nacional"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Gun-Free School Zones Act was struck down: carrying a gun near a school isn't economic activity that substantially affects interstate commerce. A win for state power.",
              "es": "Se anuló la Ley de Zonas Escolares sin Armas: portar un arma cerca de una escuela no es actividad económica que afecte sustancialmente el comercio."
            }
          },
          {
            "id": "apg132",
            "topic": "federalism",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A block grant differs from a categorical grant because a block grant:",
              "es": "Una subvención en bloque se diferencia de una categórica porque la subvención en bloque:"
            },
            "c": {
              "en": [
                "Gives states broad discretion over how to spend the money",
                "Must be spent on one narrow purpose",
                "Comes from states to the federal government",
                "Is unconstitutional"
              ],
              "es": [
                "Da a los estados amplia libertad para gastar el dinero",
                "Debe gastarse en un solo fin específico",
                "Va de los estados al gobierno federal",
                "Es inconstitucional"
              ]
            },
            "a": 0,
            "why": {
              "en": "States generally prefer block grants (flexibility); categorical grants come with strings and specific purposes.",
              "es": "Los estados suelen preferir las subvenciones en bloque (flexibilidad); las categóricas vienen con condiciones y fines concretos."
            }
          },
          {
            "id": "apg133",
            "topic": "federalism",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An unfunded mandate is:",
              "es": "Un mandato sin fondos es:"
            },
            "c": {
              "en": [
                "A federal requirement on states without money to pay for it",
                "A grant with no conditions",
                "A state law that overrides federal law",
                "A presidential executive order"
              ],
              "es": [
                "Una exigencia federal a los estados sin dinero para cumplirla",
                "Una subvención sin condiciones",
                "Una ley estatal que anula una federal",
                "Una orden ejecutiva presidencial"
              ]
            },
            "a": 0,
            "why": {
              "en": "Examples include parts of the Americans with Disabilities Act: states must comply but bear the cost.",
              "es": "Por ejemplo, partes de la Ley de Estadounidenses con Discapacidades: los estados deben cumplir y pagar el costo."
            }
          },
          {
            "id": "apg134",
            "topic": "federalism",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The Tenth Amendment and the Commerce Clause are often in tension because:",
              "es": "La Décima Enmienda y la Cláusula de Comercio suelen estar en tensión porque:"
            },
            "c": {
              "en": [
                "One reserves powers to states while the other is used to expand national power",
                "Both give power only to the president",
                "Both were repealed",
                "Neither affects federalism"
              ],
              "es": [
                "Una reserva poderes a los estados y la otra se usa para ampliar el poder nacional",
                "Ambas dan poder solo al presidente",
                "Ambas fueron derogadas",
                "Ninguna afecta al federalismo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Debates over federalism often pit reserved state powers against broad readings of Congress's power to regulate interstate commerce.",
              "es": "Los debates sobre federalismo suelen enfrentar los poderes reservados de los estados con interpretaciones amplias del poder de comercio del Congreso."
            }
          },
          {
            "id": "apg135",
            "topic": "federalism",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every concurrent power (held by both national and state governments).",
              "es": "Selecciona cada poder concurrente (de ambos niveles de gobierno)."
            },
            "c": {
              "en": [
                "Collecting taxes",
                "Borrowing money",
                "Establishing courts",
                "Declaring war"
              ],
              "es": [
                "Cobrar impuestos",
                "Pedir dinero prestado",
                "Crear tribunales",
                "Declarar la guerra"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Taxing, borrowing and creating courts are shared. Declaring war is an exclusive national power.",
              "es": "Cobrar impuestos, pedir prestado y crear tribunales son compartidos. Declarar la guerra es exclusivo del gobierno nacional."
            }
          },
          {
            "id": "apg136",
            "topic": "federalism",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "States legalizing marijuana while it remains illegal under federal law is an example of:",
              "es": "Los estados que legalizan la marihuana mientras sigue siendo ilegal a nivel federal son un ejemplo de:"
            },
            "c": {
              "en": [
                "Tension within federalism",
                "Judicial review",
                "A unitary system",
                "Separation of powers"
              ],
              "es": [
                "Tensión dentro del federalismo",
                "Revisión judicial",
                "Un sistema unitario",
                "Separación de poderes"
              ]
            },
            "a": 0,
            "why": {
              "en": "Federal law is supreme, but enforcement choices and state policy create ongoing friction between levels of government.",
              "es": "La ley federal es suprema, pero las decisiones de aplicación y las políticas estatales generan fricción entre niveles."
            }
          },
          {
            "id": "apg137",
            "topic": "ideals",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which document is most associated with the idea that people may 'alter or abolish' a government that violates their rights?",
              "es": "¿Qué documento se asocia más con la idea de que el pueblo puede 'reformar o abolir' un gobierno que viola sus derechos?"
            },
            "c": {
              "en": [
                "The Declaration of Independence",
                "The Articles of Confederation",
                "Federalist No. 70",
                "The Bill of Rights"
              ],
              "es": [
                "La Declaración de Independencia",
                "Los Artículos de la Confederación",
                "El Federalista n.º 70",
                "La Carta de Derechos"
              ]
            },
            "a": 0,
            "why": {
              "en": "This right of revolution comes from social contract theory and appears in the Declaration's second paragraph.",
              "es": "Este derecho a la revolución viene de la teoría del contrato social y aparece en el segundo párrafo de la Declaración."
            }
          },
          {
            "id": "apg138",
            "topic": "framing",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Constitution limits majority rule by:",
              "es": "La Constitución limita el gobierno de la mayoría mediante:"
            },
            "c": {
              "en": [
                "Protecting individual rights and dividing power among branches and levels",
                "Letting the president veto every law",
                "Banning elections",
                "Requiring unanimous votes in Congress"
              ],
              "es": [
                "Proteger derechos individuales y dividir el poder entre ramas y niveles",
                "Permitir al presidente vetar toda ley",
                "Prohibir las elecciones",
                "Exigir unanimidad en el Congreso"
              ]
            },
            "a": 0,
            "why": {
              "en": "Federalism, separation of powers, the Bill of Rights and judicial review all guard against a 'tyranny of the majority.'",
              "es": "El federalismo, la separación de poderes, la Carta de Derechos y la revisión judicial protegen contra la 'tiranía de la mayoría'."
            }
          },
          {
            "id": "apg139",
            "topic": "federalism",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Fiscal federalism refers to:",
              "es": "El federalismo fiscal se refiere a:"
            },
            "c": {
              "en": [
                "The national government using grants and money to influence states",
                "States printing their own currency",
                "Courts setting tax rates",
                "Congress auditing states every year"
              ],
              "es": [
                "El gobierno nacional usando subvenciones y dinero para influir en los estados",
                "Los estados imprimiendo su propia moneda",
                "Los tribunales fijando impuestos",
                "El Congreso auditando a los estados cada año"
              ]
            },
            "a": 0,
            "why": {
              "en": "Money with conditions attached is one of Washington's strongest tools to shape state policy.",
              "es": "El dinero con condiciones es una de las herramientas más fuertes de Washington para influir en la política estatal."
            }
          },
          {
            "id": "apg140",
            "topic": "framing",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Under the Constitution, which branch has the power to declare war?",
              "es": "Según la Constitución, ¿qué rama tiene el poder de declarar la guerra?"
            },
            "c": {
              "en": [
                "Congress",
                "The president",
                "The Supreme Court",
                "The states"
              ],
              "es": [
                "El Congreso",
                "El presidente",
                "La Corte Suprema",
                "Los estados"
              ]
            },
            "a": 0,
            "why": {
              "en": "Article I gives Congress the power to declare war; the president is commander in chief. Splitting war powers is a deliberate check.",
              "es": "El Artículo I da al Congreso el poder de declarar la guerra; el presidente es comandante en jefe. Dividir esos poderes es un control deliberado."
            }
          }
        ],
        "topics": [
          {
            "id": "ideals",
            "en": "Democratic Ideals",
            "es": "Ideales democráticos"
          },
          {
            "id": "framing",
            "en": "Articles to Constitution",
            "es": "De los Artículos a la Constitución"
          },
          {
            "id": "fedpapers",
            "en": "Federalists vs. Anti-Federalists",
            "es": "Federalistas vs. antifederalistas"
          },
          {
            "id": "federalism",
            "en": "Federalism",
            "es": "Federalismo"
          }
        ],
        "vocab": [
          {
            "t": "ideals",
            "w": {
              "en": "Natural rights",
              "es": "Derechos naturales"
            },
            "d": {
              "en": "Rights people have just by being human: life, liberty, property.",
              "es": "Derechos que se tienen por ser humano: vida, libertad, propiedad."
            }
          },
          {
            "t": "ideals",
            "w": {
              "en": "Popular sovereignty",
              "es": "Soberanía popular"
            },
            "d": {
              "en": "Government's authority comes from the people.",
              "es": "La autoridad del gobierno viene del pueblo."
            }
          },
          {
            "t": "ideals",
            "w": {
              "en": "Social contract",
              "es": "Contrato social"
            },
            "d": {
              "en": "People give up some freedom to a government that protects their rights.",
              "es": "El pueblo cede parte de su libertad a un gobierno que protege sus derechos."
            }
          },
          {
            "t": "ideals",
            "w": {
              "en": "Pluralist democracy",
              "es": "Democracia pluralista"
            },
            "d": {
              "en": "Groups compete to influence policy; no single group dominates.",
              "es": "Los grupos compiten por influir; ninguno domina."
            }
          },
          {
            "t": "framing",
            "w": {
              "en": "Articles of Confederation",
              "es": "Artículos de la Confederación"
            },
            "d": {
              "en": "The first U.S. government: weak national power, no power to tax.",
              "es": "El primer gobierno de EE. UU.: poder nacional débil, sin poder para gravar."
            }
          },
          {
            "t": "framing",
            "w": {
              "en": "Great Compromise",
              "es": "Gran Compromiso"
            },
            "d": {
              "en": "Created a two-house Congress: House by population, Senate equal.",
              "es": "Creó un Congreso de dos cámaras: Cámara según población, Senado igual."
            }
          },
          {
            "t": "fedpapers",
            "w": {
              "en": "Federalist No. 10",
              "es": "Federalista n.º 10"
            },
            "d": {
              "en": "Madison: a large republic is the best cure for the effects of faction.",
              "es": "Madison: una república grande es la mejor cura contra los efectos de las facciones."
            }
          },
          {
            "t": "fedpapers",
            "w": {
              "en": "Federalist No. 51",
              "es": "Federalista n.º 51"
            },
            "d": {
              "en": "Madison: separation of powers and checks so ambition counteracts ambition.",
              "es": "Madison: separación de poderes y contrapesos para que la ambición contrarreste la ambición."
            }
          },
          {
            "t": "fedpapers",
            "w": {
              "en": "Brutus No. 1",
              "es": "Brutus n.º 1"
            },
            "d": {
              "en": "Anti-Federalist warning that a large, powerful republic threatens liberty.",
              "es": "Advertencia antifederalista: una república grande y poderosa amenaza la libertad."
            }
          },
          {
            "t": "federalism",
            "w": {
              "en": "Federalism",
              "es": "Federalismo"
            },
            "d": {
              "en": "Power divided between national and state governments.",
              "es": "Poder dividido entre el gobierno nacional y los estados."
            }
          },
          {
            "t": "federalism",
            "w": {
              "en": "Commerce Clause",
              "es": "Cláusula de Comercio"
            },
            "d": {
              "en": "Congress's power to regulate interstate commerce; a key source of national power.",
              "es": "Poder del Congreso para regular el comercio interestatal; fuente clave de poder nacional."
            }
          },
          {
            "t": "federalism",
            "w": {
              "en": "Unfunded mandate",
              "es": "Mandato sin fondos"
            },
            "d": {
              "en": "A federal requirement on states that comes without money.",
              "es": "Una exigencia federal a los estados sin dinero."
            }
          }
        ]
      },
      {
        "id": "apg-u2",
        "title": {
          "en": "AP Gov Unit 2 · Interactions Among Branches of Government",
          "es": "Gob AP Unidad 2 · Interacciones entre los poderes del gobierno"
        },
        "brief": {
          "en": "Congress is bicameral: the House (435 members, two-year terms) and the Senate (100 members, six-year terms) have different rules, constituencies and powers. Bills move through committees, and the Senate's filibuster and holds give individual senators influence. Members act as delegates, trustees or politicos, and redistricting matters: Baker v. Carr (1962) opened redistricting to court review (one person, one vote), and Shaw v. Reno (1993) limited racial gerrymandering. The president uses formal powers (veto, commander in chief, treaties, appointments) and informal powers (executive orders, signing statements, the bully pulpit); Federalist No. 70 defends a single, energetic executive. The courts gained judicial review in Marbury v. Madison (1803), and Federalist No. 78 calls the judiciary the 'least dangerous' branch. Judges weigh precedent (stare decisis) and differ on judicial activism versus restraint. The federal bureaucracy carries out laws through rulemaking and discretion, and all three elected branches check it through oversight, funding and appointments.",
          "es": "El Congreso es bicameral: la Cámara (435 miembros, mandatos de dos años) y el Senado (100 miembros, seis años) tienen reglas, electores y poderes distintos. Los proyectos pasan por comités, y el filibusterismo y los bloqueos del Senado dan influencia a cada senador. Los legisladores actúan como delegados, fiduciarios o políticos, y la redistribución de distritos importa: Baker v. Carr (1962) abrió la redistribución a la revisión judicial (una persona, un voto) y Shaw v. Reno (1993) limitó la manipulación racial de distritos. El presidente usa poderes formales (veto, comandante en jefe, tratados, nombramientos) e informales (órdenes ejecutivas, declaraciones de firma, la tribuna presidencial); el Federalista n.º 70 defiende un ejecutivo único y enérgico. Los tribunales obtuvieron la revisión judicial en Marbury v. Madison (1803) y el Federalista n.º 78 llama al poder judicial el 'menos peligroso'. Los jueces sopesan el precedente (stare decisis) y difieren entre activismo y moderación judicial. La burocracia federal aplica las leyes mediante reglamentos y discreción, y las ramas electas la controlan con supervisión, presupuesto y nombramientos."
        },
        "items": [
          {
            "id": "apg201",
            "topic": "congress",
            "type": "numeric",
            "diff": 1,
            "q": {
              "en": "How many voting members are in the House of Representatives?",
              "es": "¿Cuántos miembros con voto tiene la Cámara de Representantes?"
            },
            "a": 435,
            "tol": 0,
            "why": {
              "en": "435 seats, divided among states by population after each census.",
              "es": "435 escaños, repartidos entre estados por población tras cada censo."
            }
          },
          {
            "id": "apg202",
            "topic": "congress",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which power belongs only to the House?",
              "es": "¿Qué poder pertenece solo a la Cámara?"
            },
            "c": {
              "en": [
                "Originating revenue (tax) bills",
                "Confirming Supreme Court justices",
                "Ratifying treaties",
                "Holding impeachment trials"
              ],
              "es": [
                "Iniciar proyectos de ley de impuestos",
                "Confirmar jueces de la Corte Suprema",
                "Ratificar tratados",
                "Celebrar juicios políticos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Revenue bills start in the House and the House impeaches. The Senate confirms, ratifies treaties and holds impeachment trials.",
              "es": "Los proyectos de impuestos empiezan en la Cámara y esta acusa. El Senado confirma, ratifica tratados y juzga."
            }
          },
          {
            "id": "apg203",
            "topic": "congress",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The House Rules Committee is powerful because it:",
              "es": "El Comité de Reglas de la Cámara es poderoso porque:"
            },
            "c": {
              "en": [
                "Sets the terms of debate and amendment for bills reaching the floor",
                "Confirms judges",
                "Writes the federal budget alone",
                "Can veto bills"
              ],
              "es": [
                "Fija las condiciones de debate y enmienda de los proyectos que llegan al pleno",
                "Confirma jueces",
                "Redacta solo el presupuesto federal",
                "Puede vetar proyectos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Rules decides how long a bill is debated and whether amendments are allowed, shaping its chances.",
              "es": "Reglas decide cuánto se debate un proyecto y si se permiten enmiendas, lo que define sus posibilidades."
            }
          },
          {
            "id": "apg204",
            "topic": "congress",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Cloture, which ends a filibuster in the Senate, usually requires:",
              "es": "La clausura, que pone fin al filibusterismo en el Senado, suele requerir:"
            },
            "c": {
              "en": [
                "60 votes",
                "51 votes",
                "67 votes",
                "Approval of the president"
              ],
              "es": [
                "60 votos",
                "51 votos",
                "67 votos",
                "La aprobación del presidente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Three-fifths of the Senate (60) is needed to invoke cloture on most legislation.",
              "es": "Se necesitan tres quintos del Senado (60) para la clausura de la mayoría de los proyectos."
            }
          },
          {
            "id": "apg205",
            "topic": "congress",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A member of Congress who votes based on her own judgment, even against constituents' views, is acting as a:",
              "es": "Una legisladora que vota según su propio juicio, incluso contra sus electores, actúa como:"
            },
            "c": {
              "en": [
                "Trustee",
                "Delegate",
                "Politico",
                "Lobbyist"
              ],
              "es": [
                "Fiduciaria",
                "Delegada",
                "Política",
                "Cabildera"
              ]
            },
            "a": 0,
            "why": {
              "en": "Trustee = own judgment. Delegate = follows constituents. Politico = blends the two depending on the issue.",
              "es": "Fiduciario = juicio propio. Delegado = sigue a los electores. Político = combina ambos según el tema."
            }
          },
          {
            "id": "apg206",
            "topic": "congress",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Baker v. Carr (1962) established that:",
              "es": "Baker v. Carr (1962) estableció que:"
            },
            "c": {
              "en": [
                "Federal courts can hear redistricting cases, leading to 'one person, one vote'",
                "Racial gerrymanders are always legal",
                "The Senate must be apportioned by population",
                "Congress may not draw districts"
              ],
              "es": [
                "Los tribunales federales pueden revisar la redistribución, lo que llevó a 'una persona, un voto'",
                "La manipulación racial de distritos siempre es legal",
                "El Senado debe repartirse por población",
                "El Congreso no puede trazar distritos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Tennessee hadn't redrawn districts in 60 years. The Court said apportionment is justiciable under the Equal Protection Clause.",
              "es": "Tennessee no redibujaba distritos en 60 años. La Corte dijo que la distribución puede revisarse según la Igualdad de Protección."
            }
          },
          {
            "id": "apg207",
            "topic": "congress",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In Shaw v. Reno (1993), the Court ruled that:",
              "es": "En Shaw v. Reno (1993), la Corte decidió que:"
            },
            "c": {
              "en": [
                "Districts drawn mainly on the basis of race can violate the Equal Protection Clause",
                "Partisan gerrymandering is illegal",
                "Every state must have the same number of districts",
                "Courts cannot hear districting cases"
              ],
              "es": [
                "Los distritos trazados principalmente por raza pueden violar la Igualdad de Protección",
                "La manipulación partidista es ilegal",
                "Todos los estados deben tener igual número de distritos",
                "Los tribunales no pueden ver casos de distritos"
              ]
            },
            "a": 0,
            "why": {
              "en": "North Carolina's oddly shaped majority-minority district was challenged; race as the predominant factor triggers strict scrutiny.",
              "es": "Se impugnó un distrito de forma extraña en Carolina del Norte; usar la raza como factor predominante activa el escrutinio estricto."
            }
          },
          {
            "id": "apg208",
            "topic": "congress",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Partisan gerrymandering is:",
              "es": "La manipulación partidista de distritos es:"
            },
            "c": {
              "en": [
                "Drawing district lines to benefit one political party",
                "Counting the population every ten years",
                "Allocating Senate seats",
                "Holding a recall election"
              ],
              "es": [
                "Trazar distritos para beneficiar a un partido",
                "Contar la población cada diez años",
                "Asignar escaños del Senado",
                "Hacer una elección revocatoria"
              ]
            },
            "a": 0,
            "why": {
              "en": "Packing and cracking voters can give one party more seats than its share of votes. Rucho v. Common Cause (2019) left partisan gerrymandering to states and Congress.",
              "es": "Concentrar o dividir votantes puede dar más escaños que votos. Rucho v. Common Cause (2019) dejó el tema a los estados y al Congreso."
            }
          },
          {
            "id": "apg210",
            "topic": "president",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In Federalist No. 70, Hamilton argues for:",
              "es": "En el Federalista n.º 70, Hamilton defiende:"
            },
            "c": {
              "en": [
                "A single, energetic executive",
                "A plural executive council",
                "A weak president chosen by Congress",
                "Term limits for judges"
              ],
              "es": [
                "Un ejecutivo único y enérgico",
                "Un consejo ejecutivo plural",
                "Un presidente débil elegido por el Congreso",
                "Límites de mandato para jueces"
              ]
            },
            "a": 0,
            "why": {
              "en": "Hamilton says 'energy in the executive' is essential for good government, and one person can act with decision, speed and accountability.",
              "es": "Hamilton dice que la 'energía en el ejecutivo' es esencial y que una sola persona actúa con decisión, rapidez y responsabilidad."
            }
          },
          {
            "id": "apg211",
            "topic": "president",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An executive order differs from a law because it:",
              "es": "Una orden ejecutiva se diferencia de una ley porque:"
            },
            "c": {
              "en": [
                "Is issued by the president to direct the executive branch, without a vote of Congress",
                "Must be ratified by the states",
                "Can amend the Constitution",
                "Is written by the Supreme Court"
              ],
              "es": [
                "La emite el presidente para dirigir el poder ejecutivo, sin voto del Congreso",
                "Debe ser ratificada por los estados",
                "Puede enmendar la Constitución",
                "La redacta la Corte Suprema"
              ]
            },
            "a": 0,
            "why": {
              "en": "Executive orders carry legal force within the executive branch but can be overturned by courts, by Congress, or by a later president.",
              "es": "Las órdenes ejecutivas tienen fuerza legal dentro del ejecutivo, pero pueden anularlas los tribunales, el Congreso o otro presidente."
            }
          },
          {
            "id": "apg212",
            "topic": "president",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A president's use of televised speeches and social media to rally public support for a policy is called using the:",
              "es": "El uso que hace un presidente de discursos televisados y redes sociales para ganar apoyo se llama usar la:"
            },
            "c": {
              "en": [
                "Bully pulpit",
                "Pocket veto",
                "Line-item veto",
                "Senatorial courtesy"
              ],
              "es": [
                "Tribuna presidencial (bully pulpit)",
                "Veto de bolsillo",
                "Veto parcial",
                "Cortesía senatorial"
              ]
            },
            "a": 0,
            "why": {
              "en": "The bully pulpit is an informal power: presidents 'go public' to pressure Congress.",
              "es": "La tribuna presidencial es un poder informal: los presidentes apelan al público para presionar al Congreso."
            }
          },
          {
            "id": "apg213",
            "topic": "president",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An executive agreement differs from a treaty because it:",
              "es": "Un acuerdo ejecutivo se diferencia de un tratado porque:"
            },
            "c": {
              "en": [
                "Does not require Senate ratification",
                "Requires a two-thirds vote of the House",
                "Is permanent and cannot be undone",
                "Must be approved by the Supreme Court"
              ],
              "es": [
                "No requiere ratificación del Senado",
                "Requiere dos tercios de la Cámara",
                "Es permanente e irreversible",
                "Debe aprobarlo la Corte Suprema"
              ]
            },
            "a": 0,
            "why": {
              "en": "Presidents use executive agreements with foreign leaders to avoid the two-thirds Senate vote that treaties need.",
              "es": "Los presidentes usan acuerdos ejecutivos para evitar los dos tercios del Senado que requieren los tratados."
            }
          },
          {
            "id": "apg214",
            "topic": "president",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The Twenty-Second Amendment:",
              "es": "La Vigesimosegunda Enmienda:"
            },
            "c": {
              "en": [
                "Limits presidents to two elected terms",
                "Created the vice presidency",
                "Allows a line-item veto",
                "Lowered the voting age"
              ],
              "es": [
                "Limita a los presidentes a dos mandatos electos",
                "Creó la vicepresidencia",
                "Permite el veto parcial",
                "Bajó la edad para votar"
              ]
            },
            "a": 0,
            "why": {
              "en": "Ratified in 1951 after Franklin Roosevelt won four terms.",
              "es": "Ratificada en 1951 tras los cuatro mandatos de Franklin Roosevelt."
            }
          },
          {
            "id": "apg215",
            "topic": "president",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Congress can check the president's power by:",
              "es": "El Congreso puede limitar el poder del presidente mediante:"
            },
            "c": {
              "en": [
                "Overriding a veto with a two-thirds vote in both houses",
                "Issuing executive orders",
                "Granting pardons",
                "Appointing ambassadors"
              ],
              "es": [
                "Anular un veto con dos tercios en ambas cámaras",
                "Emitir órdenes ejecutivas",
                "Conceder indultos",
                "Nombrar embajadores"
              ]
            },
            "a": 0,
            "why": {
              "en": "Other checks: impeachment, refusing to confirm nominees, rejecting treaties, and controlling funding.",
              "es": "Otros controles: juicio político, rechazar nominaciones o tratados y controlar el presupuesto."
            }
          },
          {
            "id": "apg220",
            "topic": "courts",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Marbury v. Madison (1803) established:",
              "es": "Marbury v. Madison (1803) estableció:"
            },
            "c": {
              "en": [
                "Judicial review: the power of courts to strike down unconstitutional laws",
                "The right to counsel",
                "The national bank",
                "Separate but equal"
              ],
              "es": [
                "La revisión judicial: el poder de los tribunales para anular leyes inconstitucionales",
                "El derecho a un abogado",
                "El banco nacional",
                "Separados pero iguales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Chief Justice Marshall ruled part of the Judiciary Act of 1789 unconstitutional, asserting the Court's power to interpret the Constitution.",
              "es": "El juez Marshall declaró inconstitucional parte de la Ley Judicial de 1789 y afirmó el poder de la Corte para interpretar la Constitución."
            }
          },
          {
            "id": "apg221",
            "topic": "courts",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In Federalist No. 78, Hamilton calls the judiciary the 'least dangerous' branch because it:",
              "es": "En el Federalista n.º 78, Hamilton llama al poder judicial la rama 'menos peligrosa' porque:"
            },
            "c": {
              "en": [
                "Has neither force nor will, only judgment",
                "Controls the military",
                "Controls the budget",
                "Is elected every two years"
              ],
              "es": [
                "No tiene ni fuerza ni voluntad, solo juicio",
                "Controla las fuerzas armadas",
                "Controla el presupuesto",
                "Se elige cada dos años"
              ]
            },
            "a": 0,
            "why": {
              "en": "Courts can't enforce rulings or spend money; that weakness is why Hamilton defends life tenure to keep judges independent.",
              "es": "Los tribunales no pueden ejecutar fallos ni gastar dinero; por eso Hamilton defiende el cargo vitalicio para mantener su independencia."
            }
          },
          {
            "id": "apg222",
            "topic": "courts",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Stare decisis means that judges:",
              "es": "Stare decisis significa que los jueces:"
            },
            "c": {
              "en": [
                "Generally follow precedent from earlier decisions",
                "Must follow public opinion",
                "Can never overturn a case",
                "Are elected by voters"
              ],
              "es": [
                "Generalmente siguen el precedente de decisiones anteriores",
                "Deben seguir la opinión pública",
                "Nunca pueden anular un caso",
                "Son elegidos por votantes"
              ]
            },
            "a": 0,
            "why": {
              "en": "Precedent promotes stability, but the Court sometimes overturns it, as Brown did with Plessy and Dobbs did with Roe.",
              "es": "El precedente da estabilidad, pero la Corte a veces lo anula, como Brown con Plessy y Dobbs con Roe."
            }
          },
          {
            "id": "apg223",
            "topic": "courts",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A justice who believes courts should defer to elected branches and rarely strike down laws favors:",
              "es": "Un juez que cree que los tribunales deben deferir a las ramas electas y rara vez anular leyes favorece:"
            },
            "c": {
              "en": [
                "Judicial restraint",
                "Judicial activism",
                "Senatorial courtesy",
                "Executive privilege"
              ],
              "es": [
                "La moderación judicial",
                "El activismo judicial",
                "La cortesía senatorial",
                "El privilegio ejecutivo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Restraint defers to legislatures and precedent; activism is more willing to use judicial review to change policy.",
              "es": "La moderación defiere a las legislaturas y al precedente; el activismo usa más la revisión judicial para cambiar políticas."
            }
          },
          {
            "id": "apg224",
            "topic": "courts",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A written opinion by a justice who agrees with the outcome but for different reasons is a:",
              "es": "Una opinión escrita por un juez que está de acuerdo con el resultado pero por otras razones es una:"
            },
            "c": {
              "en": [
                "Concurring opinion",
                "Dissenting opinion",
                "Majority opinion",
                "Writ of certiorari"
              ],
              "es": [
                "Opinión concurrente",
                "Opinión disidente",
                "Opinión mayoritaria",
                "Auto de certiorari"
              ]
            },
            "a": 0,
            "why": {
              "en": "Dissents disagree with the outcome; concurrences agree with the result but offer other reasoning.",
              "es": "Los votos disidentes rechazan el resultado; los concurrentes lo apoyan con otro razonamiento."
            }
          },
          {
            "id": "apg230",
            "topic": "bureau",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "When a federal agency like the EPA writes detailed regulations to carry out a law, it is using:",
              "es": "Cuando una agencia federal como la EPA redacta reglamentos detallados para aplicar una ley, usa:"
            },
            "c": {
              "en": [
                "Rulemaking authority (discretionary authority)",
                "Judicial review",
                "A pocket veto",
                "Senatorial courtesy"
              ],
              "es": [
                "Su facultad reglamentaria (autoridad discrecional)",
                "La revisión judicial",
                "Un veto de bolsillo",
                "La cortesía senatorial"
              ]
            },
            "a": 0,
            "why": {
              "en": "Congress writes broad laws; agencies fill in the details through rulemaking, which gives the bureaucracy real policy power.",
              "es": "El Congreso redacta leyes amplias; las agencias completan los detalles, lo que da poder real a la burocracia."
            }
          },
          {
            "id": "apg231",
            "topic": "bureau",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "An 'iron triangle' is a relationship among:",
              "es": "Un 'triángulo de hierro' es una relación entre:"
            },
            "c": {
              "en": [
                "A congressional committee, an agency, and an interest group",
                "The three branches of government",
                "The president, the vice president and the Speaker",
                "Three political parties"
              ],
              "es": [
                "Un comité del Congreso, una agencia y un grupo de interés",
                "Las tres ramas del gobierno",
                "El presidente, el vicepresidente y el presidente de la Cámara",
                "Tres partidos políticos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Each side benefits: the group gets favorable policy, the committee gets support, the agency gets funding.",
              "es": "Cada lado gana: el grupo obtiene políticas favorables, el comité apoyo y la agencia fondos."
            }
          },
          {
            "id": "apg232",
            "topic": "bureau",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Congressional oversight of the bureaucracy includes:",
              "es": "La supervisión del Congreso sobre la burocracia incluye:"
            },
            "c": {
              "en": [
                "Holding hearings and controlling agency budgets",
                "Appointing agency heads without the president",
                "Issuing executive orders",
                "Ruling regulations unconstitutional"
              ],
              "es": [
                "Celebrar audiencias y controlar el presupuesto de las agencias",
                "Nombrar jefes de agencias sin el presidente",
                "Emitir órdenes ejecutivas",
                "Declarar inconstitucionales los reglamentos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Congress uses hearings, investigations and the power of the purse; courts can also review agency actions.",
              "es": "El Congreso usa audiencias, investigaciones y el poder del presupuesto; los tribunales también pueden revisar a las agencias."
            }
          },
          {
            "id": "apg233",
            "topic": "bureau",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "The merit system in federal hiring replaced:",
              "es": "El sistema de mérito en la contratación federal reemplazó:"
            },
            "c": {
              "en": [
                "The spoils (patronage) system",
                "Judicial review",
                "The Electoral College",
                "Civil service exams"
              ],
              "es": [
                "El sistema de botín (clientelismo)",
                "La revisión judicial",
                "El Colegio Electoral",
                "Los exámenes de servicio civil"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Pendleton Act (1883) began hiring based on qualifications and exams instead of political loyalty.",
              "es": "La Ley Pendleton (1883) inició la contratación por méritos y exámenes en lugar de lealtad política."
            }
          },
          {
            "id": "apg234",
            "topic": "courts",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Which is a check on the judiciary by Congress?",
              "es": "¿Cuál es un control del Congreso sobre el poder judicial?"
            },
            "c": {
              "en": [
                "Changing the number of judges or the courts' jurisdiction",
                "Vetoing court decisions",
                "Electing justices",
                "Issuing executive orders"
              ],
              "es": [
                "Cambiar el número de jueces o la jurisdicción de los tribunales",
                "Vetar decisiones judiciales",
                "Elegir a los jueces",
                "Emitir órdenes ejecutivas"
              ]
            },
            "a": 0,
            "why": {
              "en": "Congress can also propose amendments to overturn rulings, refuse to confirm nominees, and impeach judges.",
              "es": "El Congreso también puede proponer enmiendas para revertir fallos, rechazar nominaciones y acusar a jueces."
            }
          },
          {
            "id": "apg235",
            "topic": "president",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Presidents increasingly rely on the White House staff and the Executive Office of the President because:",
              "es": "Los presidentes dependen cada vez más del personal de la Casa Blanca y de la Oficina Ejecutiva porque:"
            },
            "c": {
              "en": [
                "They are loyal advisers who don't need Senate confirmation (mostly)",
                "They are elected by voters",
                "They can pass laws",
                "They serve for life"
              ],
              "es": [
                "Son asesores leales que en su mayoría no necesitan confirmación del Senado",
                "Son elegidos por votantes",
                "Pueden aprobar leyes",
                "Son vitalicios"
              ]
            },
            "a": 0,
            "why": {
              "en": "Close advisers help presidents control policy and the bureaucracy; Cabinet secretaries need confirmation and run large departments.",
              "es": "Los asesores cercanos ayudan a controlar las políticas y la burocracia; los secretarios del Gabinete necesitan confirmación."
            }
          }
        ],
        "topics": [
          {
            "id": "congress",
            "en": "Congress",
            "es": "El Congreso"
          },
          {
            "id": "president",
            "en": "The Presidency",
            "es": "La presidencia"
          },
          {
            "id": "courts",
            "en": "The Courts",
            "es": "Los tribunales"
          },
          {
            "id": "bureau",
            "en": "The Bureaucracy",
            "es": "La burocracia"
          }
        ],
        "vocab": [
          {
            "t": "congress",
            "w": {
              "en": "Filibuster",
              "es": "Filibusterismo"
            },
            "d": {
              "en": "Senate tactic of extended debate to block a vote; ended by cloture (60 votes).",
              "es": "Táctica del Senado de debate prolongado para bloquear una votación; se termina con la clausura (60 votos)."
            }
          },
          {
            "t": "congress",
            "w": {
              "en": "Gerrymandering",
              "es": "Manipulación de distritos"
            },
            "d": {
              "en": "Drawing district lines to benefit a party or group.",
              "es": "Trazar distritos para beneficiar a un partido o grupo."
            }
          },
          {
            "t": "congress",
            "w": {
              "en": "Trustee model",
              "es": "Modelo fiduciario"
            },
            "d": {
              "en": "A representative votes on personal judgment of what is best.",
              "es": "El representante vota según su juicio de lo que es mejor."
            }
          },
          {
            "t": "congress",
            "w": {
              "en": "Delegate model",
              "es": "Modelo delegado"
            },
            "d": {
              "en": "A representative votes the way constituents want.",
              "es": "El representante vota como quieren sus electores."
            }
          },
          {
            "t": "president",
            "w": {
              "en": "Federalist No. 70",
              "es": "Federalista n.º 70"
            },
            "d": {
              "en": "Hamilton's defense of a single, energetic executive.",
              "es": "Defensa de Hamilton de un ejecutivo único y enérgico."
            }
          },
          {
            "t": "president",
            "w": {
              "en": "Executive order",
              "es": "Orden ejecutiva"
            },
            "d": {
              "en": "A presidential directive with legal force inside the executive branch.",
              "es": "Directiva presidencial con fuerza legal dentro del ejecutivo."
            }
          },
          {
            "t": "president",
            "w": {
              "en": "Bully pulpit",
              "es": "Tribuna presidencial"
            },
            "d": {
              "en": "The president's platform to persuade the public and pressure Congress.",
              "es": "La plataforma del presidente para persuadir al público y presionar al Congreso."
            }
          },
          {
            "t": "courts",
            "w": {
              "en": "Judicial review",
              "es": "Revisión judicial"
            },
            "d": {
              "en": "The power of courts to strike down unconstitutional laws and actions.",
              "es": "El poder de los tribunales para anular leyes y actos inconstitucionales."
            }
          },
          {
            "t": "courts",
            "w": {
              "en": "Federalist No. 78",
              "es": "Federalista n.º 78"
            },
            "d": {
              "en": "Hamilton: the judiciary is the least dangerous branch; supports life tenure.",
              "es": "Hamilton: el poder judicial es la rama menos peligrosa; apoya el cargo vitalicio."
            }
          },
          {
            "t": "courts",
            "w": {
              "en": "Stare decisis",
              "es": "Stare decisis"
            },
            "d": {
              "en": "Following precedent from earlier court decisions.",
              "es": "Seguir el precedente de decisiones anteriores."
            }
          },
          {
            "t": "bureau",
            "w": {
              "en": "Bureaucracy",
              "es": "Burocracia"
            },
            "d": {
              "en": "Federal departments and agencies that carry out laws.",
              "es": "Departamentos y agencias federales que aplican las leyes."
            }
          },
          {
            "t": "bureau",
            "w": {
              "en": "Iron triangle",
              "es": "Triángulo de hierro"
            },
            "d": {
              "en": "Committee + agency + interest group working together for mutual benefit.",
              "es": "Comité + agencia + grupo de interés que trabajan juntos para beneficio mutuo."
            }
          }
        ]
      },
      {
        "id": "apg-u3",
        "title": {
          "en": "AP Gov Unit 3 · Civil Liberties and Civil Rights",
          "es": "Gob AP Unidad 3 · Libertades y derechos civiles"
        },
        "brief": {
          "en": "Civil liberties protect individuals from government; civil rights protect people from discrimination. The Bill of Rights first limited only the national government, but the Fourteenth Amendment's Due Process Clause lets the Court apply most protections to the states one by one (selective incorporation), as in McDonald v. Chicago (2010) for the Second Amendment. The First Amendment's Establishment Clause bars government-sponsored religion (Engel v. Vitale, 1962), and the Free Exercise Clause protects religious practice (Wisconsin v. Yoder, 1972). Speech is protected but not unlimited: Schenck v. U.S. (1919) created the 'clear and present danger' test, Tinker v. Des Moines (1969) protected students' symbolic speech, and New York Times v. U.S. (1971) blocked prior restraint of the press. Gideon v. Wainwright (1963) guaranteed a lawyer to poor defendants in state felony cases. Roe v. Wade (1973) found a right to privacy covering abortion; Dobbs v. Jackson (2022) overturned Roe and returned the issue to the states. Civil rights advanced through Brown v. Board (1954), the movement Martin Luther King Jr. defended in the 'Letter from Birmingham Jail,' and laws like the Civil Rights Act of 1964 and Title IX.",
          "es": "Las libertades civiles protegen a las personas frente al gobierno; los derechos civiles las protegen de la discriminación. La Carta de Derechos al principio solo limitaba al gobierno nacional, pero la Cláusula del Debido Proceso de la Decimocuarta Enmienda permite aplicar la mayoría de las protecciones a los estados una por una (incorporación selectiva), como en McDonald v. Chicago (2010) para la Segunda Enmienda. La Cláusula de Establecimiento prohíbe la religión patrocinada por el gobierno (Engel v. Vitale, 1962) y la de Libre Ejercicio protege la práctica religiosa (Wisconsin v. Yoder, 1972). La expresión está protegida pero no es ilimitada: Schenck v. U.S. (1919) creó la prueba del 'peligro claro y presente', Tinker v. Des Moines (1969) protegió la expresión simbólica estudiantil y New York Times v. U.S. (1971) bloqueó la censura previa. Gideon v. Wainwright (1963) garantizó abogado a los acusados pobres en delitos graves estatales. Roe v. Wade (1973) reconoció un derecho a la privacidad que incluía el aborto; Dobbs v. Jackson (2022) anuló Roe y devolvió el tema a los estados. Los derechos civiles avanzaron con Brown v. Board (1954), el movimiento que Martin Luther King Jr. defendió en la 'Carta desde la cárcel de Birmingham' y leyes como la Ley de Derechos Civiles de 1964 y el Título IX."
        },
        "items": [
          {
            "id": "apg301",
            "topic": "incorp",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Civil liberties are best described as:",
              "es": "Las libertades civiles se describen mejor como:"
            },
            "c": {
              "en": [
                "Protections of individuals from government power",
                "Protections from discrimination by others",
                "Powers of the states",
                "Duties of citizens"
              ],
              "es": [
                "Protecciones de las personas frente al poder del gobierno",
                "Protecciones contra la discriminación",
                "Poderes de los estados",
                "Deberes de los ciudadanos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Liberties limit what government can do to you (speech, religion, due process). Civil rights guarantee equal treatment.",
              "es": "Las libertades limitan lo que el gobierno puede hacerte (expresión, religión, debido proceso). Los derechos civiles garantizan trato igual."
            }
          },
          {
            "id": "apg302",
            "topic": "incorp",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Selective incorporation is the process by which:",
              "es": "La incorporación selectiva es el proceso mediante el cual:"
            },
            "c": {
              "en": [
                "The Court applies Bill of Rights protections to the states through the 14th Amendment",
                "States ratify amendments",
                "Congress adds new rights by law",
                "Citizens petition the president"
              ],
              "es": [
                "La Corte aplica protecciones de la Carta de Derechos a los estados mediante la Enmienda 14",
                "Los estados ratifican enmiendas",
                "El Congreso añade derechos por ley",
                "Los ciudadanos piden al presidente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Case by case, the Due Process Clause has been used to bind states to most of the Bill of Rights.",
              "es": "Caso por caso, la Cláusula del Debido Proceso se ha usado para obligar a los estados a respetar casi toda la Carta de Derechos."
            }
          },
          {
            "id": "apg303",
            "topic": "incorp",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "McDonald v. Chicago (2010) held that:",
              "es": "McDonald v. Chicago (2010) decidió que:"
            },
            "c": {
              "en": [
                "The Second Amendment right to keep and bear arms applies to the states",
                "States may ban all handguns",
                "Only the military may own guns",
                "The Second Amendment is unconstitutional"
              ],
              "es": [
                "El derecho de la Segunda Enmienda a poseer armas se aplica a los estados",
                "Los estados pueden prohibir todas las pistolas",
                "Solo los militares pueden tener armas",
                "La Segunda Enmienda es inconstitucional"
              ]
            },
            "a": 0,
            "why": {
              "en": "Chicago's handgun ban was struck down; the Second Amendment was incorporated through the 14th Amendment.",
              "es": "Se anuló la prohibición de pistolas de Chicago; la Segunda Enmienda fue incorporada mediante la Enmienda 14."
            }
          },
          {
            "id": "apg304",
            "topic": "incorp",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Before incorporation, the Bill of Rights originally limited:",
              "es": "Antes de la incorporación, la Carta de Derechos originalmente limitaba:"
            },
            "c": {
              "en": [
                "Only the national government",
                "Only state governments",
                "Private businesses",
                "Both levels equally"
              ],
              "es": [
                "Solo al gobierno nacional",
                "Solo a los gobiernos estatales",
                "A las empresas privadas",
                "A ambos niveles por igual"
              ]
            },
            "a": 0,
            "why": {
              "en": "Barron v. Baltimore (1833) held the Bill of Rights applied only to the national government, which the 14th Amendment later changed.",
              "es": "Barron v. Baltimore (1833) dijo que la Carta solo aplicaba al gobierno nacional; la Enmienda 14 lo cambió después."
            }
          },
          {
            "id": "apg310",
            "topic": "religion",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Engel v. Vitale (1962) ruled that:",
              "es": "Engel v. Vitale (1962) decidió que:"
            },
            "c": {
              "en": [
                "School-sponsored prayer in public schools violates the Establishment Clause",
                "Students may not pray privately at school",
                "Amish children must attend high school",
                "Religious groups cannot meet anywhere"
              ],
              "es": [
                "La oración patrocinada por la escuela pública viola la Cláusula de Establecimiento",
                "Los estudiantes no pueden orar en privado en la escuela",
                "Los niños amish deben ir a la secundaria",
                "Los grupos religiosos no pueden reunirse"
              ]
            },
            "a": 0,
            "why": {
              "en": "New York's voluntary nondenominational prayer was still government endorsement of religion. Students can still pray on their own.",
              "es": "La oración voluntaria y no confesional de Nueva York seguía siendo apoyo estatal a la religión. Los estudiantes aún pueden orar por su cuenta."
            }
          },
          {
            "id": "apg311",
            "topic": "religion",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Wisconsin v. Yoder (1972) held that:",
              "es": "Wisconsin v. Yoder (1972) decidió que:"
            },
            "c": {
              "en": [
                "Amish families' free exercise rights outweighed the state's interest in schooling past 8th grade",
                "Schools may require prayer",
                "States can ban religious schools",
                "The Establishment Clause doesn't apply to states"
              ],
              "es": [
                "El libre ejercicio de las familias amish pesaba más que el interés estatal en la escolaridad después del 8.º grado",
                "Las escuelas pueden exigir oración",
                "Los estados pueden prohibir escuelas religiosas",
                "La Cláusula de Establecimiento no aplica a los estados"
              ]
            },
            "a": 0,
            "why": {
              "en": "Compulsory attendance laws had to yield to the Amish religious practice: a Free Exercise case.",
              "es": "Las leyes de asistencia obligatoria cedieron ante la práctica religiosa amish: un caso de Libre Ejercicio."
            }
          },
          {
            "id": "apg312",
            "topic": "religion",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Engel v. Vitale and Wisconsin v. Yoder are both First Amendment cases. The key difference is:",
              "es": "Engel v. Vitale y Wisconsin v. Yoder son casos de la Primera Enmienda. La diferencia clave es:"
            },
            "c": {
              "en": [
                "Engel involves the Establishment Clause; Yoder involves the Free Exercise Clause",
                "Both are about free speech",
                "Engel is about guns; Yoder about the press",
                "Engel was overturned by Yoder"
              ],
              "es": [
                "Engel trata la Cláusula de Establecimiento; Yoder la de Libre Ejercicio",
                "Ambos tratan la libertad de expresión",
                "Engel trata de armas; Yoder de la prensa",
                "Yoder anuló Engel"
              ]
            },
            "a": 0,
            "why": {
              "en": "Establishment: government can't sponsor religion. Free exercise: government can't unduly burden practice.",
              "es": "Establecimiento: el gobierno no puede patrocinar una religión. Libre ejercicio: no puede obstaculizar indebidamente la práctica."
            }
          },
          {
            "id": "apg320",
            "topic": "speech",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Schenck v. United States (1919) established that speech can be limited when it:",
              "es": "Schenck v. United States (1919) estableció que la expresión puede limitarse cuando:"
            },
            "c": {
              "en": [
                "Creates a 'clear and present danger'",
                "Criticizes the president",
                "Is printed in a newspaper",
                "Is unpopular"
              ],
              "es": [
                "Crea un 'peligro claro y presente'",
                "Critica al presidente",
                "Se publica en un periódico",
                "Es impopular"
              ]
            },
            "a": 0,
            "why": {
              "en": "Schenck's anti-draft leaflets during WWI were punishable. Later cases (Brandenburg v. Ohio, 1969) narrowed the test to imminent lawless action.",
              "es": "Los folletos contra el reclutamiento de Schenck en la Primera Guerra Mundial fueron castigados. Brandenburg v. Ohio (1969) restringió la prueba a la acción ilegal inminente."
            }
          },
          {
            "id": "apg321",
            "topic": "speech",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Tinker v. Des Moines (1969) protected students' right to:",
              "es": "Tinker v. Des Moines (1969) protegió el derecho de los estudiantes a:"
            },
            "c": {
              "en": [
                "Wear black armbands to protest the Vietnam War",
                "Skip class to protest",
                "Publish anything in the school paper",
                "Pray over the loudspeaker"
              ],
              "es": [
                "Usar brazaletes negros para protestar contra la guerra de Vietnam",
                "Faltar a clase para protestar",
                "Publicar lo que quieran en el periódico escolar",
                "Orar por los altavoces"
              ]
            },
            "a": 0,
            "why": {
              "en": "Students don't 'shed their constitutional rights at the schoolhouse gate'; symbolic speech is protected unless it substantially disrupts school.",
              "es": "Los estudiantes no 'dejan sus derechos en la puerta de la escuela'; la expresión simbólica está protegida si no altera sustancialmente."
            }
          },
          {
            "id": "apg322",
            "topic": "speech",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "New York Times Co. v. United States (1971) ruled that:",
              "es": "New York Times Co. v. United States (1971) decidió que:"
            },
            "c": {
              "en": [
                "The government could not block publication of the Pentagon Papers (no prior restraint)",
                "Newspapers must get government approval",
                "Libel is always protected",
                "The press may print classified documents only in wartime"
              ],
              "es": [
                "El gobierno no podía impedir la publicación de los Papeles del Pentágono (sin censura previa)",
                "Los periódicos necesitan aprobación del gobierno",
                "La difamación siempre está protegida",
                "La prensa solo puede publicar documentos clasificados en guerra"
              ]
            },
            "a": 0,
            "why": {
              "en": "The government bears a heavy burden to justify prior restraint, and it failed here.",
              "es": "El gobierno debe justificar con creces la censura previa, y aquí no lo logró."
            }
          },
          {
            "id": "apg323",
            "topic": "speech",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Prior restraint means:",
              "es": "La censura previa significa:"
            },
            "c": {
              "en": [
                "Government blocking speech or publication before it happens",
                "Punishing speech after it occurs",
                "Limiting campaign donations",
                "Requiring a warrant"
              ],
              "es": [
                "Que el gobierno impida la expresión o publicación antes de que ocurra",
                "Castigar la expresión después",
                "Limitar donaciones de campaña",
                "Exigir una orden judicial"
              ]
            },
            "a": 0,
            "why": {
              "en": "Courts treat prior restraint as one of the most serious threats to a free press.",
              "es": "Los tribunales ven la censura previa como una de las amenazas más graves a la prensa libre."
            }
          },
          {
            "id": "apg324",
            "topic": "speech",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every type of speech that receives LESS First Amendment protection.",
              "es": "Selecciona cada tipo de expresión que recibe MENOS protección de la Primera Enmienda."
            },
            "c": {
              "en": [
                "Defamation (libel and slander)",
                "True threats",
                "Obscenity",
                "Criticism of government officials"
              ],
              "es": [
                "Difamación (libelo y calumnia)",
                "Amenazas reales",
                "Obscenidad",
                "Críticas a funcionarios públicos"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Political criticism is at the core of protected speech. Libel, true threats and obscenity can be restricted.",
              "es": "La crítica política está en el centro de la expresión protegida. La difamación, las amenazas y la obscenidad pueden restringirse."
            }
          },
          {
            "id": "apg330",
            "topic": "accused",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Gideon v. Wainwright (1963) held that:",
              "es": "Gideon v. Wainwright (1963) decidió que:"
            },
            "c": {
              "en": [
                "States must provide a lawyer to defendants in felony cases who cannot afford one",
                "Police must read suspects their rights",
                "Evidence from illegal searches is excluded",
                "The death penalty is unconstitutional"
              ],
              "es": [
                "Los estados deben dar abogado a acusados de delitos graves que no puedan pagarlo",
                "La policía debe leer sus derechos a los sospechosos",
                "Se excluyen pruebas de registros ilegales",
                "La pena de muerte es inconstitucional"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Sixth Amendment right to counsel was incorporated to the states through the 14th Amendment.",
              "es": "El derecho a abogado de la Sexta Enmienda se incorporó a los estados mediante la Enmienda 14."
            }
          },
          {
            "id": "apg331",
            "topic": "accused",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The exclusionary rule (Mapp v. Ohio, 1961) means:",
              "es": "La regla de exclusión (Mapp v. Ohio, 1961) significa:"
            },
            "c": {
              "en": [
                "Evidence from an illegal search generally can't be used in court",
                "Defendants may exclude jurors they dislike",
                "Police may search without warrants",
                "Some people are excluded from voting"
              ],
              "es": [
                "Las pruebas de un registro ilegal generalmente no pueden usarse en juicio",
                "Los acusados pueden excluir jurados",
                "La policía puede registrar sin orden",
                "Algunas personas no pueden votar"
              ]
            },
            "a": 0,
            "why": {
              "en": "The rule enforces the Fourth Amendment against the states.",
              "es": "La regla aplica la Cuarta Enmienda a los estados."
            }
          },
          {
            "id": "apg332",
            "topic": "accused",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Roe v. Wade (1973) is still studied today. Which statement is accurate?",
              "es": "Roe v. Wade (1973) aún se estudia hoy. ¿Qué afirmación es correcta?"
            },
            "c": {
              "en": [
                "Roe found a right to privacy covering abortion, and Dobbs v. Jackson (2022) overturned it",
                "Roe is still the controlling precedent nationwide",
                "Roe was about school prayer",
                "Roe was decided by Congress"
              ],
              "es": [
                "Roe reconoció un derecho a la privacidad que incluía el aborto, y Dobbs v. Jackson (2022) lo anuló",
                "Roe sigue siendo el precedente vigente en todo el país",
                "Roe trataba de la oración escolar",
                "Roe lo decidió el Congreso"
              ]
            },
            "a": 0,
            "why": {
              "en": "Roe extended the implied right to privacy. Dobbs held the Constitution doesn't protect a right to abortion, returning the issue to the states, a key example of the Court overturning precedent.",
              "es": "Roe amplió el derecho implícito a la privacidad. Dobbs sostuvo que la Constitución no protege el aborto y devolvió el tema a los estados."
            }
          },
          {
            "id": "apg333",
            "topic": "accused",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The right to privacy is described as 'implied' because:",
              "es": "El derecho a la privacidad se describe como 'implícito' porque:"
            },
            "c": {
              "en": [
                "The Constitution doesn't name it; courts inferred it from several amendments",
                "It appears in Article I",
                "States created it",
                "It only applies to the president"
              ],
              "es": [
                "La Constitución no lo menciona; los tribunales lo dedujeron de varias enmiendas",
                "Aparece en el Artículo I",
                "Lo crearon los estados",
                "Solo aplica al presidente"
              ]
            },
            "a": 0,
            "why": {
              "en": "Griswold v. Connecticut (1965) found privacy in the 'penumbras' of the 1st, 3rd, 4th, 5th and 9th Amendments.",
              "es": "Griswold v. Connecticut (1965) encontró la privacidad en las 'penumbras' de las Enmiendas 1, 3, 4, 5 y 9."
            }
          },
          {
            "id": "apg334",
            "topic": "accused",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Due process of law, protected by the Fifth and Fourteenth Amendments, means government must:",
              "es": "El debido proceso, protegido por las Enmiendas 5 y 14, significa que el gobierno debe:"
            },
            "c": {
              "en": [
                "Follow fair procedures before taking life, liberty or property",
                "Give everyone the same income",
                "Allow anyone to vote at 16",
                "Hold trials without juries"
              ],
              "es": [
                "Seguir procedimientos justos antes de quitar la vida, la libertad o la propiedad",
                "Dar a todos el mismo ingreso",
                "Permitir votar a los 16",
                "Hacer juicios sin jurado"
              ]
            },
            "a": 0,
            "why": {
              "en": "Due process includes notice, a fair hearing and an impartial judge.",
              "es": "El debido proceso incluye aviso, una audiencia justa y un juez imparcial."
            }
          },
          {
            "id": "apg340",
            "topic": "civilrights",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Brown v. Board of Education (1954) held that:",
              "es": "Brown v. Board of Education (1954) decidió que:"
            },
            "c": {
              "en": [
                "Racially segregated public schools violate the Equal Protection Clause",
                "Separate but equal is constitutional",
                "Schools may hold prayer",
                "Students have free speech rights"
              ],
              "es": [
                "Las escuelas públicas segregadas por raza violan la Igualdad de Protección",
                "Separados pero iguales es constitucional",
                "Las escuelas pueden tener oración",
                "Los estudiantes tienen libertad de expresión"
              ]
            },
            "a": 0,
            "why": {
              "en": "Brown overturned Plessy v. Ferguson (1896): separate educational facilities are inherently unequal.",
              "es": "Brown anuló Plessy v. Ferguson (1896): las escuelas separadas son desiguales por naturaleza."
            }
          },
          {
            "id": "apg341",
            "topic": "civilrights",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In the 'Letter from Birmingham Jail' (1963), Martin Luther King Jr. argues that:",
              "es": "En la 'Carta desde la cárcel de Birmingham' (1963), Martin Luther King Jr. sostiene que:"
            },
            "c": {
              "en": [
                "People have a moral duty to disobey unjust laws through nonviolent action",
                "Change should wait for the courts alone",
                "Violence is necessary for change",
                "Segregation should be ended state by state over decades"
              ],
              "es": [
                "Las personas tienen el deber moral de desobedecer leyes injustas con acción no violenta",
                "El cambio debe esperar solo a los tribunales",
                "La violencia es necesaria para el cambio",
                "La segregación debe terminar estado por estado en décadas"
              ]
            },
            "a": 0,
            "why": {
              "en": "King answers clergy who called protests 'untimely': 'justice too long delayed is justice denied,' and civil disobedience must be open and nonviolent.",
              "es": "King responde a clérigos que llamaron 'inoportunas' las protestas: 'la justicia demorada es justicia negada', y la desobediencia civil debe ser abierta y no violenta."
            }
          },
          {
            "id": "apg342",
            "topic": "civilrights",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Civil Rights Act of 1964:",
              "es": "La Ley de Derechos Civiles de 1964:"
            },
            "c": {
              "en": [
                "Banned discrimination in public accommodations and employment",
                "Gave women the right to vote",
                "Ended the poll tax in federal elections only",
                "Created the Electoral College"
              ],
              "es": [
                "Prohibió la discriminación en lugares públicos y en el empleo",
                "Dio el voto a las mujeres",
                "Solo eliminó el impuesto al voto en elecciones federales",
                "Creó el Colegio Electoral"
              ]
            },
            "a": 0,
            "why": {
              "en": "Congress used the Commerce Clause to reach private businesses like hotels and restaurants.",
              "es": "El Congreso usó la Cláusula de Comercio para alcanzar negocios privados como hoteles y restaurantes."
            }
          },
          {
            "id": "apg343",
            "topic": "civilrights",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Voting Rights Act of 1965 primarily:",
              "es": "La Ley de Derecho al Voto de 1965 principalmente:"
            },
            "c": {
              "en": [
                "Banned literacy tests and gave federal oversight of voting in places with histories of discrimination",
                "Lowered the voting age to 18",
                "Created the Electoral College",
                "Banned political parties"
              ],
              "es": [
                "Prohibió las pruebas de alfabetización y dio supervisión federal donde hubo discriminación",
                "Bajó la edad de voto a 18",
                "Creó el Colegio Electoral",
                "Prohibió los partidos"
              ]
            },
            "a": 0,
            "why": {
              "en": "The VRA enforced the 15th Amendment. Shelby County v. Holder (2013) struck down its coverage formula.",
              "es": "La ley aplicó la Enmienda 15. Shelby County v. Holder (2013) anuló su fórmula de cobertura."
            }
          },
          {
            "id": "apg344",
            "topic": "civilrights",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Title IX of the Education Amendments (1972) prohibits:",
              "es": "El Título IX de las Enmiendas Educativas (1972) prohíbe:"
            },
            "c": {
              "en": [
                "Sex discrimination in federally funded education programs, including sports",
                "Prayer in schools",
                "Segregated schools by race",
                "Federal aid to private colleges"
              ],
              "es": [
                "La discriminación por sexo en programas educativos con fondos federales, incluidos los deportes",
                "La oración en las escuelas",
                "Las escuelas segregadas por raza",
                "La ayuda federal a universidades privadas"
              ]
            },
            "a": 0,
            "why": {
              "en": "Title IX dramatically expanded girls' and women's athletics.",
              "es": "El Título IX amplió enormemente el deporte femenino."
            }
          },
          {
            "id": "apg345",
            "topic": "civilrights",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Both Brown v. Board and the Letter from Birmingham Jail argue that:",
              "es": "Tanto Brown v. Board como la Carta desde la cárcel de Birmingham sostienen que:"
            },
            "c": {
              "en": [
                "Segregation denies people equal dignity and must end",
                "States should control civil rights",
                "Change should be gradual",
                "Courts should not decide civil rights"
              ],
              "es": [
                "La segregación niega la igualdad de dignidad y debe terminar",
                "Los estados deben controlar los derechos civiles",
                "El cambio debe ser gradual",
                "Los tribunales no deben decidir sobre derechos civiles"
              ]
            },
            "a": 0,
            "why": {
              "en": "Brown found segregation creates a feeling of inferiority; King argued segregation 'distorts the soul.' Both demand equal treatment now.",
              "es": "Brown dijo que la segregación genera inferioridad; King, que 'distorsiona el alma'. Ambos exigen igualdad ya."
            }
          },
          {
            "id": "apg346",
            "topic": "speech",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A public school suspends a student for a social-media post made at home that caused no disruption. Based on precedent, a court would most likely:",
              "es": "Una escuela suspende a un estudiante por una publicación hecha en casa que no causó alteración. Según el precedente, un tribunal probablemente:"
            },
            "c": {
              "en": [
                "Side with the student, because the speech didn't substantially disrupt school",
                "Side with the school, because schools may punish any speech",
                "Refuse to hear the case",
                "Apply the Establishment Clause"
              ],
              "es": [
                "Daría la razón al estudiante, porque no hubo alteración sustancial",
                "Daría la razón a la escuela, porque puede castigar cualquier expresión",
                "Se negaría a ver el caso",
                "Aplicaría la Cláusula de Establecimiento"
              ]
            },
            "a": 0,
            "why": {
              "en": "Tinker's disruption test, applied to off-campus speech in Mahanoy v. B.L. (2021), favors the student here.",
              "es": "La prueba de alteración de Tinker, aplicada fuera del campus en Mahanoy v. B.L. (2021), favorece al estudiante."
            }
          },
          {
            "id": "apg347",
            "topic": "incorp",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which clause has the Court used to incorporate most of the Bill of Rights?",
              "es": "¿Qué cláusula ha usado la Corte para incorporar la mayor parte de la Carta de Derechos?"
            },
            "c": {
              "en": [
                "The Due Process Clause of the 14th Amendment",
                "The Commerce Clause",
                "The Supremacy Clause",
                "The Elastic Clause"
              ],
              "es": [
                "La Cláusula del Debido Proceso de la Enmienda 14",
                "La Cláusula de Comercio",
                "La Cláusula de Supremacía",
                "La Cláusula Elástica"
              ]
            },
            "a": 0,
            "why": {
              "en": "'Nor shall any State deprive any person of life, liberty, or property, without due process of law' is the hook for selective incorporation.",
              "es": "'Ningún Estado privará a persona alguna de la vida, la libertad o la propiedad sin el debido proceso legal' es la base de la incorporación selectiva."
            }
          }
        ],
        "topics": [
          {
            "id": "incorp",
            "en": "Rights & Incorporation",
            "es": "Derechos e incorporación"
          },
          {
            "id": "religion",
            "en": "Freedom of Religion",
            "es": "Libertad de religión"
          },
          {
            "id": "speech",
            "en": "Speech & Press",
            "es": "Expresión y prensa"
          },
          {
            "id": "accused",
            "en": "Due Process & Privacy",
            "es": "Debido proceso y privacidad"
          },
          {
            "id": "civilrights",
            "en": "Civil Rights",
            "es": "Derechos civiles"
          }
        ],
        "vocab": [
          {
            "t": "incorp",
            "w": {
              "en": "Civil liberties",
              "es": "Libertades civiles"
            },
            "d": {
              "en": "Protections of individuals from government, like speech and religion.",
              "es": "Protecciones frente al gobierno, como la expresión y la religión."
            }
          },
          {
            "t": "incorp",
            "w": {
              "en": "Selective incorporation",
              "es": "Incorporación selectiva"
            },
            "d": {
              "en": "Applying Bill of Rights protections to states through the 14th Amendment.",
              "es": "Aplicar la Carta de Derechos a los estados mediante la Enmienda 14."
            }
          },
          {
            "t": "religion",
            "w": {
              "en": "Establishment Clause",
              "es": "Cláusula de Establecimiento"
            },
            "d": {
              "en": "Government may not establish or sponsor religion (Engel v. Vitale).",
              "es": "El gobierno no puede establecer ni patrocinar una religión (Engel v. Vitale)."
            }
          },
          {
            "t": "religion",
            "w": {
              "en": "Free Exercise Clause",
              "es": "Cláusula de Libre Ejercicio"
            },
            "d": {
              "en": "Government may not unduly burden religious practice (Wisconsin v. Yoder).",
              "es": "El gobierno no puede obstaculizar la práctica religiosa (Wisconsin v. Yoder)."
            }
          },
          {
            "t": "speech",
            "w": {
              "en": "Clear and present danger",
              "es": "Peligro claro y presente"
            },
            "d": {
              "en": "Schenck test for limiting speech that threatens serious harm.",
              "es": "Prueba de Schenck para limitar expresión que amenaza un daño grave."
            }
          },
          {
            "t": "speech",
            "w": {
              "en": "Symbolic speech",
              "es": "Expresión simbólica"
            },
            "d": {
              "en": "Expression through actions, like armbands (Tinker v. Des Moines).",
              "es": "Expresión mediante acciones, como brazaletes (Tinker v. Des Moines)."
            }
          },
          {
            "t": "speech",
            "w": {
              "en": "Prior restraint",
              "es": "Censura previa"
            },
            "d": {
              "en": "Blocking publication in advance; rarely allowed (NYT v. U.S.).",
              "es": "Impedir una publicación de antemano; casi nunca se permite (NYT v. U.S.)."
            }
          },
          {
            "t": "accused",
            "w": {
              "en": "Right to counsel",
              "es": "Derecho a abogado"
            },
            "d": {
              "en": "Sixth Amendment; states must provide lawyers to poor defendants (Gideon).",
              "es": "Sexta Enmienda; los estados deben dar abogado a acusados pobres (Gideon)."
            }
          },
          {
            "t": "accused",
            "w": {
              "en": "Due process",
              "es": "Debido proceso"
            },
            "d": {
              "en": "Government must follow fair procedures before taking life, liberty or property.",
              "es": "El gobierno debe seguir procedimientos justos antes de quitar vida, libertad o propiedad."
            }
          },
          {
            "t": "accused",
            "w": {
              "en": "Right to privacy",
              "es": "Derecho a la privacidad"
            },
            "d": {
              "en": "An implied right; Roe (1973) applied it to abortion until Dobbs (2022).",
              "es": "Un derecho implícito; Roe (1973) lo aplicó al aborto hasta Dobbs (2022)."
            }
          },
          {
            "t": "civilrights",
            "w": {
              "en": "Equal Protection Clause",
              "es": "Cláusula de Igualdad de Protección"
            },
            "d": {
              "en": "14th Amendment: states must treat people equally under the law.",
              "es": "Enmienda 14: los estados deben tratar a todos por igual ante la ley."
            }
          },
          {
            "t": "civilrights",
            "w": {
              "en": "Civil disobedience",
              "es": "Desobediencia civil"
            },
            "d": {
              "en": "Open, nonviolent refusal to obey unjust laws (King's Birmingham letter).",
              "es": "Negarse abierta y pacíficamente a obedecer leyes injustas (carta de King)."
            }
          }
        ]
      },
      {
        "id": "apg-u4",
        "title": {
          "en": "AP Gov Unit 4 · American Political Ideologies and Beliefs",
          "es": "Gob AP Unidad 4 · Ideologías y creencias políticas estadounidenses"
        },
        "brief": {
          "en": "Americans share core values (individualism, equality of opportunity, free enterprise, rule of law, limited government) but weigh them differently. People form political attitudes through political socialization: family, schools, peers, media, religion and major events, with generational effects and life-cycle effects shaping views over time. Public opinion is measured with scientific polls that rely on random samples, neutral wording and an acceptable margin of error; exit polls, tracking polls and benchmark polls serve different purposes. Ideology organizes beliefs: liberals generally favor more government action on the economy and less on personal behavior; conservatives favor less economic regulation and more emphasis on traditional values and order; libertarians want limited government in both areas. Ideology shapes policy debates, including economic policy: Keynesian economics calls for government spending to manage demand, supply-side economics emphasizes tax cuts and incentives, and monetary policy is run by the independent Federal Reserve.",
          "es": "Los estadounidenses comparten valores básicos (individualismo, igualdad de oportunidades, libre empresa, Estado de derecho, gobierno limitado), pero los valoran de forma distinta. Las actitudes políticas se forman por socialización política: familia, escuela, amigos, medios, religión y grandes acontecimientos, con efectos generacionales y del ciclo de vida. La opinión pública se mide con encuestas científicas basadas en muestras aleatorias, preguntas neutrales y un margen de error aceptable; las encuestas a boca de urna, de seguimiento y de referencia tienen fines distintos. La ideología organiza las creencias: los liberales suelen apoyar más acción del gobierno en la economía y menos en la conducta personal; los conservadores, menos regulación económica y más énfasis en valores tradicionales y orden; los libertarios, un gobierno limitado en ambas áreas. La ideología moldea los debates de política, incluida la económica: la economía keynesiana pide gasto público para gestionar la demanda, la economía de oferta destaca recortes de impuestos e incentivos, y la política monetaria la dirige la Reserva Federal independiente."
        },
        "items": [
          {
            "id": "apg401",
            "topic": "values",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Political socialization is the process by which people:",
              "es": "La socialización política es el proceso por el cual las personas:"
            },
            "c": {
              "en": [
                "Develop their political beliefs and values",
                "Register to vote",
                "Join a political party officially",
                "Run for office"
              ],
              "es": [
                "Desarrollan sus creencias y valores políticos",
                "Se inscriben para votar",
                "Se afilian oficialmente a un partido",
                "Se postulan a un cargo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Family, school, peers, media, religion and events all shape political views over a lifetime.",
              "es": "La familia, la escuela, los amigos, los medios, la religión y los acontecimientos moldean las opiniones a lo largo de la vida."
            }
          },
          {
            "id": "apg402",
            "topic": "values",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which agent of socialization is usually most influential for young children's party identification?",
              "es": "¿Qué agente de socialización suele influir más en la identificación partidista de los niños?"
            },
            "c": {
              "en": [
                "Family",
                "Social media",
                "Coworkers",
                "Interest groups"
              ],
              "es": [
                "La familia",
                "Las redes sociales",
                "Los compañeros de trabajo",
                "Los grupos de interés"
              ]
            },
            "a": 0,
            "why": {
              "en": "Children often adopt their parents' party identification, though views can change later.",
              "es": "Los niños suelen adoptar la identificación partidista de sus padres, aunque puede cambiar después."
            }
          },
          {
            "id": "apg403",
            "topic": "values",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "People who came of age during the Great Depression tended to support an active federal government for decades. This is an example of a:",
              "es": "Quienes crecieron durante la Gran Depresión apoyaron por décadas un gobierno federal activo. Es un ejemplo de:"
            },
            "c": {
              "en": [
                "Generational effect",
                "Life-cycle effect",
                "Margin of error",
                "Bandwagon effect"
              ],
              "es": [
                "Efecto generacional",
                "Efecto del ciclo de vida",
                "Margen de error",
                "Efecto arrastre"
              ]
            },
            "a": 0,
            "why": {
              "en": "A shared formative event shapes a whole generation's views. Life-cycle effects come from age and life stage (like paying taxes or retiring).",
              "es": "Un acontecimiento compartido moldea a toda una generación. Los efectos del ciclo de vida dependen de la edad y la etapa de vida."
            }
          },
          {
            "id": "apg404",
            "topic": "values",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Individualism, as an American core value, emphasizes:",
              "es": "El individualismo, como valor estadounidense, destaca:"
            },
            "c": {
              "en": [
                "Personal responsibility and self-reliance",
                "Government providing equal outcomes",
                "Loyalty to a monarch",
                "Collective ownership of property"
              ],
              "es": [
                "La responsabilidad personal y la autosuficiencia",
                "Que el gobierno garantice resultados iguales",
                "La lealtad a un monarca",
                "La propiedad colectiva"
              ]
            },
            "a": 0,
            "why": {
              "en": "Individualism supports the idea that people succeed through their own effort, which often favors limited government.",
              "es": "El individualismo sostiene que se triunfa por el propio esfuerzo, lo que suele favorecer un gobierno limitado."
            }
          },
          {
            "id": "apg405",
            "topic": "values",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Equality of opportunity differs from equality of outcome because it:",
              "es": "La igualdad de oportunidades difiere de la igualdad de resultados porque:"
            },
            "c": {
              "en": [
                "Gives everyone a fair chance, not guaranteed equal results",
                "Guarantees everyone the same income",
                "Applies only to voting",
                "Is not an American value"
              ],
              "es": [
                "Da a todos una oportunidad justa, no resultados iguales garantizados",
                "Garantiza a todos el mismo ingreso",
                "Solo aplica al voto",
                "No es un valor estadounidense"
              ]
            },
            "a": 0,
            "why": {
              "en": "Most Americans support equal opportunity; disagreement is about how much government should do to level the playing field.",
              "es": "La mayoría apoya la igualdad de oportunidades; el debate es cuánto debe hacer el gobierno para nivelar el terreno."
            }
          },
          {
            "id": "apg410",
            "topic": "polling",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A poll is most likely to be scientifically accurate if it:",
              "es": "Una encuesta es más probable que sea científicamente precisa si:"
            },
            "c": {
              "en": [
                "Uses a random sample that represents the population",
                "Lets anyone vote online as many times as they want",
                "Surveys only people at one event",
                "Uses emotionally charged wording"
              ],
              "es": [
                "Usa una muestra aleatoria que representa a la población",
                "Permite a cualquiera votar en línea cuantas veces quiera",
                "Encuesta solo a personas en un evento",
                "Usa preguntas con carga emocional"
              ]
            },
            "a": 0,
            "why": {
              "en": "Random, representative samples and neutral wording are the keys to valid polls.",
              "es": "Las muestras aleatorias y representativas y las preguntas neutrales son la clave de una encuesta válida."
            }
          },
          {
            "id": "apg411",
            "topic": "polling",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A poll shows Candidate A at 52% with a margin of error of ±3. This means A's true support is likely between:",
              "es": "Una encuesta da al candidato A 52% con un margen de error de ±3. Su apoyo real probablemente está entre:"
            },
            "c": {
              "en": [
                "49% and 55%",
                "50% and 52%",
                "52% and 55%",
                "46% and 58%"
              ],
              "es": [
                "49% y 55%",
                "50% y 52%",
                "52% y 55%",
                "46% y 58%"
              ]
            },
            "a": 0,
            "why": {
              "en": "52 − 3 = 49 and 52 + 3 = 55. If the opponent is at 48%, the race is within the margin of error.",
              "es": "52 − 3 = 49 y 52 + 3 = 55. Si el rival tiene 48%, la carrera está dentro del margen de error."
            }
          },
          {
            "id": "apg412",
            "topic": "polling",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Polls taken of voters as they leave polling places on Election Day are called:",
              "es": "Las encuestas a votantes al salir de las urnas se llaman:"
            },
            "c": {
              "en": [
                "Exit polls",
                "Benchmark polls",
                "Tracking polls",
                "Push polls"
              ],
              "es": [
                "Encuestas a boca de urna",
                "Encuestas de referencia",
                "Encuestas de seguimiento",
                "Encuestas de empuje"
              ]
            },
            "a": 0,
            "why": {
              "en": "Exit polls help predict results and explain who voted for whom. Tracking polls follow opinion over time; benchmark polls measure a starting point.",
              "es": "Las encuestas a boca de urna ayudan a predecir y explicar el voto. Las de seguimiento miden cambios; las de referencia, el punto de partida."
            }
          },
          {
            "id": "apg413",
            "topic": "polling",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Which question wording would most likely bias a poll?",
              "es": "¿Qué redacción probablemente sesgaría una encuesta?"
            },
            "c": {
              "en": [
                "'Do you support wasteful government spending on this program?'",
                "'Do you support or oppose this program?'",
                "'How important is this issue to you?'",
                "'Did you vote in the last election?'"
              ],
              "es": [
                "'¿Apoya el gasto público derrochador en este programa?'",
                "'¿Apoya o se opone a este programa?'",
                "'¿Qué tan importante es este tema para usted?'",
                "'¿Votó en la última elección?'"
              ]
            },
            "a": 0,
            "why": {
              "en": "'Wasteful' is a loaded word that pushes respondents toward 'no.' Neutral wording offers balanced options.",
              "es": "'Derrochador' es una palabra cargada que empuja hacia el 'no'. Las preguntas neutrales ofrecen opciones equilibradas."
            }
          },
          {
            "id": "apg414",
            "topic": "polling",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "A poll's margin of error is ±4 points. Candidate B polls at 45%. What is the HIGHEST level of support within the margin of error?",
              "es": "El margen de error es ±4 puntos. El candidato B tiene 45%. ¿Cuál es el apoyo MÁS ALTO dentro del margen de error?"
            },
            "a": 49,
            "tol": 0,
            "why": {
              "en": "45 + 4 = 49%.",
              "es": "45 + 4 = 49%."
            }
          },
          {
            "id": "apg420",
            "topic": "ideology",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A voter who supports lower taxes, fewer business regulations, and traditional social values is most likely:",
              "es": "Un votante que apoya impuestos más bajos, menos regulación empresarial y valores sociales tradicionales probablemente es:"
            },
            "c": {
              "en": [
                "Conservative",
                "Liberal",
                "Libertarian",
                "Socialist"
              ],
              "es": [
                "Conservador",
                "Liberal",
                "Libertario",
                "Socialista"
              ]
            },
            "a": 0,
            "why": {
              "en": "Conservatives tend to favor limited economic regulation and an emphasis on traditional values and order.",
              "es": "Los conservadores suelen favorecer poca regulación económica y énfasis en valores tradicionales y orden."
            }
          },
          {
            "id": "apg421",
            "topic": "ideology",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A voter who supports government health-care programs, environmental regulation, and expanded civil rights protections is most likely:",
              "es": "Un votante que apoya programas públicos de salud, regulación ambiental y más protecciones de derechos civiles probablemente es:"
            },
            "c": {
              "en": [
                "Liberal",
                "Conservative",
                "Libertarian",
                "Anarchist"
              ],
              "es": [
                "Liberal",
                "Conservador",
                "Libertario",
                "Anarquista"
              ]
            },
            "a": 0,
            "why": {
              "en": "Liberals generally favor a larger government role in the economy and in protecting equality.",
              "es": "Los liberales suelen apoyar un papel mayor del gobierno en la economía y en proteger la igualdad."
            }
          },
          {
            "id": "apg422",
            "topic": "ideology",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Libertarians generally want:",
              "es": "Los libertarios generalmente quieren:"
            },
            "c": {
              "en": [
                "Minimal government involvement in both the economy and personal life",
                "More government regulation of the economy",
                "Government to enforce traditional morals",
                "State ownership of industry"
              ],
              "es": [
                "Mínima intervención del gobierno en la economía y en la vida personal",
                "Más regulación económica",
                "Que el gobierno imponga la moral tradicional",
                "Que el Estado sea dueño de la industria"
              ]
            },
            "a": 0,
            "why": {
              "en": "Libertarians prioritize individual liberty above other values, opposing government intervention in markets and personal choices alike.",
              "es": "Los libertarios priorizan la libertad individual y se oponen a la intervención en los mercados y en las decisiones personales."
            }
          },
          {
            "id": "apg423",
            "topic": "ideology",
            "type": "multi",
            "diff": 3,
            "q": {
              "en": "Select every position that liberals and libertarians generally SHARE.",
              "es": "Selecciona cada postura que liberales y libertarios generalmente COMPARTEN."
            },
            "c": {
              "en": [
                "Opposition to government regulation of personal private behavior",
                "Strong protection of free speech and civil liberties",
                "Support for high taxes to fund social programs",
                "Support for heavy business regulation"
              ],
              "es": [
                "Oposición a regular la conducta personal privada",
                "Fuerte protección de la expresión y las libertades civiles",
                "Apoyo a impuestos altos para programas sociales",
                "Apoyo a fuerte regulación empresarial"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "They overlap on personal freedom and civil liberties; they split on taxes and economic regulation.",
              "es": "Coinciden en libertad personal y libertades civiles; difieren en impuestos y regulación económica."
            }
          },
          {
            "id": "apg430",
            "topic": "econpol",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Keynesian economics argues that during a recession the government should:",
              "es": "La economía keynesiana sostiene que en una recesión el gobierno debe:"
            },
            "c": {
              "en": [
                "Increase spending to boost aggregate demand",
                "Cut spending to balance the budget",
                "Raise interest rates",
                "Do nothing"
              ],
              "es": [
                "Aumentar el gasto para impulsar la demanda agregada",
                "Recortar el gasto para equilibrar el presupuesto",
                "Subir las tasas de interés",
                "No hacer nada"
              ]
            },
            "a": 0,
            "why": {
              "en": "Keynesians, often liberals, see government spending as a tool to restore demand and jobs.",
              "es": "Los keynesianos, a menudo liberales, ven el gasto público como herramienta para recuperar demanda y empleo."
            }
          },
          {
            "id": "apg431",
            "topic": "econpol",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Supply-side economics, often favored by conservatives, emphasizes:",
              "es": "La economía de oferta, preferida a menudo por conservadores, destaca:"
            },
            "c": {
              "en": [
                "Lower taxes and less regulation to encourage investment and growth",
                "More government spending on social programs",
                "Nationalizing industries",
                "Raising tariffs only"
              ],
              "es": [
                "Menos impuestos y menos regulación para impulsar inversión y crecimiento",
                "Más gasto en programas sociales",
                "Nacionalizar industrias",
                "Solo subir aranceles"
              ]
            },
            "a": 0,
            "why": {
              "en": "Supply-siders argue that incentives to work, save and invest drive long-run growth.",
              "es": "Los partidarios de la oferta sostienen que los incentivos a trabajar, ahorrar e invertir impulsan el crecimiento."
            }
          },
          {
            "id": "apg432",
            "topic": "econpol",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Monetary policy in the U.S. is set by:",
              "es": "La política monetaria en EE. UU. la fija:"
            },
            "c": {
              "en": [
                "The Federal Reserve, which is designed to be independent of elections",
                "Congress through the budget",
                "The president by executive order",
                "The Supreme Court"
              ],
              "es": [
                "La Reserva Federal, diseñada para ser independiente de las elecciones",
                "El Congreso con el presupuesto",
                "El presidente por orden ejecutiva",
                "La Corte Suprema"
              ]
            },
            "a": 0,
            "why": {
              "en": "The Fed's independence (long terms for governors) aims to keep interest-rate decisions insulated from short-term political pressure.",
              "es": "La independencia de la Fed (mandatos largos) busca aislar las decisiones de tasas de la presión política."
            }
          },
          {
            "id": "apg433",
            "topic": "econpol",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Fiscal policy differs from monetary policy because fiscal policy:",
              "es": "La política fiscal se diferencia de la monetaria porque la fiscal:"
            },
            "c": {
              "en": [
                "Involves taxing and spending decided by Congress and the president",
                "Is set by the Federal Reserve",
                "Only changes interest rates",
                "Is decided by the courts"
              ],
              "es": [
                "Implica impuestos y gasto decididos por el Congreso y el presidente",
                "La fija la Reserva Federal",
                "Solo cambia las tasas de interés",
                "La deciden los tribunales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Elected officials control the budget; the Fed controls money and interest rates.",
              "es": "Los funcionarios electos controlan el presupuesto; la Fed controla el dinero y las tasas."
            }
          },
          {
            "id": "apg434",
            "topic": "ideology",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Ideology influences the debate over the Affordable Care Act mainly because:",
              "es": "La ideología influye en el debate sobre la Ley de Cuidado de Salud Asequible principalmente porque:"
            },
            "c": {
              "en": [
                "Liberals and conservatives disagree about government's proper role in health care",
                "Everyone agrees on health care",
                "Health care is a state power only",
                "The Constitution bans health insurance"
              ],
              "es": [
                "Liberales y conservadores discrepan sobre el papel del gobierno en la salud",
                "Todos están de acuerdo en la salud",
                "La salud es solo competencia estatal",
                "La Constitución prohíbe los seguros de salud"
              ]
            },
            "a": 0,
            "why": {
              "en": "Liberals tend to see expanded coverage as a government responsibility; conservatives tend to prefer market solutions and fewer mandates.",
              "es": "Los liberales suelen ver la cobertura como responsabilidad pública; los conservadores, soluciones de mercado y menos mandatos."
            }
          },
          {
            "id": "apg435",
            "topic": "values",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A 25-year-old becomes more fiscally conservative after starting to pay property taxes on a new home. This illustrates a:",
              "es": "Una persona de 25 años se vuelve más conservadora fiscalmente al pagar impuestos sobre su casa nueva. Esto ilustra un:"
            },
            "c": {
              "en": [
                "Life-cycle effect",
                "Generational effect",
                "Sampling error",
                "Bandwagon effect"
              ],
              "es": [
                "Efecto del ciclo de vida",
                "Efecto generacional",
                "Error de muestreo",
                "Efecto arrastre"
              ]
            },
            "a": 0,
            "why": {
              "en": "Life-stage changes (owning a home, raising kids, retiring) can shift political attitudes.",
              "es": "Los cambios de etapa de vida (casa propia, hijos, jubilación) pueden cambiar las actitudes políticas."
            }
          },
          {
            "id": "apg436",
            "topic": "polling",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A 'push poll' is:",
              "es": "Una 'encuesta de empuje' es:"
            },
            "c": {
              "en": [
                "A campaign tactic disguised as a poll to spread negative information",
                "A scientific random-sample poll",
                "A poll taken after voting",
                "A poll of Congress"
              ],
              "es": [
                "Una táctica de campaña disfrazada de encuesta para difundir información negativa",
                "Una encuesta científica con muestra aleatoria",
                "Una encuesta después de votar",
                "Una encuesta al Congreso"
              ]
            },
            "a": 0,
            "why": {
              "en": "Push polls aim to influence opinion, not measure it, so they aren't legitimate research.",
              "es": "Las encuestas de empuje buscan influir, no medir, así que no son investigación legítima."
            }
          },
          {
            "id": "apg437",
            "topic": "econpol",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A conservative and a liberal both want to reduce poverty. They are most likely to disagree about:",
              "es": "Un conservador y un liberal quieren reducir la pobreza. Lo más probable es que discrepen sobre:"
            },
            "c": {
              "en": [
                "Whether government programs or market growth should be the main tool",
                "Whether poverty exists",
                "Whether the Constitution exists",
                "Whether elections should be held"
              ],
              "es": [
                "Si la herramienta principal deben ser programas públicos o el crecimiento del mercado",
                "Si existe la pobreza",
                "Si existe la Constitución",
                "Si debe haber elecciones"
              ]
            },
            "a": 0,
            "why": {
              "en": "Shared goals, different means: ideology shapes how people think problems should be solved.",
              "es": "Mismas metas, distintos medios: la ideología define cómo creen que se resuelven los problemas."
            }
          },
          {
            "id": "apg438",
            "topic": "values",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Rule of law means that:",
              "es": "El Estado de derecho significa que:"
            },
            "c": {
              "en": [
                "Everyone, including government officials, must follow the law",
                "Laws apply only to citizens",
                "The president writes the laws",
                "Judges are above the law"
              ],
              "es": [
                "Todos, incluidos los funcionarios, deben cumplir la ley",
                "Las leyes solo aplican a los ciudadanos",
                "El presidente escribe las leyes",
                "Los jueces están por encima de la ley"
              ]
            },
            "a": 0,
            "why": {
              "en": "No one is above the law: a core American value rooted in the Magna Carta and the Constitution.",
              "es": "Nadie está por encima de la ley: un valor central con raíces en la Carta Magna y la Constitución."
            }
          },
          {
            "id": "apg439",
            "topic": "polling",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Why can a poll of 1,000 randomly chosen adults accurately reflect the views of 250 million?",
              "es": "¿Por qué una encuesta a 1,000 adultos elegidos al azar puede reflejar las opiniones de 250 millones?"
            },
            "c": {
              "en": [
                "Random selection gives every person an equal chance, so the sample mirrors the population",
                "1,000 people always agree",
                "Pollsters adjust answers to match the census",
                "Only voters are counted"
              ],
              "es": [
                "La selección aleatoria da a cada persona la misma probabilidad y la muestra refleja a la población",
                "1,000 personas siempre están de acuerdo",
                "Los encuestadores ajustan las respuestas al censo",
                "Solo cuentan los votantes"
              ]
            },
            "a": 0,
            "why": {
              "en": "Sample size affects the margin of error, but randomness is what makes the sample representative.",
              "es": "El tamaño de la muestra afecta el margen de error, pero la aleatoriedad es lo que la hace representativa."
            }
          },
          {
            "id": "apg440",
            "topic": "ideology",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "On a political spectrum, a moderate is someone who:",
              "es": "En el espectro político, un moderado es alguien que:"
            },
            "c": {
              "en": [
                "Holds a mix of liberal and conservative views",
                "Opposes all government",
                "Supports only one party",
                "Never votes"
              ],
              "es": [
                "Tiene una mezcla de opiniones liberales y conservadoras",
                "Se opone a todo gobierno",
                "Solo apoya a un partido",
                "Nunca vota"
              ]
            },
            "a": 0,
            "why": {
              "en": "Many Americans describe themselves as moderate, picking positions issue by issue.",
              "es": "Muchos estadounidenses se describen como moderados y eligen postura tema por tema."
            }
          }
        ],
        "topics": [
          {
            "id": "values",
            "en": "Core Values & Socialization",
            "es": "Valores y socialización"
          },
          {
            "id": "polling",
            "en": "Measuring Public Opinion",
            "es": "Medir la opinión pública"
          },
          {
            "id": "ideology",
            "en": "Political Ideology",
            "es": "Ideología política"
          },
          {
            "id": "econpol",
            "en": "Ideology & Policy",
            "es": "Ideología y políticas"
          }
        ],
        "vocab": [
          {
            "t": "values",
            "w": {
              "en": "Political socialization",
              "es": "Socialización política"
            },
            "d": {
              "en": "How people develop political beliefs: family, school, peers, media, events.",
              "es": "Cómo se forman las creencias políticas: familia, escuela, amigos, medios, acontecimientos."
            }
          },
          {
            "t": "values",
            "w": {
              "en": "Generational effect",
              "es": "Efecto generacional"
            },
            "d": {
              "en": "A shared formative event shapes a generation's political views.",
              "es": "Un acontecimiento compartido moldea las opiniones de una generación."
            }
          },
          {
            "t": "values",
            "w": {
              "en": "Life-cycle effect",
              "es": "Efecto del ciclo de vida"
            },
            "d": {
              "en": "Political views change with age and life stage.",
              "es": "Las opiniones políticas cambian con la edad y la etapa de vida."
            }
          },
          {
            "t": "values",
            "w": {
              "en": "Individualism",
              "es": "Individualismo"
            },
            "d": {
              "en": "Belief in personal responsibility and self-reliance.",
              "es": "Creencia en la responsabilidad personal y la autosuficiencia."
            }
          },
          {
            "t": "polling",
            "w": {
              "en": "Random sample",
              "es": "Muestra aleatoria"
            },
            "d": {
              "en": "Every member of the population has an equal chance of being chosen.",
              "es": "Cada persona de la población tiene la misma probabilidad de ser elegida."
            }
          },
          {
            "t": "polling",
            "w": {
              "en": "Margin of error",
              "es": "Margen de error"
            },
            "d": {
              "en": "The range within which a poll's true result likely falls.",
              "es": "El rango en el que probablemente está el resultado real de una encuesta."
            }
          },
          {
            "t": "polling",
            "w": {
              "en": "Exit poll",
              "es": "Encuesta a boca de urna"
            },
            "d": {
              "en": "A survey of voters as they leave the polls on Election Day.",
              "es": "Encuesta a votantes al salir de votar."
            }
          },
          {
            "t": "ideology",
            "w": {
              "en": "Liberal",
              "es": "Liberal"
            },
            "d": {
              "en": "Favors more government action on the economy, less on personal behavior.",
              "es": "Apoya más acción del gobierno en la economía y menos en la conducta personal."
            }
          },
          {
            "t": "ideology",
            "w": {
              "en": "Conservative",
              "es": "Conservador"
            },
            "d": {
              "en": "Favors less economic regulation and emphasis on tradition and order.",
              "es": "Apoya menos regulación económica y énfasis en tradición y orden."
            }
          },
          {
            "t": "ideology",
            "w": {
              "en": "Libertarian",
              "es": "Libertario"
            },
            "d": {
              "en": "Favors minimal government in both economic and personal matters.",
              "es": "Apoya un gobierno mínimo en lo económico y lo personal."
            }
          },
          {
            "t": "econpol",
            "w": {
              "en": "Keynesian economics",
              "es": "Economía keynesiana"
            },
            "d": {
              "en": "Government spending can manage demand and fight recessions.",
              "es": "El gasto público puede gestionar la demanda y combatir recesiones."
            }
          },
          {
            "t": "econpol",
            "w": {
              "en": "Supply-side economics",
              "es": "Economía de oferta"
            },
            "d": {
              "en": "Lower taxes and regulation boost investment and growth.",
              "es": "Menos impuestos y regulación impulsan la inversión y el crecimiento."
            }
          }
        ]
      },
      {
        "id": "apg-u5",
        "title": {
          "en": "AP Gov Unit 5 · Political Participation",
          "es": "Gob AP Unidad 5 · Participación política"
        },
        "brief": {
          "en": "Citizens link to government through voting, political parties, interest groups, elections and the media. Voting rights expanded through the 15th, 17th, 19th, 24th and 26th Amendments, yet turnout varies with age, education, income and the type of election; rational-choice, retrospective, prospective and party-line voting describe how people decide. Parties recruit candidates, mobilize voters and organize government, and they adapt to realignments and new technology. The winner-take-all, single-member district system favors two major parties, while third parties shape debates. Interest groups lobby, file lawsuits, run ads and form PACs; they face the free-rider problem, and iron triangles and issue networks connect them to policymakers. Presidential elections run through primaries and caucuses, conventions and the Electoral College; congressional elections favor incumbents. Campaign finance rules changed after Citizens United v. FEC (2010), which held that independent political spending by corporations and unions is protected speech, opening the way for super PACs. The media act as gatekeeper, scorekeeper and watchdog, and changing media habits raise concerns about bias and polarization.",
          "es": "Los ciudadanos se vinculan con el gobierno mediante el voto, los partidos, los grupos de interés, las elecciones y los medios. El derecho al voto se amplió con las Enmiendas 15, 17, 19, 24 y 26, pero la participación varía con la edad, la educación, el ingreso y el tipo de elección; el voto racional, retrospectivo, prospectivo y por partido describen cómo decide la gente. Los partidos reclutan candidatos, movilizan votantes y organizan el gobierno, y se adaptan a realineamientos y nuevas tecnologías. El sistema de distritos uninominales donde el ganador se lleva todo favorece a dos partidos, mientras los terceros partidos influyen en los debates. Los grupos de interés hacen cabildeo, presentan demandas, pagan anuncios y forman PAC; enfrentan el problema del polizón, y los triángulos de hierro y las redes temáticas los conectan con los legisladores. Las elecciones presidenciales pasan por primarias y caucus, convenciones y el Colegio Electoral; las del Congreso favorecen a quienes ya ocupan el cargo. Las reglas de financiamiento cambiaron tras Citizens United v. FEC (2010), que protegió como expresión el gasto político independiente de corporaciones y sindicatos y abrió paso a los súper PAC. Los medios actúan como filtro, marcador y perro guardián, y los nuevos hábitos de consumo generan preocupación por el sesgo y la polarización."
        },
        "items": [
          {
            "id": "apg501",
            "topic": "voting",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which amendment lowered the voting age to 18?",
              "es": "¿Qué enmienda bajó la edad de voto a 18 años?"
            },
            "c": {
              "en": [
                "Twenty-Sixth",
                "Nineteenth",
                "Fifteenth",
                "Twenty-Fourth"
              ],
              "es": [
                "Vigesimosexta",
                "Decimonovena",
                "Decimoquinta",
                "Vigesimocuarta"
              ]
            },
            "a": 0,
            "why": {
              "en": "26th (1971). The 19th gave women the vote, the 15th barred race discrimination, the 24th banned poll taxes in federal elections.",
              "es": "26.ª (1971). La 19.ª dio el voto a la mujer, la 15.ª prohibió la discriminación racial y la 24.ª prohibió el impuesto al voto en elecciones federales."
            }
          },
          {
            "id": "apg502",
            "topic": "voting",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which group typically has the HIGHEST voter turnout?",
              "es": "¿Qué grupo suele tener la MAYOR participación electoral?"
            },
            "c": {
              "en": [
                "Older, more educated, higher-income citizens",
                "Voters aged 18–24",
                "Lower-income citizens",
                "First-time voters"
              ],
              "es": [
                "Ciudadanos mayores, con más educación e ingresos",
                "Votantes de 18 a 24 años",
                "Ciudadanos de bajos ingresos",
                "Votantes primerizos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Age, education and income are strong predictors of turnout.",
              "es": "La edad, la educación y el ingreso predicen fuertemente la participación."
            }
          },
          {
            "id": "apg503",
            "topic": "voting",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A voter who decides based on whether the incumbent's past performance was good is engaging in:",
              "es": "Un votante que decide según si el desempeño pasado del titular fue bueno practica el:"
            },
            "c": {
              "en": [
                "Retrospective voting",
                "Prospective voting",
                "Party-line voting",
                "Rational-choice voting only about the future"
              ],
              "es": [
                "Voto retrospectivo",
                "Voto prospectivo",
                "Voto por partido",
                "Voto de elección racional solo sobre el futuro"
              ]
            },
            "a": 0,
            "why": {
              "en": "Retrospective = looking back. Prospective = predicting future performance. Party-line = voting for one party's candidates.",
              "es": "Retrospectivo = mirar atrás. Prospectivo = predecir el desempeño. Por partido = votar por los candidatos de un partido."
            }
          },
          {
            "id": "apg504",
            "topic": "voting",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Turnout is usually lowest in:",
              "es": "La participación suele ser más baja en:"
            },
            "c": {
              "en": [
                "Midterm and local elections",
                "Presidential general elections",
                "Elections with close races",
                "Elections with same-day registration"
              ],
              "es": [
                "Las elecciones intermedias y locales",
                "Las elecciones generales presidenciales",
                "Las elecciones reñidas",
                "Las elecciones con registro el mismo día"
              ]
            },
            "a": 0,
            "why": {
              "en": "Less media attention and lower perceived stakes reduce turnout in midterms and local elections.",
              "es": "Menos atención mediática y menor percepción de importancia reducen la participación."
            }
          },
          {
            "id": "apg505",
            "topic": "voting",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Which policy is most likely to INCREASE voter turnout?",
              "es": "¿Qué política es más probable que AUMENTE la participación?"
            },
            "c": {
              "en": [
                "Automatic voter registration",
                "Requiring registration 60 days before the election",
                "Holding elections on a single weekday with no early voting",
                "Reducing the number of polling places"
              ],
              "es": [
                "Registro automático de votantes",
                "Exigir el registro 60 días antes",
                "Votar un solo día laborable sin voto anticipado",
                "Reducir los centros de votación"
              ]
            },
            "a": 0,
            "why": {
              "en": "Lowering the cost of voting (registration, time, travel) tends to raise turnout.",
              "es": "Reducir el costo de votar (registro, tiempo, traslado) tiende a aumentar la participación."
            }
          },
          {
            "id": "apg510",
            "topic": "parties",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is a main function of political parties?",
              "es": "¿Cuál es una función principal de los partidos políticos?"
            },
            "c": {
              "en": [
                "Recruiting candidates and mobilizing voters",
                "Interpreting the Constitution",
                "Writing regulations",
                "Appointing federal judges"
              ],
              "es": [
                "Reclutar candidatos y movilizar votantes",
                "Interpretar la Constitución",
                "Redactar reglamentos",
                "Nombrar jueces federales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Parties also educate voters, create platforms and organize government (majority leaders, committees).",
              "es": "Los partidos también informan, crean plataformas y organizan el gobierno (líderes, comités)."
            }
          },
          {
            "id": "apg511",
            "topic": "parties",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The U.S. has a two-party system mainly because of:",
              "es": "EE. UU. tiene un sistema bipartidista principalmente por:"
            },
            "c": {
              "en": [
                "Winner-take-all, single-member district elections",
                "A constitutional ban on third parties",
                "Proportional representation",
                "The Supreme Court"
              ],
              "es": [
                "Las elecciones de distrito uninominal donde el ganador se lleva todo",
                "Una prohibición constitucional de terceros partidos",
                "La representación proporcional",
                "La Corte Suprema"
              ]
            },
            "a": 0,
            "why": {
              "en": "When only first place wins, voters avoid 'wasting' votes on third parties (Duverger's law).",
              "es": "Cuando solo gana el primer lugar, los votantes evitan 'desperdiciar' su voto en terceros partidos (ley de Duverger)."
            }
          },
          {
            "id": "apg512",
            "topic": "parties",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Third parties in the U.S. most often influence politics by:",
              "es": "Los terceros partidos en EE. UU. suelen influir en la política al:"
            },
            "c": {
              "en": [
                "Raising issues that major parties later adopt",
                "Winning the presidency",
                "Controlling Congress",
                "Appointing judges"
              ],
              "es": [
                "Plantear temas que luego adoptan los partidos grandes",
                "Ganar la presidencia",
                "Controlar el Congreso",
                "Nombrar jueces"
              ]
            },
            "a": 0,
            "why": {
              "en": "Ross Perot's focus on the deficit and the Populists' ideas shaped later major-party platforms.",
              "es": "El enfoque de Ross Perot en el déficit y las ideas populistas influyeron en plataformas posteriores."
            }
          },
          {
            "id": "apg513",
            "topic": "parties",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A critical election that produces a lasting shift in party coalitions is called a:",
              "es": "Una elección crítica que produce un cambio duradero en las coaliciones se llama:"
            },
            "c": {
              "en": [
                "Realignment",
                "Dealignment",
                "Recall",
                "Runoff"
              ],
              "es": [
                "Realineamiento",
                "Desalineamiento",
                "Revocatoria",
                "Segunda vuelta"
              ]
            },
            "a": 0,
            "why": {
              "en": "The 1932 election (New Deal coalition) is the classic example. Dealignment is voters drifting away from parties altogether.",
              "es": "La elección de 1932 (coalición del New Deal) es el ejemplo clásico. El desalineamiento es alejarse de los partidos."
            }
          },
          {
            "id": "apg520",
            "topic": "groups",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Interest groups differ from political parties because interest groups:",
              "es": "Los grupos de interés se diferencian de los partidos porque:"
            },
            "c": {
              "en": [
                "Try to influence policy without running their own candidates",
                "Nominate candidates for office",
                "Organize Congress",
                "Are created by the Constitution"
              ],
              "es": [
                "Buscan influir en las políticas sin presentar candidatos propios",
                "Nominan candidatos",
                "Organizan el Congreso",
                "Los crea la Constitución"
              ]
            },
            "a": 0,
            "why": {
              "en": "Groups focus on specific issues and lobby whoever holds office.",
              "es": "Los grupos se centran en temas concretos y cabildean a quien gobierne."
            }
          },
          {
            "id": "apg521",
            "topic": "groups",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The free-rider problem means that:",
              "es": "El problema del polizón significa que:"
            },
            "c": {
              "en": [
                "People benefit from a group's work without joining or paying",
                "Lobbyists ride for free on airplanes",
                "Candidates get free media coverage",
                "Voters can't register"
              ],
              "es": [
                "La gente se beneficia del trabajo de un grupo sin unirse ni pagar",
                "Los cabilderos viajan gratis",
                "Los candidatos obtienen cobertura gratis",
                "Los votantes no pueden inscribirse"
              ]
            },
            "a": 0,
            "why": {
              "en": "Groups offer selective benefits (magazines, discounts) to persuade people to join.",
              "es": "Los grupos ofrecen beneficios selectivos (revistas, descuentos) para que la gente se una."
            }
          },
          {
            "id": "apg522",
            "topic": "groups",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select every tactic interest groups use to influence policy.",
              "es": "Selecciona cada táctica que usan los grupos de interés para influir."
            },
            "c": {
              "en": [
                "Lobbying members of Congress",
                "Filing amicus curiae briefs in court cases",
                "Grassroots campaigns to mobilize members",
                "Vetoing legislation"
              ],
              "es": [
                "Cabildear a legisladores",
                "Presentar escritos amicus curiae",
                "Campañas de base para movilizar miembros",
                "Vetar leyes"
              ]
            },
            "a": [
              0,
              1,
              2
            ],
            "why": {
              "en": "Groups lobby, litigate, file friend-of-the-court briefs, mobilize members and donate through PACs. Only the president vetoes.",
              "es": "Los grupos cabildean, litigan, presentan escritos, movilizan y donan vía PAC. Solo el presidente veta."
            }
          },
          {
            "id": "apg523",
            "topic": "groups",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "An issue network differs from an iron triangle because an issue network:",
              "es": "Una red temática se diferencia de un triángulo de hierro porque:"
            },
            "c": {
              "en": [
                "Is a broader, more open web of experts, groups, staff and media around an issue",
                "Has exactly three members",
                "Is created by law",
                "Excludes interest groups"
              ],
              "es": [
                "Es una red más amplia y abierta de expertos, grupos, asesores y medios en torno a un tema",
                "Tiene exactamente tres miembros",
                "La crea la ley",
                "Excluye a los grupos de interés"
              ]
            },
            "a": 0,
            "why": {
              "en": "Iron triangles are tight and stable; issue networks are fluid and include many competing participants.",
              "es": "Los triángulos de hierro son cerrados y estables; las redes temáticas son fluidas y con muchos participantes."
            }
          },
          {
            "id": "apg530",
            "topic": "elections",
            "type": "numeric",
            "diff": 1,
            "q": {
              "en": "How many electoral votes does a candidate need to win the presidency?",
              "es": "¿Cuántos votos electorales necesita un candidato para ganar la presidencia?"
            },
            "a": 270,
            "tol": 0,
            "why": {
              "en": "There are 538 electors; a majority is 270.",
              "es": "Hay 538 electores; la mayoría es 270."
            }
          },
          {
            "id": "apg531",
            "topic": "elections",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Citizens United v. FEC (2010) held that:",
              "es": "Citizens United v. FEC (2010) decidió que:"
            },
            "c": {
              "en": [
                "Independent political spending by corporations and unions is protected speech",
                "Corporations may give unlimited money directly to candidates",
                "All campaign spending limits are unconstitutional",
                "PACs are illegal"
              ],
              "es": [
                "El gasto político independiente de corporaciones y sindicatos es expresión protegida",
                "Las corporaciones pueden donar sin límite directamente a candidatos",
                "Todos los límites de gasto son inconstitucionales",
                "Los PAC son ilegales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Limits on independent expenditures violate the First Amendment. Direct contributions to candidates are still limited; the ruling paved the way for super PACs.",
              "es": "Limitar los gastos independientes viola la Primera Enmienda. Las donaciones directas siguen limitadas; el fallo abrió paso a los súper PAC."
            }
          },
          {
            "id": "apg532",
            "topic": "elections",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A super PAC can:",
              "es": "Un súper PAC puede:"
            },
            "c": {
              "en": [
                "Raise and spend unlimited amounts, but cannot coordinate with campaigns",
                "Give unlimited money directly to candidates",
                "Run for office",
                "Appoint judges"
              ],
              "es": [
                "Recaudar y gastar sin límite, pero no coordinarse con las campañas",
                "Dar dinero ilimitado directamente a candidatos",
                "Postularse",
                "Nombrar jueces"
              ]
            },
            "a": 0,
            "why": {
              "en": "Super PACs make independent expenditures only; coordination with a candidate is prohibited.",
              "es": "Los súper PAC solo hacen gastos independientes; la coordinación con candidatos está prohibida."
            }
          },
          {
            "id": "apg533",
            "topic": "elections",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The incumbency advantage in congressional elections comes partly from:",
              "es": "La ventaja del titular en las elecciones al Congreso viene en parte de:"
            },
            "c": {
              "en": [
                "Name recognition, fundraising ability and constituent service",
                "A rule that incumbents can't be challenged",
                "Term limits",
                "The Electoral College"
              ],
              "es": [
                "Reconocimiento de nombre, capacidad de recaudar y servicio a electores",
                "Una regla que impide desafiar a los titulares",
                "Los límites de mandato",
                "El Colegio Electoral"
              ]
            },
            "a": 0,
            "why": {
              "en": "House incumbents usually win reelection over 90% of the time, helped by visibility, money, casework and favorable districts.",
              "es": "Los titulares de la Cámara ganan más del 90% de las veces, gracias a visibilidad, dinero, gestiones y distritos favorables."
            }
          },
          {
            "id": "apg534",
            "topic": "elections",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "In a caucus, party members:",
              "es": "En un caucus, los miembros del partido:"
            },
            "c": {
              "en": [
                "Meet in person to discuss and choose delegates for candidates",
                "Vote privately by secret ballot all day",
                "Are chosen by the Supreme Court",
                "Cast electoral votes"
              ],
              "es": [
                "Se reúnen en persona para debatir y elegir delegados para los candidatos",
                "Votan en secreto todo el día",
                "Son elegidos por la Corte Suprema",
                "Emiten votos electorales"
              ]
            },
            "a": 0,
            "why": {
              "en": "Caucuses are meetings; primaries are elections with ballots. Both help choose each party's nominee.",
              "es": "Los caucus son reuniones; las primarias son elecciones con boletas. Ambos ayudan a elegir al candidato."
            }
          },
          {
            "id": "apg535",
            "topic": "elections",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Critics of the Electoral College point out that:",
              "es": "Los críticos del Colegio Electoral señalan que:"
            },
            "c": {
              "en": [
                "A candidate can win the presidency while losing the national popular vote",
                "It gives every voter equal weight",
                "It was abolished in 2000",
                "It lets Congress choose the president every time"
              ],
              "es": [
                "Un candidato puede ganar la presidencia perdiendo el voto popular nacional",
                "Da a cada votante el mismo peso",
                "Se abolió en 2000",
                "Permite al Congreso elegir siempre al presidente"
              ]
            },
            "a": 0,
            "why": {
              "en": "It happened in 2000 and 2016. Supporters say it protects federalism and smaller states.",
              "es": "Ocurrió en 2000 y 2016. Sus defensores dicen que protege el federalismo y a los estados pequeños."
            }
          },
          {
            "id": "apg536",
            "topic": "elections",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The Bipartisan Campaign Reform Act of 2002 (McCain-Feingold) mainly:",
              "es": "La Ley de Reforma Bipartidista de Campañas de 2002 (McCain-Feingold) principalmente:"
            },
            "c": {
              "en": [
                "Banned soft money to national parties and required the 'stand by your ad' disclaimer",
                "Created super PACs",
                "Abolished the FEC",
                "Lowered the voting age"
              ],
              "es": [
                "Prohibió el dinero blando a los partidos nacionales y exigió el aviso 'apruebo este mensaje'",
                "Creó los súper PAC",
                "Abolió la FEC",
                "Bajó la edad de voto"
              ]
            },
            "a": 0,
            "why": {
              "en": "Parts of BCRA's limits on independent spending were struck down in Citizens United.",
              "es": "Partes de los límites de BCRA al gasto independiente fueron anuladas en Citizens United."
            }
          },
          {
            "id": "apg540",
            "topic": "media",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "When the media decide which stories get covered and which are ignored, they act as a:",
              "es": "Cuando los medios deciden qué noticias cubrir y cuáles ignorar, actúan como:"
            },
            "c": {
              "en": [
                "Gatekeeper",
                "Scorekeeper",
                "Watchdog",
                "Lobbyist"
              ],
              "es": [
                "Filtro (guardián de la puerta)",
                "Marcador",
                "Perro guardián",
                "Cabildero"
              ]
            },
            "a": 0,
            "why": {
              "en": "Gatekeeper = sets the agenda. Scorekeeper = tracks who's winning (horse-race coverage). Watchdog = investigates wrongdoing.",
              "es": "Filtro = fija la agenda. Marcador = sigue quién va ganando. Perro guardián = investiga abusos."
            }
          },
          {
            "id": "apg541",
            "topic": "media",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Horse-race journalism focuses on:",
              "es": "El periodismo de 'carrera de caballos' se centra en:"
            },
            "c": {
              "en": [
                "Who is ahead in polls rather than policy issues",
                "Investigating corruption",
                "Explaining court rulings",
                "Sports results"
              ],
              "es": [
                "Quién va adelante en las encuestas más que en las propuestas",
                "Investigar la corrupción",
                "Explicar fallos judiciales",
                "Resultados deportivos"
              ]
            },
            "a": 0,
            "why": {
              "en": "Critics say horse-race coverage leaves voters less informed about candidates' positions.",
              "es": "Los críticos dicen que esta cobertura deja a los votantes menos informados sobre las propuestas."
            }
          },
          {
            "id": "apg542",
            "topic": "media",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A concern about getting news mainly from social media algorithms is that it can:",
              "es": "Una preocupación por informarse sobre todo con algoritmos de redes sociales es que puede:"
            },
            "c": {
              "en": [
                "Create echo chambers that reinforce existing views and increase polarization",
                "Make all news perfectly balanced",
                "End the First Amendment",
                "Lower internet use"
              ],
              "es": [
                "Crear cámaras de eco que refuerzan opiniones y aumentan la polarización",
                "Hacer que todas las noticias sean equilibradas",
                "Acabar con la Primera Enmienda",
                "Reducir el uso de internet"
              ]
            },
            "a": 0,
            "why": {
              "en": "Algorithms show users more of what they already engage with, which can narrow exposure to other viewpoints.",
              "es": "Los algoritmos muestran más de lo que el usuario ya consume, lo que limita otras perspectivas."
            }
          },
          {
            "id": "apg543",
            "topic": "media",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Investigative reporting that exposed the Watergate scandal is an example of the media acting as a:",
              "es": "El periodismo de investigación que reveló Watergate es un ejemplo de los medios actuando como:"
            },
            "c": {
              "en": [
                "Watchdog",
                "Gatekeeper",
                "Scorekeeper",
                "Political party"
              ],
              "es": [
                "Perro guardián",
                "Filtro",
                "Marcador",
                "Partido político"
              ]
            },
            "a": 0,
            "why": {
              "en": "Reporting by the Washington Post contributed to President Nixon's resignation in 1974.",
              "es": "Los reportajes del Washington Post contribuyeron a la renuncia del presidente Nixon en 1974."
            }
          },
          {
            "id": "apg544",
            "topic": "voting",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which amendment banned poll taxes in federal elections?",
              "es": "¿Qué enmienda prohibió el impuesto al voto en elecciones federales?"
            },
            "c": {
              "en": [
                "Twenty-Fourth",
                "Twenty-Sixth",
                "Seventeenth",
                "Fifteenth"
              ],
              "es": [
                "Vigesimocuarta",
                "Vigesimosexta",
                "Decimoséptima",
                "Decimoquinta"
              ]
            },
            "a": 0,
            "why": {
              "en": "The 24th Amendment (1964) ended poll taxes in federal elections; Harper v. Virginia (1966) extended the ban to state elections.",
              "es": "La Enmienda 24 (1964) eliminó el impuesto al voto en elecciones federales; Harper v. Virginia (1966) lo extendió a las estatales."
            }
          },
          {
            "id": "apg545",
            "topic": "parties",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Divided government means:",
              "es": "Gobierno dividido significa:"
            },
            "c": {
              "en": [
                "One party controls the presidency and the other controls at least one chamber of Congress",
                "The Supreme Court is split 5–4",
                "States split their electoral votes",
                "Congress has two chambers"
              ],
              "es": [
                "Un partido tiene la presidencia y otro controla al menos una cámara del Congreso",
                "La Corte Suprema está dividida 5–4",
                "Los estados dividen sus votos electorales",
                "El Congreso tiene dos cámaras"
              ]
            },
            "a": 0,
            "why": {
              "en": "Divided government can produce gridlock but also forces compromise.",
              "es": "El gobierno dividido puede causar parálisis, pero también obliga a pactar."
            }
          }
        ],
        "topics": [
          {
            "id": "voting",
            "en": "Voting & Turnout",
            "es": "Voto y participación"
          },
          {
            "id": "parties",
            "en": "Political Parties",
            "es": "Partidos políticos"
          },
          {
            "id": "groups",
            "en": "Interest Groups",
            "es": "Grupos de interés"
          },
          {
            "id": "elections",
            "en": "Elections & Money",
            "es": "Elecciones y dinero"
          },
          {
            "id": "media",
            "en": "The Media",
            "es": "Los medios"
          }
        ],
        "vocab": [
          {
            "t": "voting",
            "w": {
              "en": "Voter turnout",
              "es": "Participación electoral"
            },
            "d": {
              "en": "The share of eligible voters who actually vote.",
              "es": "El porcentaje de votantes habilitados que de verdad vota."
            }
          },
          {
            "t": "voting",
            "w": {
              "en": "Retrospective voting",
              "es": "Voto retrospectivo"
            },
            "d": {
              "en": "Voting based on how well the incumbent performed.",
              "es": "Votar según el desempeño del titular."
            }
          },
          {
            "t": "voting",
            "w": {
              "en": "Prospective voting",
              "es": "Voto prospectivo"
            },
            "d": {
              "en": "Voting based on predictions of how a candidate will perform.",
              "es": "Votar según lo que se espera que haga el candidato."
            }
          },
          {
            "t": "parties",
            "w": {
              "en": "Linkage institution",
              "es": "Institución de enlace"
            },
            "d": {
              "en": "A channel connecting people to government: parties, groups, elections, media.",
              "es": "Canal que conecta al pueblo con el gobierno: partidos, grupos, elecciones, medios."
            }
          },
          {
            "t": "parties",
            "w": {
              "en": "Realignment",
              "es": "Realineamiento"
            },
            "d": {
              "en": "A lasting shift in which groups support which party.",
              "es": "Un cambio duradero en qué grupos apoyan a qué partido."
            }
          },
          {
            "t": "parties",
            "w": {
              "en": "Winner-take-all system",
              "es": "Sistema de ganador se lleva todo"
            },
            "d": {
              "en": "Only the top vote-getter wins, which favors two parties.",
              "es": "Solo gana el más votado, lo que favorece a dos partidos."
            }
          },
          {
            "t": "groups",
            "w": {
              "en": "Interest group",
              "es": "Grupo de interés"
            },
            "d": {
              "en": "An organization that tries to influence policy without running candidates.",
              "es": "Organización que busca influir en las políticas sin presentar candidatos."
            }
          },
          {
            "t": "groups",
            "w": {
              "en": "Free-rider problem",
              "es": "Problema del polizón"
            },
            "d": {
              "en": "People benefit from a group's work without contributing.",
              "es": "La gente se beneficia del trabajo de un grupo sin contribuir."
            }
          },
          {
            "t": "elections",
            "w": {
              "en": "Citizens United v. FEC",
              "es": "Citizens United v. FEC"
            },
            "d": {
              "en": "2010 ruling: independent spending by corporations and unions is protected speech.",
              "es": "Fallo de 2010: el gasto independiente de corporaciones y sindicatos es expresión protegida."
            }
          },
          {
            "t": "elections",
            "w": {
              "en": "Super PAC",
              "es": "Súper PAC"
            },
            "d": {
              "en": "Group that can raise and spend unlimited money independently of campaigns.",
              "es": "Grupo que puede recaudar y gastar sin límite, independiente de las campañas."
            }
          },
          {
            "t": "elections",
            "w": {
              "en": "Incumbency advantage",
              "es": "Ventaja del titular"
            },
            "d": {
              "en": "Officeholders' edge in reelection from name recognition, money and service.",
              "es": "Ventaja de quien ocupa el cargo por reconocimiento, dinero y servicio."
            }
          },
          {
            "t": "media",
            "w": {
              "en": "Gatekeeper",
              "es": "Filtro"
            },
            "d": {
              "en": "The media's role in deciding which issues get public attention.",
              "es": "El papel de los medios al decidir qué temas reciben atención."
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
            },
            "topic": "systems"
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
            },
            "topic": "systems"
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
            },
            "topic": "systems"
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
            },
            "topic": "markets"
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
            },
            "topic": "systems"
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
            },
            "topic": "markets"
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
            },
            "topic": "roles"
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
            },
            "topic": "roles"
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
            },
            "topic": "roles"
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
            },
            "topic": "roles"
          },
          {
            "id": "eh111",
            "topic": "systems",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "In a command economy, who decides what goods to produce?",
              "es": "En una economía centralizada, ¿quién decide qué bienes producir?"
            },
            "c": {
              "en": [
                "The central government",
                "Individual consumers",
                "Private businesses",
                "Market prices"
              ],
              "es": [
                "El gobierno central",
                "Los consumidores individuales",
                "Las empresas privadas",
                "Los precios del mercado"
              ]
            },
            "a": 0,
            "why": {
              "en": "In a command economy, the government controls production, pricing, and distribution.",
              "es": "En una economía centralizada, el gobierno controla producción, precios y distribución."
            }
          },
          {
            "id": "eh112",
            "topic": "markets",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "When supply stays the same but demand increases, the equilibrium price:",
              "es": "Cuando la oferta permanece igual pero la demanda aumenta, el precio de equilibrio:"
            },
            "c": {
              "en": [
                "Rises",
                "Falls",
                "Stays the same",
                "Becomes unpredictable"
              ],
              "es": [
                "Sube",
                "Baja",
                "Se mantiene igual",
                "Se vuelve impredecible"
              ]
            },
            "a": 0,
            "why": {
              "en": "More buyers competing for the same supply bids the price up.",
              "es": "Más compradores compitiendo por la misma oferta elevan el precio."
            }
          },
          {
            "id": "eh113",
            "topic": "markets",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A government sets a price ceiling below the equilibrium price. This causes:",
              "es": "El gobierno fija un precio máximo por debajo del precio de equilibrio. Esto causa:"
            },
            "c": {
              "en": [
                "A shortage — quantity demanded exceeds quantity supplied",
                "A surplus",
                "No effect",
                "Higher production"
              ],
              "es": [
                "Escasez — la cantidad demandada supera la ofrecida",
                "Un excedente",
                "Sin efecto",
                "Mayor producción"
              ]
            },
            "a": 0,
            "why": {
              "en": "At below-market prices, consumers want more and producers supply less — creating a shortage.",
              "es": "A precios por debajo del mercado, los consumidores quieren más y los productores ofrecen menos."
            }
          },
          {
            "id": "eh114",
            "topic": "markets",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A price floor set ABOVE the equilibrium price creates:",
              "es": "Un precio mínimo fijado POR ENCIMA del precio de equilibrio crea:"
            },
            "c": {
              "en": [
                "A surplus — quantity supplied exceeds quantity demanded",
                "A shortage",
                "Equilibrium",
                "Higher demand"
              ],
              "es": [
                "Un excedente — la cantidad ofrecida supera la demandada",
                "Escasez",
                "Equilibrio",
                "Mayor demanda"
              ]
            },
            "a": 0,
            "why": {
              "en": "At above-market prices, producers make more than buyers want — creating a surplus. The minimum wage is a common example.",
              "es": "A precios por encima del mercado, los productores hacen más de lo que los compradores quieren."
            }
          },
          {
            "id": "eh115",
            "topic": "roles",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "When a factory pollutes a river, economists call this a:",
              "es": "Cuando una fábrica contamina un río, los economistas llaman a esto:"
            },
            "c": {
              "en": [
                "Negative externality",
                "Public good",
                "Opportunity cost",
                "Comparative advantage"
              ],
              "es": [
                "Externalidad negativa",
                "Bien público",
                "Costo de oportunidad",
                "Ventaja comparativa"
              ]
            },
            "a": 0,
            "why": {
              "en": "A negative externality is a cost imposed on third parties who are not part of the transaction.",
              "es": "Una externalidad negativa es un costo impuesto a terceros que no participan en la transacción."
            }
          },
          {
            "id": "eh116",
            "topic": "roles",
            "type": "short",
            "diff": 2,
            "q": {
              "en": "Why can't the free market efficiently provide national defense? Explain using the concept of public goods.",
              "es": "¿Por qué el mercado libre no puede proveer eficientemente la defensa nacional? Explica usando el concepto de bienes públicos."
            },
            "keys": [
              "non-excludable",
              "non-rival",
              "free rider",
              "everyone benefits",
              "cannot exclude",
              "no excluir",
              "beneficio para todos",
              "polizón"
            ],
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "excl",
                  "label": "non-excludable — you can't prevent people from benefiting",
                  "any": [
                    "non-excludable",
                    "cannot exclude",
                    "can't exclude",
                    "everyone benefits",
                    "no one can be kept out",
                    "available to all",
                    "no excluir",
                    "beneficio para todos",
                    "no se puede excluir"
                  ]
                },
                {
                  "id": "fr",
                  "label": "free rider problem — people won't pay voluntarily",
                  "any": [
                    "free rider",
                    "free ride",
                    "won't pay",
                    "no incentive to pay",
                    "would not voluntarily pay",
                    "polizón",
                    "no pagarían",
                    "sin incentivo para pagar"
                  ]
                }
              ],
              "onPass": "Right — national defense is non-excludable, so people free-ride, and no private firm could charge for it."
            },
            "why": {
              "en": "National defense is non-excludable — everyone benefits regardless of payment, creating a free rider problem.",
              "es": "La defensa nacional no es excluible — todos se benefician sin importar si pagan, creando el problema del polizón."
            }
          },
          {
            "id": "eh117",
            "topic": "systems",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The United States has a mixed economy, which means:",
              "es": "Estados Unidos tiene una economía mixta, lo que significa:"
            },
            "c": {
              "en": [
                "Both markets and government play a role in economic decisions",
                "Only businesses make decisions",
                "The government controls all prices",
                "There is no private property"
              ],
              "es": [
                "Tanto los mercados como el gobierno juegan un rol en las decisiones económicas",
                "Solo las empresas deciden",
                "El gobierno controla todos los precios",
                "No hay propiedad privada"
              ]
            },
            "a": 0,
            "why": {
              "en": "A mixed economy combines free market principles with government regulation and services.",
              "es": "Una economía mixta combina principios de libre mercado con regulación y servicios gubernamentales."
            }
          },
          {
            "id": "eh118",
            "topic": "markets",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Demand = 100 - 2P. Supply = 20 + 3P. Find the equilibrium price.",
              "es": "Demanda = 100 - 2P. Oferta = 20 + 3P. Halla el precio de equilibrio."
            },
            "a": 16,
            "tol": 0,
            "why": {
              "en": "100 - 2P = 20 + 3P → 80 = 5P → P = 16.",
              "es": "100 - 2P = 20 + 3P → 80 = 5P → P = 16."
            }
          },
          {
            "id": "eh119",
            "topic": "markets",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "A government subsidy to solar panel producers would most likely:",
              "es": "Un subsidio gubernamental a productores de paneles solares probablemente:"
            },
            "c": {
              "en": [
                "Shift supply right, lowering the market price",
                "Shift demand right, raising the market price",
                "Have no effect on the market",
                "Create a shortage"
              ],
              "es": [
                "Desplazaría la oferta a la derecha, bajando el precio de mercado",
                "Desplazaría la demanda a la derecha, subiendo el precio",
                "No tendría efecto",
                "Crearía una escasez"
              ]
            },
            "a": 0,
            "why": {
              "en": "A subsidy lowers production costs → supply shifts right → more quantity at a lower price.",
              "es": "Un subsidio baja los costos de producción → la oferta se desplaza a la derecha → más cantidad a menor precio."
            }
          },
          {
            "id": "eh120",
            "topic": "roles",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is the BEST example of human capital?",
              "es": "¿Cuál es el MEJOR ejemplo de capital humano?"
            },
            "c": {
              "en": [
                "A worker's training and education",
                "A factory robot",
                "A company's office building",
                "Money in a savings account"
              ],
              "es": [
                "La capacitación y educación de un trabajador",
                "Un robot de fábrica",
                "El edificio de oficinas",
                "Dinero en cuenta de ahorros"
              ]
            },
            "a": 0,
            "why": {
              "en": "Human capital is the knowledge, skills, and experience that make workers more productive.",
              "es": "El capital humano es el conocimiento, habilidades y experiencia que hacen a los trabajadores más productivos."
            }
          }
        ],
        "topics": [
          {
            "id": "systems",
            "en": "Economic Systems",
            "es": "Sistemas económicos"
          },
          {
            "id": "markets",
            "en": "How Markets Work",
            "es": "Cómo funcionan los mercados"
          },
          {
            "id": "roles",
            "en": "Roles in the Economy",
            "es": "Roles en la economía"
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
            },
            "topic": "measure"
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
            },
            "topic": "cycles"
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
            },
            "topic": "measure"
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
            },
            "topic": "cycles"
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
            },
            "topic": "policy"
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
            },
            "topic": "measure"
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
            },
            "topic": "policy"
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
            },
            "topic": "policy"
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
            },
            "topic": "cycles"
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
            },
            "topic": "policy"
          },
          {
            "id": "eh211",
            "topic": "measure",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "Which is NOT counted in GDP?",
              "es": "¿Cuál NO se cuenta en el PIB?"
            },
            "c": {
              "en": [
                "A homeowner mowing their own lawn",
                "A restaurant meal",
                "A new car purchase",
                "A teacher's salary"
              ],
              "es": [
                "Un dueño de casa que corta su propio césped",
                "Una comida en restaurante",
                "La compra de un auto nuevo",
                "El salario de un maestro"
              ]
            },
            "a": 0,
            "why": {
              "en": "GDP counts only market transactions. Unpaid household work has no market price and is excluded.",
              "es": "El PIB cuenta solo transacciones de mercado. El trabajo doméstico no remunerado se excluye."
            }
          },
          {
            "id": "eh212",
            "topic": "cycles",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which type of unemployment is considered healthy and normal?",
              "es": "¿Qué tipo de desempleo se considera saludable y normal?"
            },
            "c": {
              "en": [
                "Frictional — workers between jobs",
                "Cyclical — caused by recessions",
                "Structural — skills mismatch",
                "All unemployment is harmful"
              ],
              "es": [
                "Friccional — trabajadores entre empleos",
                "Cíclico — causado por recesiones",
                "Estructural — desajuste de habilidades",
                "Todo desempleo es dañino"
              ]
            },
            "a": 0,
            "why": {
              "en": "Some frictional unemployment is inevitable and even beneficial — people searching for better-fitting jobs.",
              "es": "Algo de desempleo friccional es inevitable e incluso beneficioso — personas buscando empleos que se ajusten mejor."
            }
          },
          {
            "id": "eh213",
            "topic": "policy",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which is an example of MONETARY policy?",
              "es": "¿Cuál es un ejemplo de política MONETARIA?"
            },
            "c": {
              "en": [
                "The Fed buys government bonds",
                "Congress raises income taxes",
                "The President signs a spending bill",
                "A state raises its minimum wage"
              ],
              "es": [
                "La Fed compra bonos del gobierno",
                "El Congreso sube impuestos",
                "El Presidente firma una ley de gasto",
                "Un estado sube su salario mínimo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Monetary policy is controlled by the Federal Reserve through tools like open market operations. Fiscal policy is Congress/President.",
              "es": "La política monetaria la controla la Reserva Federal. La política fiscal es del Congreso/Presidente."
            }
          },
          {
            "id": "eh214",
            "topic": "measure",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "CPI last year was 200, this year it is 210. What is the inflation rate as a percent?",
              "es": "El IPC del año pasado fue 200, este año es 210. ¿Cuál es la tasa de inflación como porcentaje?"
            },
            "a": 5,
            "tol": 0.1,
            "why": {
              "en": "(210 - 200) / 200 × 100 = 5%.",
              "es": "(210 - 200) / 200 × 100 = 5%."
            }
          },
          {
            "id": "eh215",
            "topic": "cycles",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "During which phase of the business cycle is unemployment typically highest?",
              "es": "¿Durante qué fase del ciclo económico el desempleo es típicamente más alto?"
            },
            "c": {
              "en": [
                "Trough",
                "Peak",
                "Expansion",
                "Recovery"
              ],
              "es": [
                "Valle",
                "Auge",
                "Expansión",
                "Recuperación"
              ]
            },
            "a": 0,
            "why": {
              "en": "The trough is the lowest point — output is at its weakest and unemployment peaks before recovery begins.",
              "es": "El valle es el punto más bajo — la producción está en su nivel más débil y el desempleo llega a su máximo."
            }
          },
          {
            "id": "eh216",
            "topic": "policy",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "During a recession, the government cuts taxes and increases spending. Explain how this is supposed to help the economy.",
              "es": "Durante una recesión, el gobierno reduce impuestos y aumenta el gasto. Explica cómo se supone que esto ayuda a la economía."
            },
            "keys": [
              "spending",
              "demand",
              "jobs",
              "growth",
              "gasto",
              "demanda",
              "empleos",
              "crecimiento"
            ],
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "spend",
                  "label": "more money in consumers' hands / more government spending",
                  "any": [
                    "more spending",
                    "more money",
                    "disposable income",
                    "consumers spend more",
                    "government spends",
                    "más gasto",
                    "más dinero",
                    "ingreso disponible",
                    "consumidores gastan más"
                  ]
                },
                {
                  "id": "demand",
                  "label": "this increases aggregate demand / creates jobs",
                  "any": [
                    "aggregate demand",
                    "demand increases",
                    "creates jobs",
                    "more employment",
                    "boosts the economy",
                    "economic growth",
                    "stimulates",
                    "demanda agregada",
                    "crea empleos",
                    "estimula la economía"
                  ]
                }
              ],
              "onPass": "Right — tax cuts put more money in people's pockets and government spending creates jobs, both boosting demand."
            },
            "why": {
              "en": "Expansionary fiscal policy increases spending power and creates demand, which stimulates production and employment.",
              "es": "La política fiscal expansiva aumenta el poder de gasto y crea demanda, estimulando producción y empleo."
            }
          },
          {
            "id": "eh217",
            "topic": "policy",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "If the Fed RAISES interest rates, what is the most likely effect?",
              "es": "Si la Fed SUBE las tasas de interés, ¿cuál es el efecto más probable?"
            },
            "c": {
              "en": [
                "Borrowing decreases, slowing economic growth",
                "Borrowing increases, boosting growth",
                "Unemployment falls immediately",
                "Inflation rises"
              ],
              "es": [
                "Los préstamos disminuyen, desacelerando el crecimiento",
                "Los préstamos aumentan, impulsando el crecimiento",
                "El desempleo baja inmediatamente",
                "La inflación sube"
              ]
            },
            "a": 0,
            "why": {
              "en": "Higher rates make borrowing more expensive → less consumer and business spending → economy cools.",
              "es": "Tasas más altas encarecen los préstamos → menos gasto → la economía se enfría."
            }
          },
          {
            "id": "eh218",
            "topic": "measure",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Real GDP differs from nominal GDP because real GDP:",
              "es": "El PIB real difiere del PIB nominal porque el PIB real:"
            },
            "c": {
              "en": [
                "Adjusts for inflation using constant prices",
                "Includes underground economic activity",
                "Counts only government spending",
                "Is always higher"
              ],
              "es": [
                "Se ajusta por inflación usando precios constantes",
                "Incluye la actividad económica subterránea",
                "Cuenta solo gasto del gobierno",
                "Siempre es mayor"
              ]
            },
            "a": 0,
            "why": {
              "en": "Real GDP holds prices constant so changes reflect actual output growth, not just rising prices.",
              "es": "El PIB real mantiene precios constantes para que los cambios reflejen producción real, no solo precios más altos."
            }
          },
          {
            "id": "eh219",
            "topic": "cycles",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select ALL characteristics of a recession.",
              "es": "Selecciona TODAS las características de una recesión."
            },
            "c": {
              "en": [
                "Rising unemployment",
                "Falling GDP",
                "Increasing consumer confidence",
                "Rising stock market"
              ],
              "es": [
                "Desempleo creciente",
                "PIB en caída",
                "Confianza del consumidor creciente",
                "Mercado de valores en alza"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "Recessions feature declining output and rising unemployment. Confidence and markets typically fall too.",
              "es": "Las recesiones presentan producción decreciente y desempleo creciente."
            }
          },
          {
            "id": "eh220",
            "topic": "policy",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Automatic stabilizers work by:",
              "es": "Los estabilizadores automáticos funcionan al:"
            },
            "c": {
              "en": [
                "Automatically increasing government spending during downturns without new legislation",
                "Requiring Congress to pass new laws each recession",
                "Raising interest rates automatically",
                "Cutting taxes only for businesses"
              ],
              "es": [
                "Aumentar automáticamente el gasto del gobierno durante recesiones sin nueva legislación",
                "Requerir que el Congreso apruebe nuevas leyes",
                "Subir tasas de interés automáticamente",
                "Reducir impuestos solo para empresas"
              ]
            },
            "a": 0,
            "why": {
              "en": "Programs like unemployment insurance and progressive taxes automatically pump more money into the economy during downturns.",
              "es": "Programas como el seguro de desempleo e impuestos progresivos automáticamente inyectan más dinero durante las recesiones."
            }
          }
        ],
        "topics": [
          {
            "id": "measure",
            "en": "Measuring the Economy",
            "es": "Midiendo la economía"
          },
          {
            "id": "cycles",
            "en": "Business Cycles & Unemployment",
            "es": "Ciclos económicos y desempleo"
          },
          {
            "id": "policy",
            "en": "Fiscal & Monetary Policy",
            "es": "Política fiscal y monetaria"
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
            },
            "topic": "tradeb"
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
            },
            "topic": "tradeb"
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
            },
            "topic": "fx"
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
            },
            "topic": "barriers"
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
            },
            "topic": "tradeb"
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
            },
            "topic": "barriers"
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
            },
            "topic": "barriers"
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
            },
            "topic": "fx"
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
            },
            "topic": "barriers"
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
            },
            "topic": "tradeb"
          },
          {
            "id": "eh311",
            "topic": "tradeb",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The main reason countries trade with each other is:",
              "es": "La principal razón por la que los países comercian entre sí es:"
            },
            "c": {
              "en": [
                "Different countries can produce different goods more efficiently",
                "Countries want to be dependent on each other",
                "The UN requires it",
                "To increase unemployment"
              ],
              "es": [
                "Diferentes países pueden producir diferentes bienes más eficientemente",
                "Los países quieren depender entre sí",
                "La ONU lo requiere",
                "Para aumentar el desempleo"
              ]
            },
            "a": 0,
            "why": {
              "en": "Trade allows countries to specialize in what they do best and import the rest, making both sides better off.",
              "es": "El comercio permite a los países especializarse en lo que hacen mejor e importar el resto."
            }
          },
          {
            "id": "eh312",
            "topic": "barriers",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "A quota on imported cars limits:",
              "es": "Una cuota sobre autos importados limita:"
            },
            "c": {
              "en": [
                "The number or quantity of cars that can be imported",
                "The price of imported cars",
                "Domestic car production",
                "Car exports"
              ],
              "es": [
                "La cantidad de autos que pueden importarse",
                "El precio de los autos importados",
                "La producción doméstica de autos",
                "Las exportaciones de autos"
              ]
            },
            "a": 0,
            "why": {
              "en": "A quota sets a maximum quantity that can be imported, directly restricting supply.",
              "es": "Una cuota fija una cantidad máxima que puede importarse, restringiendo directamente la oferta."
            }
          },
          {
            "id": "eh313",
            "topic": "fx",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "If the U.S. dollar strengthens against the Japanese yen, what happens to U.S. imports from Japan?",
              "es": "Si el dólar se fortalece contra el yen japonés, ¿qué pasa con las importaciones de EE.UU. desde Japón?"
            },
            "c": {
              "en": [
                "They become cheaper for Americans",
                "They become more expensive",
                "No change",
                "Japan stops exporting"
              ],
              "es": [
                "Se vuelven más baratas para los estadounidenses",
                "Se vuelven más caras",
                "Sin cambio",
                "Japón deja de exportar"
              ]
            },
            "a": 0,
            "why": {
              "en": "A stronger dollar buys more yen, making Japanese goods cheaper in dollar terms.",
              "es": "Un dólar más fuerte compra más yenes, abaratando los bienes japoneses en dólares."
            }
          },
          {
            "id": "eh314",
            "topic": "tradeb",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Country A can produce 50 phones or 100 shirts. Country B can produce 30 phones or 150 shirts. What is Country A's opportunity cost of one phone, in shirts?",
              "es": "El país A puede producir 50 teléfonos o 100 camisas. El país B puede producir 30 teléfonos o 150 camisas. ¿Cuál es el costo de oportunidad de un teléfono para A, en camisas?"
            },
            "a": 2,
            "tol": 0,
            "why": {
              "en": "100 shirts ÷ 50 phones = 2 shirts per phone for Country A.",
              "es": "100 camisas ÷ 50 teléfonos = 2 camisas por teléfono para A."
            }
          },
          {
            "id": "eh315",
            "topic": "tradeb",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Using the same data (A: 50 phones or 100 shirts, B: 30 phones or 150 shirts), who should specialize in shirts?",
              "es": "Usando los mismos datos (A: 50 teléfonos o 100 camisas, B: 30 teléfonos o 150 camisas), ¿quién debe especializarse en camisas?"
            },
            "c": {
              "en": [
                "Country B — lower opportunity cost (0.2 phones per shirt vs A's 0.5)",
                "Country A — it makes more shirts overall",
                "Neither should specialize",
                "Both should make shirts"
              ],
              "es": [
                "País B — menor costo de oportunidad (0.2 teléfonos por camisa vs 0.5 de A)",
                "País A — produce más camisas en total",
                "Ninguno debe especializarse",
                "Ambos deben hacer camisas"
              ]
            },
            "a": 0,
            "why": {
              "en": "B: 30÷150 = 0.2 phones/shirt. A: 50÷100 = 0.5 phones/shirt. B gives up less.",
              "es": "B: 30÷150 = 0.2 teléfonos/camisa. A: 50÷100 = 0.5. B sacrifica menos."
            }
          },
          {
            "id": "eh316",
            "topic": "barriers",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain one way tariffs hurt consumers even though they protect domestic jobs.",
              "es": "Explica una forma en que los aranceles perjudican a los consumidores aunque protejan empleos domésticos."
            },
            "keys": [
              "higher prices",
              "pay more",
              "choice",
              "less competition",
              "precios más altos",
              "pagar más",
              "menos competencia"
            ],
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "price",
                  "label": "consumers pay higher prices",
                  "any": [
                    "higher prices",
                    "pay more",
                    "prices rise",
                    "more expensive",
                    "costs more",
                    "increased cost",
                    "precios más altos",
                    "pagar más",
                    "precios suben",
                    "más caro"
                  ]
                },
                {
                  "id": "why",
                  "label": "because imports are taxed / less competition",
                  "any": [
                    "import tax",
                    "tariff raises",
                    "less competition",
                    "fewer choices",
                    "restricted supply",
                    "foreign goods cost more",
                    "impuesto a importaciones",
                    "menos competencia",
                    "menos opciones"
                  ]
                }
              ],
              "onPass": "Right — tariffs raise the cost of imports, which lets domestic producers charge more too, so consumers pay higher prices with fewer choices."
            },
            "why": {
              "en": "Tariffs raise import prices and reduce competition, so consumers pay more and have fewer choices.",
              "es": "Los aranceles elevan precios de importación y reducen la competencia, así que los consumidores pagan más."
            }
          },
          {
            "id": "eh317",
            "topic": "fx",
            "type": "mcq",
            "diff": 3,
            "q": {
              "en": "Florida's tourism industry benefits most when the dollar is:",
              "es": "La industria turística de Florida se beneficia más cuando el dólar está:"
            },
            "c": {
              "en": [
                "Weak — foreign tourists find the U.S. cheaper",
                "Strong — Americans travel domestically",
                "Stable — prices don't change",
                "None of these affects tourism"
              ],
              "es": [
                "Débil — los turistas extranjeros encuentran EE.UU. más barato",
                "Fuerte — los estadounidenses viajan internamente",
                "Estable — los precios no cambian",
                "Ninguno de estos afecta el turismo"
              ]
            },
            "a": 0,
            "why": {
              "en": "A weaker dollar means foreign currencies buy more in the U.S., attracting more international visitors to Florida.",
              "es": "Un dólar más débil significa que las monedas extranjeras compran más en EE.UU., atrayendo más visitantes internacionales a Florida."
            }
          }
        ],
        "topics": [
          {
            "id": "tradeb",
            "en": "Why Nations Trade",
            "es": "Por qué comercian las naciones"
          },
          {
            "id": "barriers",
            "en": "Trade Barriers & Policy",
            "es": "Barreras comerciales y política"
          },
          {
            "id": "fx",
            "en": "Exchange Rates & Florida",
            "es": "Tipos de cambio y Florida"
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
            },
            "topic": "income"
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
            },
            "topic": "income"
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
            },
            "topic": "income"
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
            },
            "topic": "credit"
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
            },
            "topic": "saving"
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
            },
            "topic": "credit"
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
            },
            "topic": "saving"
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
            },
            "topic": "income"
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
            },
            "topic": "saving"
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
            },
            "topic": "saving"
          },
          {
            "id": "eh411",
            "topic": "income",
            "type": "mcq",
            "diff": 1,
            "q": {
              "en": "The difference between gross pay and net pay is:",
              "es": "La diferencia entre salario bruto y salario neto es:"
            },
            "c": {
              "en": [
                "Deductions like taxes, insurance, and retirement contributions",
                "Tips and bonuses",
                "Overtime pay",
                "Your employer's profit"
              ],
              "es": [
                "Deducciones como impuestos, seguros y contribuciones de retiro",
                "Propinas y bonos",
                "Pago de horas extra",
                "La ganancia de tu empleador"
              ]
            },
            "a": 0,
            "why": {
              "en": "Net pay = gross pay minus all deductions (federal/state taxes, FICA, health insurance, 401k, etc.).",
              "es": "Salario neto = salario bruto menos todas las deducciones."
            }
          },
          {
            "id": "eh412",
            "topic": "credit",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which factor has the BIGGEST impact on a credit score?",
              "es": "¿Qué factor tiene el MAYOR impacto en el puntaje de crédito?"
            },
            "c": {
              "en": [
                "Payment history — whether you pay on time",
                "Your income level",
                "The type of car you drive",
                "How much cash you keep at home"
              ],
              "es": [
                "Historial de pagos — si pagas a tiempo",
                "Tu nivel de ingresos",
                "El tipo de auto que manejas",
                "Cuánto efectivo guardas en casa"
              ]
            },
            "a": 0,
            "why": {
              "en": "Payment history accounts for about 35% of a FICO score. Income itself is not directly in the score.",
              "es": "El historial de pagos representa aproximadamente el 35% del puntaje FICO. El ingreso en sí no está directamente en el puntaje."
            }
          },
          {
            "id": "eh413",
            "topic": "saving",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "You invest $500 at 6% annual compound interest. How much do you have after 2 years? (Round to the nearest dollar.)",
              "es": "Inviertes $500 al 6% de interés compuesto anual. ¿Cuánto tienes después de 2 años? (Redondea al dólar más cercano.)"
            },
            "a": 562,
            "tol": 1,
            "why": {
              "en": "Year 1: $500 × 1.06 = $530. Year 2: $530 × 1.06 = $561.80 ≈ $562.",
              "es": "Año 1: $500 × 1.06 = $530. Año 2: $530 × 1.06 = $561.80 ≈ $562."
            }
          },
          {
            "id": "eh414",
            "topic": "credit",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "The 'minimum payment' on a credit card is designed to:",
              "es": "El 'pago mínimo' de una tarjeta de crédito está diseñado para:"
            },
            "c": {
              "en": [
                "Keep the account current while maximizing interest the bank earns",
                "Pay off the balance quickly",
                "Avoid all interest charges",
                "Lower your credit limit"
              ],
              "es": [
                "Mantener la cuenta al corriente mientras maximiza el interés que gana el banco",
                "Pagar el saldo rápidamente",
                "Evitar todos los cargos por interés",
                "Bajar tu límite de crédito"
              ]
            },
            "a": 0,
            "why": {
              "en": "Minimum payments cover mostly interest — at that rate a $2,000 balance can take 15+ years to pay off.",
              "es": "Los pagos mínimos cubren mayormente intereses — a ese ritmo un saldo de $2,000 puede tardar 15+ años en pagarse."
            }
          },
          {
            "id": "eh415",
            "topic": "income",
            "type": "numeric",
            "diff": 2,
            "q": {
              "en": "Monthly net income is $2,400. Under the 50/30/20 rule, how much goes to savings and debt repayment?",
              "es": "El ingreso neto mensual es $2,400. Bajo la regla 50/30/20, ¿cuánto va a ahorros y pago de deudas?"
            },
            "a": 480,
            "tol": 0,
            "why": {
              "en": "20% of $2,400 = $480 for savings and debt repayment.",
              "es": "20% de $2,400 = $480 para ahorros y pago de deudas."
            }
          },
          {
            "id": "eh416",
            "topic": "saving",
            "type": "short",
            "diff": 3,
            "q": {
              "en": "Explain the difference between a stock and a bond in terms of risk and ownership.",
              "es": "Explica la diferencia entre una acción y un bono en términos de riesgo y propiedad."
            },
            "keys": [
              "own",
              "ownership",
              "lend",
              "loan",
              "risk",
              "higher",
              "riesgo",
              "propiedad",
              "préstamo"
            ],
            "spec": {
              "minWords": 4,
              "ideas": [
                {
                  "id": "own",
                  "label": "stocks = ownership / shares in a company",
                  "any": [
                    "ownership",
                    "own part",
                    "share of",
                    "piece of",
                    "equity",
                    "partial owner",
                    "own a piece",
                    "propiedad",
                    "dueño",
                    "parte de",
                    "acción"
                  ]
                },
                {
                  "id": "lend",
                  "label": "bonds = lending money / IOU / debt",
                  "any": [
                    "lending",
                    "loan",
                    "lend money",
                    "IOU",
                    "debt",
                    "borrow",
                    "fixed return",
                    "interest payment",
                    "préstamo",
                    "prestar dinero",
                    "deuda",
                    "rendimiento fijo"
                  ]
                }
              ],
              "onPass": "Right — a stock makes you a partial owner (higher risk, potentially higher return); a bond means you're lending money (lower risk, fixed return)."
            },
            "why": {
              "en": "Stocks = ownership (higher risk/reward). Bonds = lending (lower risk, fixed interest).",
              "es": "Acciones = propiedad (mayor riesgo/rendimiento). Bonos = préstamo (menor riesgo, interés fijo)."
            }
          },
          {
            "id": "eh417",
            "topic": "credit",
            "type": "multi",
            "diff": 2,
            "q": {
              "en": "Select ALL actions that would LOWER a credit score.",
              "es": "Selecciona TODAS las acciones que BAJARÍAN un puntaje de crédito."
            },
            "c": {
              "en": [
                "Missing a payment deadline",
                "Maxing out a credit card",
                "Paying your full balance monthly",
                "Using less than 30% of your credit limit"
              ],
              "es": [
                "No pagar a tiempo",
                "Usar el límite máximo de la tarjeta",
                "Pagar el saldo completo mensualmente",
                "Usar menos del 30% del límite de crédito"
              ]
            },
            "a": [
              0,
              1
            ],
            "why": {
              "en": "Late payments and high utilization both damage scores. Paying in full and keeping usage low are positive signals.",
              "es": "Pagos tardíos y alta utilización dañan el puntaje. Pagar en su totalidad y mantener bajo uso son señales positivas."
            }
          },
          {
            "id": "eh418",
            "topic": "saving",
            "type": "mcq",
            "diff": 2,
            "q": {
              "en": "Which type of account typically earns the HIGHEST interest but has the LEAST liquidity?",
              "es": "¿Qué tipo de cuenta típicamente gana el interés MÁS ALTO pero tiene la MENOR liquidez?"
            },
            "c": {
              "en": [
                "Certificate of deposit (CD)",
                "Checking account",
                "Savings account",
                "Cash under your mattress"
              ],
              "es": [
                "Certificado de depósito (CD)",
                "Cuenta corriente",
                "Cuenta de ahorros",
                "Efectivo bajo el colchón"
              ]
            },
            "a": 0,
            "why": {
              "en": "CDs lock your money for a set period in exchange for higher rates. Checking is most liquid but earns the least.",
              "es": "Los CDs inmovilizan tu dinero por un período fijo a cambio de tasas más altas."
            }
          }
        ],
        "topics": [
          {
            "id": "income",
            "en": "Income & Budgeting",
            "es": "Ingresos y presupuesto"
          },
          {
            "id": "credit",
            "en": "Credit & Debt",
            "es": "Crédito y deuda"
          },
          {
            "id": "saving",
            "en": "Saving & Insurance",
            "es": "Ahorro y seguros"
          }
        ]
      }
    ]
  }
];