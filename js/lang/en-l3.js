/* English – Level 5 (Money management), Level 6 (Psychology & experience), Level 7 (Advanced) */
(function () {
  var h = I18N.h;
  var rr = h.rr({ aria: 'Diagram of a 1:2 reward-to-risk ratio', profit: 'Profit', risk: 'Risk', entry: 'Entry', tp: 'Take profit (+2R)', sl: 'Stop loss (-1R)', cap: 'R:R = 1:2 means accepting a loss of 1 part in the hope of making 2 parts.' });
  I18N.addPack('en', { lessons: {
    '5-1': { title: 'The 1–2% rule and why it saves you',
      body: '<p>Most traders fail not because their analysis is wrong but because the <strong>risk on each trade is too large</strong>. The 1–2% rule: accept losing at most 1–2% of your capital on each trade.</p>' +
        '<h2>The power of this rule</h2><table><thead><tr><th>Risk per trade</th><th>After 10 losses in a row</th><th>Capital left</th></tr></thead><tbody><tr><td>1%</td><td>-9.6%</td><td>90.4%</td></tr><tr><td>2%</td><td>-18.3%</td><td>81.7%</td></tr><tr><td>5%</td><td>-40.1%</td><td>59.9%</td></tr><tr><td>10%</td><td>-65.1%</td><td>34.9%</td></tr></tbody></table>' +
        I18N.fig.bars({"aria":"Capital left after 10 losses in a row by risk per trade","items":[{"label":"Risk 1% per trade","value":90.4,"text":"90.4% left","c":"ok"},{"label":"Risk 2% per trade","value":81.7,"text":"81.7% left","c":"ok"},{"label":"Risk 5% per trade","value":59.9,"text":"59.9% left","c":"warn"},{"label":"Risk 10% per trade","value":34.9,"text":"34.9% left","c":"bad"}],"cap":"Capital left after 10 losses in a row (starting capital = 100%). The larger the risk per trade, the harder the recovery."}) + '<h2>The maths of recovery</h2><p>A 50% loss needs a 100% gain to get back to breakeven; an 80% loss needs a 400% gain. The more capital you lose, the harder it is to come back.</p>' +
        '<h2>Extra limits</h2><ul><li><strong>Daily loss limit</strong> (e.g. 3%): when you hit it, stop.</li><li><strong>Weekly loss limit</strong> (e.g. 6%).</li><li><strong>Total risk of open trades</strong> no more than 3–5%.</li></ul>' +
        h.bad('Where do blown accounts come from?', 'Mostly from: high leverage, no stop loss, doubling down (martingale) and “making it back” after a losing streak.'),
      key: ['Risk at most 1–2% of capital per trade.', 'The deeper the loss, the harder the recovery.', 'Set daily and weekly loss limits.'],
      quiz: [{ q: 'After losing 50% of your capital, what gain do you need to break even?', o: ['50%', '100%', '25%'], w: '50 → 100 is a 100% increase.' },
             { q: 'Why have a daily loss limit?', o: ['It stops a chain of emotional decisions while losing', 'To increase size', 'To please the broker'], w: 'It helps you stop before you “tilt”.' }] },

    '5-2': { title: 'Position sizing',
      body: '<p>Trade size must be calculated from your <strong>risk amount</strong>, not by feel. The formula:</p>' +
        '<p><code>Lots = (Capital × % risk) ÷ (SL in pips × pip value per lot)</code></p>' +
        '<h2>Example</h2><p>Capital 2,000 USD, risk 1% = 20 USD. Trading EUR/USD with a 25-pip SL and 10 USD per pip per lot:</p><p><code>Lots = 20 ÷ (25 × 10) = 0.08 lot</code></p>' +
        '[[mt5:order2]]<h2>What happens when the SL changes?</h2><p>If the SL is twice as wide (50 pips) the size is halved (0.04 lot) so the risk stays 20 USD. This is why the SL must be placed according to market structure first, and the size calculated afterwards – not the other way round.</p>' +
        h.tip('Use the tool on this site', 'Open <a href="#/cong-cu">Tools</a> to calculate automatically. JPY pairs have a different pip value – the tool already handles it.') +
        h.warn('Don’t “raise the lot to recover”', 'Doubling your size after a losing streak to win it back is the road to a blown account.'),
      key: ['Lots = risk amount ÷ (SL pips × pip value).', 'Place the SL by the market, then size by the SL.', 'Never increase lots to recover losses.'],
      quiz: [{ q: 'Capital 1,000 USD, 1% risk, 20-pip SL, 10 USD/pip/lot. What is the size?', o: ['0.05 lot', '0.5 lot', '5 lots'], w: '10 ÷ (20 × 10) = 0.05 lot.' },
             { q: 'If the SL becomes twice as wide and you want the same money risk, the size should?', o: ['Double', 'Halve', 'Stay the same'], w: 'Risk = lots × SL × pip value, so lots are inversely proportional to SL.' }] },

    '5-3': { title: 'R:R and expectancy',
      body: '<p><strong>R:R</strong> (Risk:Reward) compares the possible loss with the possible gain. If SL = 20 pips and TP = 60 pips, R:R = 1:3.</p>' + rr +
        '<h2>Break-even win rate</h2><table><thead><tr><th>R:R</th><th>Win rate needed to break even</th></tr></thead><tbody><tr><td>1:1</td><td>50%</td></tr><tr><td>1:2</td><td>33.3%</td></tr><tr><td>1:3</td><td>25%</td></tr></tbody></table>' +
        '<h2>Expectancy</h2><p><code>Expectancy = (Win rate × R:R) – Loss rate</code> (in R). Example with a 40% win rate and R:R = 2: <code>0.4×2 – 0.6 = +0.2R</code> per trade. Over the long run, only a system with positive expectancy makes money.</p>' +
        h.tip('Try it', 'Use the “Expectancy” calculator in <a href="#/cong-cu">Tools</a> to try different combinations.') +
        h.warn('Don’t over-optimise', 'A high R:R with a TP that is too far away lowers the win rate. Verify with your own data.'),
      key: ['R:R = potential gain ÷ potential loss.', 'The higher the R:R, the lower the win rate needed to break even.', 'Positive expectancy is required for long-term profit.'],
      quiz: [{ q: 'With R:R = 1:2, the break-even win rate is roughly?', o: ['33%', '50%', '75%'], w: '1 ÷ (1+2) = 33.3%.' },
             { q: 'A 40% win rate with R:R 1:2: expectancy per trade?', o: ['+0.2R', '-0.2R', '0'], w: '0.4×2 – 0.6 = +0.2.' }] },

    '5-4': { title: 'Drawdown, losing streaks and diversifying risk',
      body: '<p><strong>Drawdown</strong> is the fall in equity from peak to trough. Every system has drawdowns – what matters is whether you can endure them.</p>' +
        I18N.fig.drawdown({"aria":"An equity curve with a peak, a trough and the drawdown","peak":"Equity peak","trough":"Equity trough","dd":"Drawdown","rec":"Recovery","cap":"Drawdown is the fall from the equity peak to the trough. Every system has drawdowns; what matters is that you can endure them."}) + '<h2>Losing streaks are normal</h2><p>With a 50% win-rate system, the chance of 5 losses in a row within 100 trades is significant. With a 40% win rate, a streak of 7–8 losses is not rare. If you risk 1% per trade, an 8-loss streak costs only about 8%.</p>' +
        '<h2>Correlation between pairs</h2><p>EUR/USD and GBP/USD usually move together; EUR/USD and USD/CHF usually move opposite. Opening 3 buys on pairs that move together is really <strong>one trade with triple the risk</strong>.</p>' +
        '<h2>What to do</h2><ul><li>Limit the number of simultaneous trades (e.g. max 3).</li><li>Total open risk ≤ 3–5% of capital.</li><li>Reduce size when drawdown passes 5–10%, and pause trading when it passes your preset limit.</li></ul>' +
        h.tip('Withdraw profits', 'Withdrawing part of your profit regularly turns numbers on a screen into reality and reduces psychological pressure.'),
      key: ['Drawdowns and losing streaks are normal.', 'Correlated pairs make risk add up.', 'Limit open trades and total risk.'],
      quiz: [{ q: 'You buy EUR/USD and GBP/USD at the same time with 1% risk each. The real risk is?', o: ['About 1%', 'Possibly close to 2% because of correlation', 'Zero'], w: 'The two pairs often move together, so they lose together.' },
             { q: 'What is drawdown?', o: ['The fall in equity from peak to trough', 'Monthly profit', 'An order type'], w: 'It measures the account’s maximum pain.' }] },

    /* ---------- Level 6 ---------- */
    '6-1': { title: 'Trading psychology: FOMO, revenge trading and greed',
      body: '<p>Your analysis can be right and emotion can still wreck the result. Learn to recognise the familiar “demons”:</p>' +
        '<ul><li><strong>FOMO</strong> (fear of missing out): entering late when price has already run.</li><li><strong>Revenge trading</strong>: placing a bigger trade to “win it back” after a loss.</li><li><strong>Greed</strong>: dropping the TP and raising the size while winning.</li><li><strong>Fear</strong>: taking profit too early or not entering despite a valid signal.</li><li><strong>Overconfidence</strong> after a winning streak.</li></ul>' +
        I18N.fig.cycle({"aria":"The vicious circle of revenge trading","nodes":[["A losing trade"],["Anger,","wanting it back now"],["A bigger trade,","plan abandoned"],["A bigger loss"]],"center":["The vicious","circle of revenge"],"cap":"How to break it: written rules, a daily loss limit and a break after 3 losses in a row."}) + '<h2>How to deal with it</h2><ol><li><strong>Written rules</strong> + a pre-trade checklist.</li><li><strong>Daily loss limit</strong>: when you hit it, stop.</li><li>After 3 losses in a row: take a break, no new trades for at least 1 hour.</li><li>Reduce size to reduce pressure – you will decide better.</li><li>Sleep well and exercise – psychology starts with your body.</li></ol>' +
        h.tip('Focus on process', 'Judge yourself by “did I follow the plan?” rather than “did this trade win or lose?”. A losing trade that followed the plan is a good trade.'),
      key: ['FOMO, revenge trading and greed are the most common psychological mistakes.', 'Written rules and daily loss limits hold emotions in check.', 'Judge by process, not by the result of each trade.'],
      quiz: [{ q: 'What is revenge trading?', o: ['Placing a big trade right after a loss to win it back', 'Trading to a plan', 'Using a demo'], w: 'It is emotional behaviour and usually loses even more.' },
             { q: 'What should you do after a series of consecutive losses?', o: ['Increase lots to recover', 'Rest and review your process', 'Remove the SL'], w: 'Stop so that you do not decide emotionally.' }] },

    '6-2': { title: 'The trading journal',
      body: '<p>A trading journal is the most powerful improvement tool and costs almost nothing. It turns experience into data.</p>' +
        '<h2>What to record</h2><table><thead><tr><th>Field</th><th>Example</th></tr></thead><tbody><tr><td>Date/time, pair, direction</td><td>03/12 20:15, EUR/USD, Buy</td></tr><tr><td>Reason for entry + chart screenshot</td><td>Pin bar at H4 support</td></tr><tr><td>Entry, SL, TP, size</td><td>1.0800 / 1.0775 / 1.0850 / 0.08</td></tr><tr><td>Result (R)</td><td>+2R</td></tr><tr><td>Emotions before/after</td><td>A bit rushed, entered early</td></tr><tr><td>Did you follow the plan?</td><td>Yes / No</td></tr></tbody></table>' +
        '[[mt5:history]]<h2>Weekly review</h2><ul><li>Which setup has the best expectancy?</li><li>Which hours/pairs make you lose the most?</li><li>What % of trades broke the plan? How much did they lose?</li></ul>' +
        h.tip('A simple tool', 'A spreadsheet is enough. The important thing is to record consistently and honestly.'),
      key: ['A journal turns experience into data you can improve on.', 'Record the reason, result in R and emotions.', 'Review it every week to find weaknesses.'],
      quiz: [{ q: 'Why record your emotions in the journal?', o: ['To recognise emotional patterns behind mistakes', 'Just for decoration', 'No need'], w: 'Many repeated losses come from the same emotional state.' },
             { q: 'Which unit makes trade results easy to compare?', o: ['Money', 'Multiples of risk (R)', 'Number of candles'], w: 'R normalises trades of different sizes.' }] },

    '6-3': { title: '10 classic beginner mistakes',
      body: '<ol><li><strong>Using leverage and size that are too large</strong> for the capital.</li><li><strong>No stop loss, or deleting it</strong>.</li><li><strong>Overtrading</strong>.</li><li><strong>Martingale</strong> to win losses back.</li><li><strong>Changing strategy constantly</strong> after a few losses.</li><li><strong>Using too many indicators</strong>.</li><li><strong>Trading against the trend</strong>, trying to catch tops/bottoms.</li><li><strong>Trading big news</strong> without preparation.</li><li><strong>No journal</strong> and no review.</li><li><strong>Expecting to get rich quickly</strong>: depositing a little and demanding huge profit.</li></ol>' +
        I18N.fig.hub({"aria":"The ten beginner mistakes grouped into four categories","center":["10 classic","mistakes"],"items":[["Excessive risk","(mistakes 1, 2, 4)"],["Lack of discipline","(mistakes 3, 5, 9)"],["Flawed analysis","(mistakes 6, 7, 8)"],["Wrong expectations","(mistake 10)"]],"cap":"Grouped to be easy to remember: most mistakes come from excessive risk and a lack of discipline."}) + h.bad('Don’t believe income promises', 'Ads such as “10% a day”, “guaranteed profit” or “99% signals” are mostly scams or cherry-picked results.') +
        h.tip('How to survive the first year', 'Your goal in year one is to <em>not blow your account</em> and to learn the process. Profit is a by-product.'),
      key: ['Most mistakes come from excessive risk and a lack of discipline.', 'Don’t chase “miracle” strategies.', 'Goal for year one: survive and learn.'],
      quiz: [{ q: 'Which mistake is considered the most serious?', o: ['Using oversized lots without a stop loss', 'Using the wrong chart colour', 'Trading in the morning'], w: 'It is the leading cause of blown accounts.' },
             { q: 'A reasonable goal for the first year is?', o: ['Doubling capital every month', 'Not blowing the account and learning the process', 'Using maximum leverage'], w: 'Survive so that you can accumulate experience.' }] },

    '6-4': { title: 'From demo to a live account',
      body: I18N.fig.steps({"aria":"The three stages from demo to live trading","items":[["Learn and demo","1–3 months"],["Small live account","3–6 months"],["Controlled","scaling"]],"cap":"Only move to the next stage when you have a plan and follow it on at least 90% of trades."}) + '<h2>Stage 1: Learn and demo (1–3 months)</h2><ul><li>Finish the basic theory levels.</li><li>Choose one simple strategy and 1–2 pairs.</li><li>Trade the demo like real: real size, real SL.</li><li>Keep a journal of at least 50–100 trades.</li></ul>' +
        '<h2>Stage 2: A small live account (3–6 months)</h2><ul><li>Deposit an amount you <strong>can afford to lose completely</strong>.</li><li>Use very small size (micro lots) to get used to real-money emotions.</li><li>Risk 0.5–1% per trade.</li></ul>' +
        '<h2>Stage 3: Controlled scaling</h2><ul><li>Increase capital/size only after steady profit for several months.</li><li>Increase gradually, never suddenly after a winning streak.</li></ul>' +
        '<h2>“Ready” criteria</h2><ol><li>You have a written trading plan.</li><li>You have positive expectancy over a large enough sample on demo.</li><li>You follow the plan on ≥ 90% of trades.</li><li>You understand the maximum loss you can accept.</li></ol>' +
        h.warn('Demo does not reflect everything', 'A live account has slippage, real-money emotion and different pressure. Prepare yourself for that.'),
      key: ['Demo → small live account → controlled scaling.', 'Only use money you can lose completely.', 'Have a plan and follow it ≥ 90% before raising capital.'],
      quiz: [{ q: 'How much should you deposit into a live account?', o: ['Borrowed money to win quickly', 'An amount you can lose entirely without affecting your life', 'All of your savings'], w: 'Trading with money you cannot lose distorts your psychology.' },
             { q: 'When should you increase size?', o: ['Right after 2 winning trades', 'After steady results over several months', 'When you are in a good mood'], w: 'Scale on evidence, not on emotion.' }] },

    '6-5': { title: 'Recognising and avoiding Forex scams',
      body: '<p>Forex is full of scams, especially on social media. Equip yourself to recognise them:</p>' +
        '<h2>Warning signs</h2><ul><li><strong>Guaranteed returns</strong> or “guaranteed profit, guaranteed win”.</li><li><strong>VIP signal groups</strong> charging high fees and promising “follow the trades and make money”.</li><li><strong>An “expert” managing your account</strong> who asks for your password or for you to transfer money to a personal wallet/account.</li><li><strong>Unlicensed brokers</strong> or fake regulator licences.</li><li><strong>Pressure to deposit more</strong> to “unlock withdrawals” or “pay fees/taxes”.</li><li><strong>Fake romance</strong> online luring you into investing.</li></ul>' +
        I18N.fig.steps({"aria":"Four steps to protect yourself from Forex scams","items":[["Stop,","don’t rush"],["Verify the licence","on the regulator’s site"],["Test a small","withdrawal"],["Keep evidence,","report to authorities"]],"cap":"Anyone pressuring you to decide fast or to deposit more is a sign to stop."}) + '<h2>How to protect yourself</h2><ol><li>Check licences directly on the regulator’s website, not through links sent by strangers.</li><li>Test a small withdrawal before depositing a lot.</li><li>Never share your trading password.</li><li>Never transfer money to an individual to “trade for you”.</li><li>If you feel pressured to decide quickly – stop.</li></ol>' +
        h.bad('If you have already been scammed', 'Keep evidence (messages, transactions), contact your bank to block the funds if possible and report to the police. Beware of “fund recovery” services – they are often a second scam.'),
      key: ['No profit is guaranteed in Forex.', 'Verify the licence directly with the regulator.', 'Never transfer money or share passwords with others.'],
      quiz: [{ q: 'Which sign points to a likely scam?', o: ['A promise of fixed monthly returns', 'A broker publishing its spreads', 'A clear risk warning'], w: 'No one can guarantee returns in a financial market.' },
             { q: 'When asked to pay a “fee” to withdraw money, you should?', o: ['Pay it to withdraw quickly', 'Stop – you may be being scammed', 'Deposit double'], w: 'It is a common trick to take more money.' }] },

    /* ---------- Level 7 ---------- */
    '7-1': { title: 'Market structure and liquidity zones',
      body: '<p>Advanced traders see the market as a competition for <strong>liquidity</strong>: the stop losses of the crowd often sit just above obvious highs/below obvious lows – that is where large institutions can fill large orders.</p>' +
        '<h2>Market structure</h2><ul><li><strong>BOS</strong> (Break of Structure): a break in the direction of the trend – confirms continuation.</li><li><strong>CHoCH</strong> (Change of Character): a break against the trend – an early sign of reversal.</li></ul>' +
        '<h2>Liquidity sweep</h2><p>Price pokes beyond an old high/low to trigger stop losses and then reverses sharply. This is the mechanism behind many “false breakouts”.</p>' +
        '[[mt5:sweep]]<h2>Applying it</h2><ol><li>Identify the trend and the important highs/lows on a larger timeframe.</li><li>Wait for price to sweep liquidity into the zone of interest.</li><li>Look for signs of rejection (a rejection candle, a CHoCH on a small timeframe).</li><li>Enter and place the SL beyond the sweep point.</li></ol>' +
        h.note('Note', 'These concepts are a thinking framework used by many traders, not absolute laws. Verify them with your own data.'),
      key: ['Liquidity concentrates at obvious highs/lows.', 'BOS confirms continuation; CHoCH warns of reversal.', 'A liquidity sweep explains many false breakouts.'],
      quiz: [{ q: 'What does a CHoCH (Change of Character) warn of?', o: ['The trend may reverse', 'The trend will definitely continue', 'The spread widens'], w: 'A break against the trend is an early sign.' },
             { q: 'What is a liquidity sweep?', o: ['Price pokes beyond an old high/low to trigger stops, then reverses', 'The broker runs out of money', 'Price moves sideways'], w: 'It explains many false breakouts.' }] },

    '7-2': { title: 'Currency correlation and strength',
      body: '<p>Every pair is two currencies. To trade better, understand which currency is strong and which is weak.</p>' +
        '<h2>Finding the best pair</h2><p>Buy the strongest currency against the weakest. For example: USD strong, JPY weak → prefer buying USD/JPY rather than a pair where both currencies are neutral.</p>' +
        I18N.fig.corr({"aria":"Correlation of some pairs with EUR/USD","head":["Pair","When EUR/USD rises","Usual tendency"],"rows":[{"pair":"GBP/USD","dir":"up","text":"Usually moves with it"},{"pair":"AUD/USD","dir":"up","text":"Moves with it (risk sentiment)"},{"pair":"USD/CHF","dir":"down","text":"Usually moves opposite"}],"cap":"Correlations are not fixed; re-check them regularly and avoid opening several same-direction trades just because the pairs “look different”."}) + '<h2>The DXY index</h2><p>The DXY measures USD strength against a basket of major currencies (mostly EUR). A rising DXY usually pulls EUR/USD, GBP/USD and AUD/USD down, and vice versa.</p>' +
        '<h2>Commodity correlation</h2><ul><li>AUD, NZD and CAD are often sensitive to commodity prices and risk sentiment.</li><li>JPY and CHF are often safe havens.</li><li>USD/CAD often moves opposite to the oil price.</li></ul>' +
        h.warn('Correlations change', 'Correlations are not fixed; re-check them periodically and avoid opening multiple same-direction positions just because they “look different”.'),
      key: ['Trade a strong currency against a weak one.', 'The DXY reflects USD strength.', 'Correlations change and must be checked regularly.'],
      quiz: [{ q: 'When the DXY rises strongly, EUR/USD usually?', o: ['Falls', 'Rises', 'Is unrelated'], w: 'A stronger USD usually pushes EUR/USD down.' },
             { q: 'Which currency is often considered a safe haven?', o: ['AUD', 'JPY', 'NZD'], w: 'JPY and CHF often strengthen when markets fear risk.' }] },

    '7-3': { title: 'Backtesting and evaluating a strategy',
      body: '<p>Before using real money, prove with data that the strategy has an edge.</p>' +
        '<h2>Manual backtesting steps</h2><ol><li>Write the strategy rules clearly, without ambiguity.</li><li>Scroll the chart back and step forward candle by candle, looking only at data that was available.</li><li>Record every trade in a spreadsheet (entry, SL, TP, result in R).</li><li>Collect at least <strong>100 trades</strong> across different market phases.</li></ol>' +
        I18N.fig.steps({"aria":"Five steps to backtest a strategy","items":[["Write clear","rules"],["Scroll back,","step candle by candle"],["Record each","trade in R"],["Compute metrics,","at least 100 trades"],["Validate on","new data / demo"]],"cap":"The last step guards against overfitting: the strategy must also work on data you have never used."}) + '<h2>Metrics to check</h2><table><thead><tr><th>Metric</th><th>Meaning</th></tr></thead><tbody><tr><td>Win rate</td><td>% of winning trades</td></tr><tr><td>Expectancy (R)</td><td>Average profit per trade in R</td></tr><tr><td>Profit factor</td><td>Total gains ÷ total losses (&gt;1.5 is decent)</td></tr><tr><td>Max drawdown</td><td>The largest decline</td></tr><tr><td>Longest losing streak</td><td>The psychological endurance needed</td></tr></tbody></table>' +
        h.bad('Traps', '<strong>Overfitting</strong> (over-optimising to past data) and <strong>look-ahead bias</strong> make backtest results look great but useless live. Check on data you have not used (out-of-sample) and on demo.'),
      key: ['Backtest needs ≥ 100 trades and clear rules.', 'Look at expectancy, profit factor, drawdown and losing streak.', 'Avoid overfitting; validate on new data.'],
      quiz: [{ q: 'A reasonable minimum number of trades to evaluate a strategy?', o: ['5 trades', '20 trades', '100 trades or more'], w: 'Small samples easily give random results.' },
             { q: 'What is overfitting?', o: ['Over-optimising to the past so it fails live', 'Opening too many trades', 'Using too little capital'], w: 'The strategy “memorises” old data instead of capturing a real pattern.' }] },

    '7-4': { title: 'Building your own trading system',
      body: '<p>The end goal is a system that fits your personality, time and capital – not a copy of someone else’s.</p>' +
        '<h2>A 6-step framework</h2><ol><li><strong>Style</strong>: scalping / day / swing based on your free time and personality.</li><li><strong>Market</strong>: 1–3 pairs to understand deeply.</li><li><strong>Trend filter</strong>: for example the EMA 200 on a larger timeframe.</li><li><strong>Zone and entry signal</strong>: support/resistance + a candlestick pattern.</li><li><strong>Trade management</strong>: SL, TP, trailing, minimum R:R.</li><li><strong>Money management and journal</strong>.</li></ol>' +
        I18N.fig.steps({"aria":"Six steps to build your own trading system","items":[["Trading","style"],["Market","(1–3 pairs)"],["Trend","filter"],["Zone and","entry signal"],["Trade","management"],["Money and","journal"]],"cap":"A good system fits your personality, time and capital."}) + '<h2>A continuous improvement routine</h2><ul><li>Review the journal weekly and the metrics monthly.</li><li>Change only <strong>one variable</strong> at a time and verify.</li><li>Don’t change strategy because of a short losing streak.</li></ul>' +
        h.tip('A final word', 'Your edge is not a secret indicator but the discipline of executing repeatedly. Keep it simple, stay consistent and protect your capital above all.') +
        h.warn('A reminder', 'Trading Forex carries the risk of losing all your capital. Content at Forex Academy VN is for education only and is not investment advice.'),
      key: ['A good system fits your personality and time.', 'Keep it simple, consistent and change one variable at a time.', 'Discipline and capital protection are your biggest edge.'],
      quiz: [{ q: 'When improving a system, you should?', o: ['Change many things at once', 'Change one variable at a time and verify', 'Drop the journal'], w: 'Changing one variable shows what caused the change in results.' },
             { q: 'The biggest long-term edge of a trader is?', o: ['A secret indicator', 'Execution discipline and capital protection', 'High leverage'], w: 'Success comes from consistency.' }] }
  }});
})();
