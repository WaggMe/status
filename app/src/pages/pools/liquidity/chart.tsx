import 'react-vis/dist/style.css';
import {
  XYPlot,
  VerticalGridLines,
  HorizontalGridLines,
  XAxis,
  YAxis,
  LineMarkSeriesPoint,
  MarkSeries,
  LineSeries,
  LineSeriesPoint,
} from 'react-vis';
import { useEffect, useState } from 'react';
import { readBids, readOffers, readTransactions } from './helpers';

export default function Chart() {
  const [bids, setBids] = useState<LineMarkSeriesPoint[]>([]);
  const [offers, setOffers] = useState<LineMarkSeriesPoint[]>([]);
  const [buys, setBuys] = useState<LineMarkSeriesPoint[]>([]);
  const [sells, setSells] = useState<LineMarkSeriesPoint[]>([]);

  useEffect(() => {
    async function fetchData() {
      const newOffers = await readOffers();
      const newBids = await readBids();
      const [newBuys, newSells] = await readTransactions();
      setOffers(newOffers);
      setBids(newBids);
      setBuys(newBuys);
      setSells(newSells);
    }

    fetchData()
      .then()
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <XYPlot height={400} width={1200}>
        <LineSeries data={bids as LineSeriesPoint[]} getNull={(d) => d.y !== null} color="blue" />
        <LineSeries data={offers as LineSeriesPoint[]} getNull={(d) => d.y !== null} color="blue" />
        <MarkSeries data={sells} getNull={(d) => d.y !== null} color="red" />
        <MarkSeries data={buys} getNull={(d) => d.y !== null} color="green" />
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
}