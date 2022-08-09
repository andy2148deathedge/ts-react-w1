import { useEffect, useState } from "react";
import { Currency, NewCurrency } from "../type";

/* 常數及實例 */
const INIT_WALLET: number = 5000;
const initCurrencies: Currency[] = [
  {
    name: "日幣",
    rate: 0.22,
  },
  {
    name: "美金",
    rate: 0.033,
  },
  {
    name: "澳幣",
    rate: 0.048,
  },
  {
    name: "韓幣",
    rate: 43.52,
  },
  {
    name: "印尼幣",
    rate: 495.16,
  },
];

export const ExChgRate = () => {
  /* hooks 共4個 */
  const [currencies, setNewCurrencies] = useState<Currency[]>(initCurrencies);
  const [newCurrency, setNewCurrency] = useState<NewCurrency>({
    currency: null,
    rate: null
  });
  const [currentInput, setCurrentInput] = useState<{
    crtChgName: string;
    crtAmount: number;
    crtRate: number;
    crtWallet: number;
  }>({
    crtChgName: "",
    crtAmount: 0,
    crtRate: 1,
    crtWallet: INIT_WALLET,
  });
  const [records, setRecords] = useState<string[]>([]);

  /* 新增幣種功能 */
  const addNewCurrency = () => {
    const newOne:Currency = {
      name: newCurrency.currency? newCurrency.currency: '',
      rate: newCurrency.rate? newCurrency.rate: 0
    };

    setNewCurrencies((preArr) => [...preArr, newOne]);
  };

  /* 兌換功能 */
  const handleExChg = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { name, value } = e.currentTarget;
    const [ currencyName, rate] = [name, Number(value)];
    
    if (currentInput.crtWallet < currentInput.crtAmount) {
      window.alert('餘額不足!');
      return;
    };

    setCurrentInput({
      ...currentInput,
      crtChgName: currencyName,
      crtRate: rate,
      crtWallet: currentInput.crtWallet - currentInput.crtAmount,
    });
  };
  useEffect(() => {
    if (currentInput.crtWallet === INIT_WALLET) return;

    const newMsg = 
      `您用 ${currentInput.crtAmount} 元台幣，兌換了 ${
        currentInput.crtAmount * currentInput.crtRate
      } ${currentInput.crtChgName},帳戶餘額為 ${currentInput.crtWallet} 元`;
    setRecords([...records, newMsg]);
    setCurrentInput({...currentInput, crtAmount: 0});
  }, [currentInput.crtWallet]);


  return (
    <div>
      <h3>新增幣種</h3>
      <input
        type="text"
        placeholder="幣種名稱"
        value={newCurrency.currency?.toString()}
        onChange={(e) =>
          setNewCurrency({ ...newCurrency, currency: e.target.value })
        }
      />
      <input
        type="number"
        placeholder="匯率"
        value={newCurrency.rate?.toString()}
        onChange={(e) =>
          setNewCurrency({ ...newCurrency, rate: Number(e.target.value) })
        }
      />
      <input type="button" value="新增幣種" onClick={addNewCurrency} />
      <hr />
      {/* lv1 */}
      <h3>您的錢包餘額為 {currentInput.crtWallet} 元</h3>
      請輸入您要兌換的台幣金額:
      <input
        type="number"
        min={0}
        max={INIT_WALLET}
        placeholder="台幣"
        value={currentInput.crtAmount}
        onChange={(e) =>
          setCurrentInput({
            ...currentInput,
            crtAmount: Number(e.target.value),
          })
        }
      />
      <p>可以兌換為以下幣種 / 匯率: </p>
      <ul>
        {currencies.map((currency) => (
          <li key={currency.name}>
            {currency.name}：{currency.rate}
            <button
              type="button"
              name={currency.name}
              value={currency.rate}
              onClick={(e) => handleExChg(e)}
            >
              兌換
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h3>您的兌換記錄如下:</h3>
      <ul>
        {records?.map((record) => (
          <li key={Math.random()}>
            <p>{record},</p>
            <p>{new Date().toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExChgRate;