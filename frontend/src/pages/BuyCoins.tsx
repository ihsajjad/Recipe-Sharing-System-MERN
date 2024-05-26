import { cardsData } from "../config/recipes.config";

const BuyCoins = () => {
  return (
    <div className="max-container py-6 min-h-[calc(100vh-64px)]">
      <h1 className="page-title">Purchase Coins</h1>
      <div className="min-h-[70vh] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center content-center">
        {cardsData.map((card) => (
          <div key={card.id} className="price-card group h-fit">
            <h3 className="text-2xl font-bold text-[var(--secondary-color)] group-hover:text-[var(--primary-color)] duration-300">
              {card.title}
            </h3>
            <div>
              <span className="text-7xl font-bold relative text-[var(--primary-color)]">
                <span className="absolute top-3 -left-1 text-xl font-semibold">
                  $
                </span>
                {card.price}
              </span>
              /<span className="text-xl font-semibold">{card.coins}</span>
            </div>
            <p>{card.description}</p>
            <button className="buy-btn">Buy For ${card.price}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyCoins;
