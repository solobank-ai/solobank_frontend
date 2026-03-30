import type { Translations } from "./en";

export const ru: Translations = {
  // Navbar
  nav: {
    accounts: "Аккаунты",
    howItWorks: "Как это работает",
    docs: "Документация",
    github: "GitHub",
    install: "Установить",
    getStarted: "Начать",
  },

  // Hero
  hero: {
    badge: "На базе Solana",
    headline1: "Банковский счёт",
    headline2: "для AI-агентов.",
    subline: "Зарабатывай, занимай, инвестируй, обменивай, плати — автономно.",
    cta: "Начать",
    installCmd: "npm i -g @solobank/cli",
  },

  // Accounts
  accounts: {
    title1: "Пять аккаунтов,",
    title2: "один агент",
    subtitle: "Всё, что нужно вашему агенту для управления финансами — автономно и без кастодиана.",
    checking: {
      title: "ТЕКУЩИЙ",
      description: "Отправляйте и получайте USDC. Комиссии за газ обрабатываются автоматически через SPL Token.",
    },
    savings: {
      title: "СБЕРЕЖЕНИЯ",
      description: "Зарабатывайте 4–8% APY автоматически. Депозиты направляются в лучший протокол через Kamino / marginfi.",
    },
    credit: {
      title: "КРЕДИТ",
      description: "Занимайте под залог сбережений без продажи активов. Погашайте по своему графику.",
    },
    invest: {
      title: "ИНВЕСТИЦИИ",
      description: "Покупайте, продавайте и зарабатывайте. Обмен через лучший маршрут Jupiter.",
    },
    swap: {
      title: "ОБМЕН",
      description: "Обмен между стейблкоинами и криптовалютами по лучшему курсу через Jupiter.",
    },
  },

  // How it works
  howItWorks: {
    title: "Как это работает",
    subtitle: "Запуск менее чем за две минуты.",
    step1: {
      title: "Установка",
      duration: "30с",
      description: "Одна команда. Кошелёк, MCP-сервер и лимиты безопасности — всё настроено.",
    },
    step2: {
      title: "Пополнение",
      duration: "1 мин",
      description: "Отправьте USDC на адрес кошелька. Газ и маршрутизация обрабатываются автоматически.",
    },
    step3: {
      title: "Пусть работает",
      duration: "∞",
      description: 'Перезапустите AI-платформу и спросите: "Какой мой баланс в solobank?" — ваш агент работает.',
    },
  },

  // Comparison / Features
  comparison: {
    title: "Всё, что нужно агенту",
    subtitle: "Полноценный DeFi в одном SDK. Без обёрток и лишнего кода.",
    sendReceive: {
      title: "Отправка и получение",
      description: "Переводите SOL и USDC на любой адрес Solana. Комиссии обрабатываются автоматически.",
    },
    earnApy: {
      title: "Доход 4–8% APY",
      description: "Депозиты автоматически направляются в лучшие протоколы Kamino и marginfi. Ребалансировка при смене ставок.",
    },
    mcpTools: {
      title: "4 MCP-инструмента",
      description: "Подключайте к Claude, Cursor или любой MCP-совместимой AI-платформе. Один JSON — и у агента есть счёт.",
    },
    borrowOnDemand: "Займ по требованию",
    borrowDesc: "Кредит под залог сбережений — без продажи.",
    jupiterSwaps: "Обмен через Jupiter",
    jupiterDesc: "Любой SPL-токен, лучший маршрут, всегда.",
    autoRebalance: "Авто-ребалансировка",
    autoRebalanceDesc: "Перемещает средства в протоколы с высоким APY.",
    mppProtocol: "Протокол MPP",
    mppDesc: "Оплата API по запросу через 402.",
    agentSafeguards: "Лимиты безопасности",
    safeguardsDesc: "Лимиты на транзакцию и дневные расходы.",
    defiProtocols: "DeFi-протоколы",
    defiDesc: "Kamino + marginfi + Jupiter из коробки.",
    browserClient: "Браузерный клиент",
    browserDesc: "Запуск в браузере через @solobank/sdk.",
  },

  // Install section
  install: {
    title1: "Дай своему агенту",
    title2: "финансовую жизнь.",
    subtitle: "Открытый код. Без кастодиана. На базе Solana.",
    liveDemos: "Демо",
  },

  // Footer
  footer: {
    product: "Продукт",
    gateway: "Шлюз",
    resources: "Ресурсы",
    legal: "Правовая информация",
    services: "Сервисы",
    stats: "Статистика",
    terms: "Условия",
    privacy: "Конфиденциальность",
    security: "Безопасность",
    copyright: "© 2025 Solobank. Открытый код. Без кастодиана.",
    builtOn: "На базе Solana",
  },

  // Terminal lines (keep commands in English, translate output)
  terminal: [
    "$ solobank init",
    "Кошелёк создан: 7xKp...3mNq",
    "MCP-сервер настроен",
    "Лимиты: $100/транз · $500/день",
    "",
    "$ solobank balance",
    "SOL:   0.05 SOL",
    "USDC:  $148.91 USDC",
    "",
    "$ solobank send 10 9pFr...2kLx",
    "✓ Отправлено 10.00 USDC → 9pFr...2kLx",
    "  TX: 4vGh...8mKp  подтверждено (420мс)",
    "",
    "$ solobank lend 80 USDC",
    "✓ Внесено 80.00 USDC в Kamino",
    "  APY: 4.21%",
  ],
};
