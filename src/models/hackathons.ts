export interface Hackathon {
    id: string
    title: string
    detailedDescription: string
    dateFrom: string
    dateTo: string
    location?: string
    registrationOpen?: boolean
    cases: Case[]
}

export interface Case {
    id: string
    title: string
    description: string
    complexity: 'beginner' | 'intermediate' | 'advanced'
    prize?: string
}

export const mainHackathons: Hackathon[] = [
    {
        id: '1',
        title: 'Окак Международный 2025',
        detailedDescription: 'Крупнейшее ежегодное событие для разработчиков со всего мира. 7 дней интенсивной работы, мастер-классов от ведущих экспертов и нетворкинга.',
        dateFrom: '2025-10-15',
        dateTo: '2025-10-22',
        location: 'Москва',
        registrationOpen: true,
        cases: [
            {
                id: '1',
                title: 'Умные города будущего',
                description: 'Разработка решений для автоматизации городской инфраструктуры',
                complexity: 'advanced',
                prize: '$10,000'
            },
            {
                id: '2',
                title: 'Экологичный транспорт',
                description: 'Создание систем для экологичных транспортных решений',
                complexity: 'intermediate',
                prize: '$5,000'
            }
        ]
    },
    {
        id: '2',
        title: 'Окак Всетатарский 2025',
        detailedDescription: 'Хакатон, посвящённый передовым технологиям искусственного интеллекта и машинного обучения. Участники получат доступ к уникальным датасетам и облачным ресурсам.',
        dateFrom: '2025-11-20',
        dateTo: '2025-11-22',
        location: 'Казань, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Медицинская диагностика',
                description: 'Разработка алгоритмов для анализа медицинских изображений',
                complexity: 'advanced',
                prize: 'Стажировка в ведущей IT-компании'
            }
        ]
    }
]

export const mockHackathons: Hackathon[] = [
    {
        id: '1',
        title: 'AI Innovation Challenge',
        detailedDescription: 'Соревнование по созданию инновационных решений на основе искусственного интеллекта для бизнес-задач.',
        dateFrom: '2025-09-10',
        dateTo: '2025-09-12',
        location: 'Казань, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Автоматизация бизнес-процессов',
                description: 'Разработка AI-решений для оптимизации корпоративных процессов',
                complexity: 'advanced',
                prize: 'Грант 500,000 ₽'
            }
        ]
    },
    {
        id: '2',
        title: 'FinTech Хакатон',
        detailedDescription: 'Разработка передовых решений для финансового сектора и банковской индустрии.',
        dateFrom: '2025-10-05',
        dateTo: '2025-10-07',
        location: 'Москва, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Безопасные платежные системы',
                description: 'Создание защищенных платежных решений нового поколения',
                complexity: 'advanced',
                prize: 'Контракт с ведущим банком'
            }
        ]
    },
    {
        id: '3',
        title: 'Блокчейн Хакатон',
        detailedDescription: 'Интенсивное мероприятие для разработчиков блокчейн-решений. Эксперты из индустрии помогут участникам реализовать их идеи в сфере Web3.',
        dateFrom: '2025-12-05',
        dateTo: '2025-12-07',
        location: 'Москва, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Децентрализованные финансы',
                description: 'Разработка протоколов для DeFi-приложений',
                complexity: 'advanced',
                prize: '$15,000 в криптовалюте'
            }
        ]
    },
    {
        id: '4',
        title: 'Климатический Технохакатон',
        detailedDescription: 'Мероприятие для тех, кто хочет внести вклад в решение экологических проблем. Участники будут работать над проектами в области устойчивого развития.',
        dateFrom: '2026-01-15',
        dateTo: '2026-01-17',
        location: 'Санкт-Петербург, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Мониторинг выбросов',
                description: 'Системы отслеживания углеродного следа предприятий',
                complexity: 'intermediate',
                prize: 'Грант на реализацию проекта'
            }
        ]
    },
    {
        id: '5',
        title: 'Университетский Хакатон 2026',
        detailedDescription: 'Идеальная площадка для студентов, чтобы проявить свои навыки, пообщаться с работодателями и найти команду для стартапа.',
        dateFrom: '2026-02-10',
        dateTo: '2026-02-12',
        location: 'Новосибирск, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Образовательные технологии',
                description: 'Разработка инструментов для цифрового обучения',
                complexity: 'beginner',
                prize: 'Ноутбуки для всей команды'
            }
        ]
    },
    {
        id: '6',
        title: 'HealthTech Challenge',
        detailedDescription: 'Создание инновационных решений для здравоохранения и медицинских технологий.',
        dateFrom: '2026-03-15',
        dateTo: '2026-03-17',
        location: 'Екатеринбург, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Телемедицинские платформы',
                description: 'Разработка систем для удаленной диагностики и консультаций',
                complexity: 'intermediate',
                prize: 'Внедрение решения в клиники'
            }
        ]
    },
    {
        id: '7',
        title: 'GameDev Marathon',
        detailedDescription: '48-часовой марафон по созданию игровых проектов и интерактивных приложений.',
        dateFrom: '2026-04-20',
        dateTo: '2026-04-22',
        location: 'Нижний Новгород, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Образовательные игры',
                description: 'Создание игровых решений для обучения школьников',
                complexity: 'beginner',
                prize: 'Публикация в Steam'
            }
        ]
    },
    {
        id: '8',
        title: 'Smart City Hack',
        detailedDescription: 'Разработка решений для умных городов и цифровой инфраструктуры.',
        dateFrom: '2026-05-10',
        dateTo: '2026-05-12',
        location: 'Краснодар, Россия',
        registrationOpen: false,
        cases: [
            {
                id: '1',
                title: 'Управление городским транспортом',
                description: 'Оптимизация транспортных потоков с помощью ИИ',
                complexity: 'advanced',
                prize: 'Внедрение в пилотном городе'
            }
        ]
    }
]