/* English – Level 3 (Indicators) and Level 4 (Patterns & strategies) */
(function () {
  var h = I18N.h;
  var rr = h.rr({ aria: 'Diagram of a 1:2 reward-to-risk ratio', profit: 'Profit', risk: 'Risk', entry: 'Entry', tp: 'Take profit (+2R)', sl: 'Stop loss (-1R)', cap: 'R:R = 1:2 means accepting a loss of 1 part in the hope of making 2 parts.' });
  I18N.addPack('en', { lessons: {
    '3-1': { title: 'What are indicators? Using them properly',
      body: '<p>Technical indicators are mathematical formulas applied to price (and sometimes volume) to highlight trend, momentum and volatility. They <strong>do not predict the future</strong>; they only summarise the past in a particular way.</p>' +
        '<h2>Two main groups</h2><ul><li><strong>Lagging indicators</strong> such as MA and MACD: they confirm a trend but arrive late.</li><li><strong>Leading indicators</strong> such as RSI and Stochastic: they measure momentum and try to warn early but give many false signals.</li></ul>' +
        '[[mt5:addInd]]<h2>Principles of use</h2><ol><li>Pick <strong>2–3 indicators</strong> from different groups (trend + momentum + volatility).</li><li>Avoid several indicators of the same type – they give the same signal.</li><li>Price and market structure always come first.</li><li>Backtest before using them live.</li></ol>' +
        h.bad('The “holy grail” syndrome', 'Putting 10 indicators on a chart does not make you more accurate, only more confused and slower. No indicator is always right.'),
      key: ['Indicators describe the past, they do not predict the future.', 'Choose 2–3 indicators from different groups, not overlapping ones.', 'Price and structure matter more than indicators.'],
      quiz: [{ q: 'Which way of using indicators is more sensible?', o: ['Using 10 indicators at once', 'Using 2–3 indicators of different types', 'Only watching the indicator and ignoring price'], w: 'Indicators of the same type give duplicate signals.' },
             { q: 'Which group does MA belong to?', o: ['Lagging', 'Leading', 'Volume indicator'], w: 'MA is an average of the past, so it always lags.' }] },

    '3-2': { title: 'Moving averages: SMA and EMA',
      body: '<p>The <strong>SMA</strong> (Simple Moving Average) is the average closing price of the last N periods. The <strong>EMA</strong> (Exponential MA) is similar but gives more weight to recent prices, so it is more responsive.</p>' +
        '<h2>Common periods</h2><ul><li><strong>EMA 20/21</strong>: short-term trend, often the “pulse” of a trend.</li><li><strong>EMA/SMA 50</strong>: medium-term trend.</li><li><strong>SMA 200</strong>: the long-term trend boundary that many traders watch.</li></ul>' +
        '[[mt5:ma]]<h2>How to use them</h2><ul><li><strong>Trend filter</strong>: price above the MA200 → favour buys; below → favour sells.</li><li><strong>Dynamic support/resistance</strong>: in a strong trend, price often pulls back to the EMA 20/50 and continues.</li><li><strong>Crossovers</strong>: a fast EMA crossing above a slow EMA = bullish signal (Golden Cross with 50/200); crossing below = bearish (Death Cross).</li></ul>' +
        h.warn('MAs are poor in a sideways market', 'When price moves sideways, MAs get crossed back and forth and produce many false signals. Identify the trend context first.') +
        h.tip('The slope is information too', 'A steeply sloping MA = a strong trend; a flat MA with price crossing it back and forth = no trend.'),
      key: ['The EMA is more responsive than the SMA because it weights recent prices.', 'The MA200 is a popular long-term trend filter.', 'MAs perform poorly when the market moves sideways.'],
      quiz: [{ q: 'The main difference between EMA and SMA?', o: ['EMA gives more weight to recent prices', 'EMA is always more accurate', 'SMA is only for gold'], w: 'That is why the EMA reacts faster than the SMA.' },
             { q: 'When do MAs usually give many false signals?', o: ['In a strong trend', 'In a sideways market', 'When there is news'], w: 'Price crosses the MA back and forth when there is no trend.' }] },

    '3-3': { title: 'RSI – Relative Strength Index',
      body: '<p>The <strong>RSI</strong> (Relative Strength Index, standard period 14) oscillates between 0 and 100 and measures the speed and size of recent price changes.</p>' +
        '<h2>Basic reading</h2><ul><li><strong>RSI &gt; 70</strong>: “overbought” zone, the rally may be tiring.</li><li><strong>RSI &lt; 30</strong>: “oversold” zone, the decline may be tiring.</li><li><strong>The 50 line</strong>: divides buyers and sellers.</li></ul>' +
        h.warn('Overbought ≠ must sell', 'In a strong trend RSI can stay above 70 for a very long time. Selling only because RSI &gt; 70 is a classic mistake. Use RSI together with the trend context.') +
        '[[mt5:rsi]]<h2>Divergence</h2><p>When price makes a new, higher high but RSI makes a lower high, that is a <strong>bearish divergence</strong> – momentum is fading, warning of a possible reversal or pullback. The opposite is bullish divergence. Divergence is a warning signal, not an entry order.</p>' +
        '<h2>Practical use</h2><ul><li>In an uptrend RSI often swings between 40–80; the 40–50 area is where pullbacks are bought.</li><li>In a downtrend RSI often swings between 20–60.</li><li>In a sideways market 30/70 works better.</li></ul>',
      key: ['RSI ranges 0–100 with a standard period of 14.', 'Overbought/oversold does not equal a reversal.', 'Divergence warns of weakening momentum and needs more confirmation.'],
      quiz: [{ q: 'RSI above 70 during a strong uptrend means?', o: ['You must sell immediately', 'It can stay high for a while', 'Price will definitely fall'], w: 'RSI can “stick” in the overbought zone for a long time in a strong trend.' },
             { q: 'A bearish divergence happens when?', o: ['Price makes a higher high while RSI makes a lower high', 'Price and RSI rise together', 'RSI = 50'], w: 'Momentum weakens even though price is still rising.' }] },

    '3-4': { title: 'MACD',
      body: '<p>The <strong>MACD</strong> (Moving Average Convergence Divergence) has 3 parts with the standard settings (12, 26, 9):</p>' +
        '<ul><li><strong>MACD line</strong> = EMA12 – EMA26.</li><li><strong>Signal line</strong> = EMA9 of the MACD line.</li><li><strong>Histogram</strong> = MACD – Signal, showing momentum.</li></ul>' +
        '<h2>How to read it</h2><ul><li><strong>MACD crosses above Signal</strong>: momentum is rising; <strong>crosses below</strong>: momentum is falling.</li><li><strong>Crossing the 0 line</strong>: confirms the trend (above 0 leans bullish, below 0 bearish).</li><li><strong>A shrinking histogram</strong>: momentum is fading even if price has not turned.</li><li><strong>Divergence</strong> between MACD and price works like RSI.</li></ul>[[mt5:macd]]' +
        h.warn('MACD lags', 'MACD is built on moving averages so its crossovers often come late and are noisy in a sideways market. Use it to confirm a trend, not to guess tops and bottoms.') +
        h.tip('A sensible combination', 'EMA 200 to filter the trend + MACD to time entries in that direction is a simple, low-overlap combination.'),
      key: ['MACD = EMA12 – EMA26, Signal = EMA9 of MACD.', 'Crosses of the Signal line and the 0 line are the two key signals.', 'A lagging indicator, good for confirming trends.'],
      quiz: [{ q: 'A shrinking MACD histogram shows what?', o: ['Momentum is weakening', 'The trend is getting stronger', 'The broker has a bug'], w: 'The gap between MACD and Signal is getting smaller.' },
             { q: 'When does MACD perform worst?', o: ['In a clear trend', 'In a sideways market', 'On D1'], w: 'The lines keep crossing and create false signals.' }] },

    '3-5': { title: 'Bollinger Bands',
      body: '<p><strong>Bollinger Bands</strong> have 3 lines: the middle is a 20-period SMA, and the two outer bands sit 2 standard deviations above and below it. The bands widen when volatility rises and narrow when it falls.</p>' +
        '<h2>Ways to use them</h2><ul><li><strong>Squeeze</strong>: narrow bands signal consolidation, often before an expansion (direction unknown).</li><li><strong>Mean reversion</strong>: in a sideways market, price touching an outer band often returns to the middle line.</li><li><strong>Band walk</strong>: in a strong trend price hugs the upper/lower band – this is not a reversal signal.</li></ul>[[mt5:bb]]' +
        h.bad('A common mistake', 'Selling just because price touches the upper band. In a strong trend price can hug the upper band for many candles and hurt those who sell against the trend.') +
        h.tip('Combine', 'A squeeze followed by a breakout with a strong candle in the direction of the larger-timeframe trend is a setup many traders use.'),
      key: ['Bands = SMA 20 ± 2 standard deviations.', 'A squeeze signals low volatility before high volatility.', 'Touching a band is not a reversal signal in a strong trend.'],
      quiz: [{ q: 'Bollinger Bands narrowing (squeeze) usually signals?', o: ['Low volatility, a move may be coming', 'Price will definitely rise', 'The market is closed'], w: 'A squeeze shows low volatility, but not the direction.' },
             { q: 'Price hugging the upper band for many candles shows?', o: ['A strong uptrend', 'It will definitely reverse', 'The indicator is broken'], w: 'That is a band walk in a strong trend.' }] },

    '3-6': { title: 'Stochastic and ATR',
      body: '<h2>Stochastic Oscillator</h2><p>Stochastic compares the closing price to the high–low range of the last N periods (usually 14). It has a %K line (fast) and a %D line (slow), oscillates 0–100 and has zones at 80 (overbought) and 20 (oversold).</p>' +
        '<ul><li>More effective in a sideways market.</li><li>A %K/%D crossover in the overbought/oversold zone is a short-term reversal signal.</li><li>Like RSI, it can stay at extremes for a long time in a strong trend.</li></ul>[[mt5:stoch]]' +
        '<h2>ATR – Average True Range</h2><p>ATR measures <strong>average price volatility</strong> (not direction). An ATR(14) of 12 pips on EUR/USD H1 means each H1 candle moves about 12 pips on average.</p>' +
        '[[mt5:atr]]<h3>What is ATR used for?</h3><ul><li><strong>Setting stops by volatility</strong>: for example SL = 1.5 × ATR below entry instead of a fixed number of pips.</li><li><strong>Sizing trades</strong>: a wider SL means a smaller size so risk stays constant.</li><li>Telling whether the market is “hot” or “cold”.</li></ul>' +
        h.tip('A familiar formula', 'Size = Amount you will risk ÷ (SL in pips × pip value). Use the <a href="#/cong-cu">lot calculator</a> for quick work.'),
      key: ['Stochastic suits sideways markets, with 80/20 zones.', 'ATR measures volatility, not direction.', 'Use ATR to set stops and convert to a sensible trade size.'],
      quiz: [{ q: 'What does ATR tell you?', o: ['The direction price will take', 'The average volatility', 'The trading volume'], w: 'ATR only measures the size of moves.' },
             { q: 'What is the advantage of setting stops with ATR?', o: ['The SL adapts to market volatility', 'It is never hit', 'No analysis needed'], w: 'A more volatile market needs a wider SL and vice versa.' }] },

    '3-7': { title: 'Fibonacci retracement',
      body: '<p>The <strong>Fibonacci retracement</strong> tool divides a price swing into ratio levels to estimate where price may pull back before the trend resumes. The common levels are <strong>38.2% – 50% – 61.8%</strong> (and 78.6%).</p>' +
        '<h2>How to draw it</h2><ul><li>Uptrend: drag from the <strong>low</strong> of the up-swing to the <strong>high</strong>.</li><li>Downtrend: drag from the <strong>high</strong> down to the <strong>low</strong>.</li></ul>' +
        '[[mt5:fib]]<h2>Sensible use</h2><ol><li>Identify the main trend and a clear swing.</li><li>Wait for price to pull back to the 38.2–61.8% zone.</li><li>Look for <strong>confluence</strong> with support/resistance, an EMA or a trendline.</li><li>Enter when a confirmation candle appears; put the SL beyond the Fibonacci zone or the swing extreme.</li></ol>' +
        h.warn('Fibonacci is not magic', 'There are so many Fibonacci levels that price always “touches” one of them. The real value is in the confluence with other factors, not in the numbers alone.'),
      key: ['Main retracement levels: 38.2%, 50%, 61.8%.', 'Draw low to high (uptrend) or high to low (downtrend).', 'Only valuable when it coincides with other technical factors.'],
      quiz: [{ q: 'In an uptrend, how do you draw a Fibonacci retracement?', o: ['From the high down to the low', 'From the low up to the high', 'Either direction'], w: 'Drag from the low of the up-swing to its high.' },
             { q: 'Why look for confluence?', o: ['It raises reliability when several factors point to one zone', 'It reduces spread', 'There is no reason'], w: 'A lone Fibonacci level is not strong enough.' }] },

    /* ---------- Level 4 ---------- */
    '4-1': { title: 'Candlestick reversal patterns',
      body: '<p>Candlestick patterns are sets of 1–3 candles that reflect the fight between buyers and sellers. They are only reliable when they appear <strong>at key zones</strong> (support/resistance, EMA, Fibonacci).</p>' +
        '<h2>Candle types to recognise</h2>' + I18N.fig.patterns({"aria":"Common single candlestick types","cols":2,"items":[{"k":"marubozuUp","n":"Bullish Marubozu","s":"Buyers dominate"},{"k":"marubozuDown","n":"Bearish Marubozu","s":"Sellers dominate"},{"k":"spinning","n":"Spinning top","s":"Small body, indecision"},{"k":"doji","n":"Doji","s":"Open ≈ close, hesitation"},{"k":"hammer","n":"Hammer (bullish pin bar)","s":"Low prices rejected"},{"k":"shooting","n":"Shooting star (bearish pin bar)","s":"High prices rejected"}],"cap":"The shape of a candle shows who is in control: a long body means one side dominates, a long wick means price was rejected. Green candles are bullish, red candles are bearish."}) +
        '<h2>Candlestick reversal patterns</h2>' + I18N.fig.patterns({"aria":"Common candlestick reversal patterns","cols":2,"items":[{"k":"bullEng","n":"Bullish Engulfing","s":"Bullish reversal"},{"k":"bearEng","n":"Bearish Engulfing","s":"Bearish reversal"},{"k":"inside","n":"Inside bar","s":"Compression, wait for a break"},{"k":"morning","n":"Morning Star","s":"Bullish reversal (3 candles)"},{"k":"evening","n":"Evening Star","s":"Bearish reversal (3 candles)"},{"k":"tweezer","n":"Tweezer Bottom","s":"Equal lows, bullish reversal"}],"cap":"Faded candles are the prior trend; solid candles form the pattern. They only matter at key support/resistance zones."}) +
        '<table><thead><tr><th>Pattern</th><th>Description</th><th>Meaning</th></tr></thead><tbody><tr><td>Pin bar / Hammer</td><td>Small body, long wick on one side (≥ 2× the body)</td><td>Strong price rejection at a level</td></tr><tr><td>Bullish/Bearish Engulfing</td><td>The later body “swallows” the earlier body</td><td>The opposing side reverses the situation</td></tr><tr><td>Doji</td><td>Open ≈ close</td><td>Indecision, wait for confirmation</td></tr><tr><td>Morning/Evening Star</td><td>3 candles: down – small – up (and the reverse)</td><td>Reversal after a trend</td></tr><tr><td>Inside bar</td><td>A candle fully inside the previous candle</td><td>Range compression, waiting for a break</td></tr></tbody></table>' +
        '[[mt5:pin]]<h2>The routine: “entering on a candlestick pattern”</h2><ol><li>Identify the trend and key zones on the larger timeframe.</li><li>Wait for the pattern to appear <em>at that zone</em>.</li><li>Enter after the pattern candle closes.</li><li>SL beyond the candle’s wick; TP at the opposite zone or with R:R ≥ 1:2.</li></ol>' +
        h.bad('Don’t enter just because you see a pattern', 'A pin bar in empty space means nothing. Context decides the value of a pattern.'),
      key: ['Candlestick patterns matter only at key price zones.', 'Pin bar and Engulfing are the two most common patterns.', 'Enter after the pattern candle has closed.'],
      quiz: [{ q: 'When is a candlestick pattern most reliable?', o: ['Anywhere it appears', 'At a key support/resistance zone', 'Only on M1'], w: 'Context decides the meaning of a pattern.' },
             { q: 'What is a Bullish Engulfing?', o: ['A bullish candle whose body engulfs the previous bearish body', 'A doji candle', 'Two bullish candles in a row'], w: 'It shows buyers have taken back control.' }] },

    '4-2': { title: 'Classic chart patterns',
      body: '<p>Chart patterns form from many candles and reflect accumulation or distribution before a move. They fall into two groups:</p>' +
        '<h2>Reversal patterns</h2><ul><li><strong>Double Top / Double Bottom</strong>: price fails twice to break a zone; enter when the “neckline” breaks.</li><li><strong>Head and Shoulders</strong>: three peaks with the middle one highest; a break of the neckline confirms a bearish reversal. The inverted version (Inverse Head and Shoulders) is a bullish reversal pattern.</li></ul>' +
        '<h2>Continuation patterns</h2><ul><li><strong>Flag and Pennant</strong>: a short pullback after a strong run, expecting the trend to continue.</li><li><strong>Triangle</strong>: the range narrows; the breakout is usually in the direction of the previous trend.</li><li><strong>Rectangle</strong>: price moves sideways in a range then continues.</li></ul>' +
        '[[mt5:doubleTop]]<h2>Price targets (measured move)</h2><p>For most patterns the minimum target is measured by the pattern’s height, projected from the breakout point. For example a Double Top 100 pips tall → a target about 100 pips below the neckline.</p>' +
        h.warn('Patterns can fail', 'Wait for a <strong>close beyond the breakout</strong> before entering, and always use a stop loss. A pattern that is not complete is not yet a pattern.'),
      key: ['Double top/bottom and Head & Shoulders are reversal patterns.', 'Flags and triangles are continuation patterns.', 'Wait for a closing breakout and set a stop loss on every trade.'],
      quiz: [{ q: 'Which pattern is usually a continuation pattern?', o: ['Double top', 'Flag', 'Head and Shoulders'], w: 'A flag is a short pause before the trend continues.' },
             { q: 'How is a pattern’s price target usually measured?', o: ['By the pattern’s height projected from the breakout', 'Always 10 pips', 'It cannot be measured'], w: 'That is the common measured-move method.' }] },

    '4-3': { title: 'Pure price action',
      body: '<p><strong>Price action</strong> is a way of trading based mainly on raw price behaviour: candles, structure, support and resistance, with almost no indicators. Its strength is that it is clean and has no lag.</p>' +
        '<h2>Core elements</h2><ol><li><strong>Market structure</strong>: HH–HL or LH–LL.</li><li><strong>Key price zones</strong> on larger timeframes.</li><li><strong>Candle signals</strong> at the zone (pin bar, engulfing, inside bar).</li><li><strong>Trade management</strong>: SL, TP, R:R.</li></ol>' +
        I18N.fig.equation({"aria":"A good price-action setup combines trend, price zone and candle signal","items":[["Higher-timeframe","trend"],["Key","price zone"],["Candle","confirmation"]],"result":["Quality","setup"],"cap":"If one of the three is missing, don’t rush into a trade."}) + '<h2>Example of a with-trend setup</h2><ul><li>D1: a clear uptrend (HH–HL).</li><li>H4: price pulls back to an old resistance that has become support.</li><li>H1: a bullish pin bar appears at that zone.</li><li>Buy after the candle closes, SL under the wick, TP at the nearest high or R:R ≥ 1:2.</li></ul>' +
        h.tip('Few but high quality', 'Good price-action trading usually has just 1–3 setups a day. Waiting is part of the skill.'),
      key: ['Price action relies on candles, structure and price zones.', 'A good setup needs trend + zone + candle signal.', 'Be patient and wait for quality setups.'],
      quiz: [{ q: 'The three core elements of a with-trend price-action setup are?', o: ['Trend, price zone, candle signal', 'Rumours, emotion, large volume', 'Indicator 1, 2, 3'], w: 'Context – zone – trigger.' },
             { q: 'How many setups per day does good price-action trading usually have?', o: ['Many, 20+', 'Few and selective', 'Always exactly 10'], w: 'Waiting for quality beats entering constantly.' }] },

    '4-4': { title: 'Trend-following strategy',
      body: '<p>The most familiar strategy: find the trend and enter in its direction when price pulls back.</p>' +
        '<h2>Example: EMA 50 + pullback</h2><ol><li><strong>Filter</strong>: price above the EMA 200 (H4) → only look for buys.</li><li><strong>Entry zone</strong>: price pulls back to the EMA 50 or a confluent support zone.</li><li><strong>Trigger</strong>: a bullish reversal candle (pin bar/engulfing) at that zone.</li><li><strong>SL</strong>: below the low of the pullback (or 1.5 × ATR).</li><li><strong>TP</strong>: the nearest high, or trail with the EMA.</li></ol>' +
        '[[mt5:tradeSetup]]<h2>Managing the trade within the trend</h2><ul><li>Take partial profit at 1R and move the SL to breakeven.</li><li>Trail the SL under each new low.</li><li>Accept many small losers to catch a few big winners.</li></ul>' +
        h.note('A psychological trait', 'Trend following often has a 35–45% win rate but a high R:R. You need to be able to live with losing streaks.') + rr,
      key: ['Filter the trend, wait for the pullback, enter on a candle signal.', 'A low win rate with a high R:R is normal.', 'Take partials and move the SL to protect profit.'],
      quiz: [{ q: 'A trend-following strategy typically has which trait?', o: ['A low-to-medium win rate but a high R:R', 'It always wins 90%', 'It needs no SL'], w: 'Profit comes from a few big winners.' },
             { q: 'What is the purpose of moving the SL to breakeven?', o: ['To remove the risk on a trade that is in profit', 'To increase size', 'To avoid the spread'], w: 'It protects a winning trade from turning into a loss.' }] },

    '4-5': { title: 'Breakout and range trading strategies',
      body: '<h2>Breakout trading</h2><p>When price moves sideways for a while and then leaves the range, it often produces a strong move. Routine:</p><ol><li>Identify a clear consolidation zone (at least 2 touches on each side).</li><li>Wait for a candle to <strong>close</strong> outside the zone, preferably a long-bodied one.</li><li>Enter in the breakout direction or wait for a <strong>retest</strong>.</li><li>SL inside the consolidation; target equal to the range height.</li></ol>' +
        h.warn('False breakouts', 'Most breakouts in thin liquidity are false. Prefer breakouts during the London/New York sessions that are in line with the larger-timeframe trend.') +
        '[[mt5:breakout]]<h2>Range trading</h2><p>When price swings between clear support and resistance, buy near support and sell near resistance.</p><ul><li>Buy at support when a reversal candle signal appears; SL below support.</li><li>Sell at resistance; SL above resistance.</li><li>Target: the middle of the range or the opposite zone.</li></ul>' +
        h.bad('A range strategy fails when the range breaks', 'Always put the SL outside the range, and stop range trading when the market turns into a trend.'),
      key: ['Breakout: wait for a closing break outside the zone, ideally a retest.', 'Range: buy support, sell resistance, SL outside the range.', 'Recognise early when the market changes state.'],
      quiz: [{ q: 'How do you reduce the risk of a false breakout?', o: ['Enter as soon as price touches', 'Wait for a candle close or a retest', 'Remove the SL'], w: 'Confirmation lowers the chance of falling into the trap.' },
             { q: 'When should range trading stop?', o: ['When price breaks the range and starts trending', 'When a doji appears', 'Never'], w: 'A broken range means the strategy no longer fits the context.' }] },

    '4-6': { title: 'Building a trading plan',
      body: '<p>A trading plan is a written set of rules that helps you act on logic instead of emotion. It is the difference between gambling and systematic trading.</p>' +
        I18N.fig.hub({"aria":"The six components of a trading plan","center":["Trading","plan"],"items":[["Goals","and timeframe"],["Pairs","and trading hours"],["Entry","conditions"],["Exit","rules"],["Money management,","loss limits"],["Journal","after each trade"]],"cap":"Write these six parts down and use them as a checklist before every trade."}) + '<h2>A plan should include</h2><ul><li><strong>Goals and timeframe</strong> that are realistic (e.g. capital preservation first in year one).</li><li><strong>Pairs and trading hours</strong>.</li><li><strong>Clear entry conditions</strong> (trend + zone + signal).</li><li><strong>Exit rules</strong>: SL, TP, trailing.</li><li><strong>Money management</strong>: % risk per trade, maximum number of trades, daily/weekly loss limits.</li><li><strong>A post-trade routine</strong>: journaling.</li></ul>' +
        '<h2>Pre-trade checklist</h2><ol><li>Higher-timeframe trend?</li><li>A key price zone?</li><li>A confirmation signal?</li><li>R:R at least 1:2?</li><li>Risk ≤ 1% of capital?</li><li>Any big news coming?</li></ol>' +
        h.tip('Write it down', 'A plan that is not written down is just an intention. Print the checklist and put it next to your screen.'),
      key: ['A trading plan removes emotional decisions.', 'It covers entries, exits, money management and the journal.', 'Use a checklist before every trade.'],
      quiz: [{ q: 'The main purpose of a trading plan?', o: ['To act on rules instead of emotions', 'To advertise', 'To increase leverage'], w: 'Discipline comes from rules set in advance.' },
             { q: 'Which component is a must-have?', o: ['Money-management rules', 'Chart colours', 'The broker’s name'], w: 'Money management decides long-term survival.' }] }
  }});
})();
