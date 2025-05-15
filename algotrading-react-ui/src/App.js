import Container from "./common/container";
import CardHeader from "./common/card-header";
import Card from "./common/card";
import CardBody from "./common/card-body";
import Column from "./common/column";
import Row from "./common/row";
import SelectBox from "./common/select-box";
import {useEffect, useState} from "react";
import Button from "./common/button";
import io from "socket.io-client";
import Table from "./common/table";
import TableHead from "./common/table-head";
import TableBody from "./common/table-body";
import {Line} from "react-chartjs-2";
import {
    CategoryScale,
    Tooltip,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title
} from "chart.js";

const socket = io("ws://localhost:5555");
const options = {
    responsive: false,
    animation: false,
    maintainAspectRatio: true,
    scales: {
        y: {
            type: 'linear',
            position: 'left',
            stack: 'demo',
            stackWeight: 2
        }
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'BINANCE Market Data',
        }
    }
};
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function App() {
    const [windowSize, setWindowSize] = useState(25);
    const [symbol, setSymbol] = useState("BTCUSDT");
    const [connected, setConnected] = useState(false);
    const [trades, setTrades] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'BTC-USDT Price',
            fill: false,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderDashOffset: 0.0,
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: []
        }]
    });

    useEffect(() => {
        socket.on("ticker", (trade) => {
            let newTrades = [...trades, trade];
            if (newTrades.length >= windowSize) {
                newTrades = newTrades.slice(newTrades.length - windowSize);
            }
            setTrades(newTrades);
            const newChartData = {...chartData};
            newChartData.datasets = [...chartData.datasets];
            newChartData.labels = [...newChartData.labels, trade.timestamp];
            newChartData.datasets[0].data = [...newChartData.datasets[0].data, trade.price];
            if (newChartData.labels.length >= windowSize) {
                newChartData.labels = newChartData.labels.slice(newChartData.labels.length - windowSize);
            }
            if (newChartData.datasets[0].data.length >= windowSize) {
                newChartData.datasets[0].data = newChartData.datasets[0].data.slice(newChartData.datasets[0].data.length - windowSize);
            }
            setChartData(newChartData);
        })
    }, [trades, windowSize,chartData]);
    const disconnect = () => {
        setConnected(false);
    }
    return (
        <Container>
            <Card>
                <CardHeader title={"Market"}></CardHeader>
                <CardBody>
                    <Row>
                        <Column>
                            <SelectBox label={"Window Size"}
                                       options={[25, 50, 100, 250]}
                                       id={"window-size"}
                                       value={windowSize}
                                       handleChange={(event) => setWindowSize(Number(event.target.value))}></SelectBox>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <SelectBox label={"Market"}
                                       options={["BTCUSDT", "ETHBTC", "LTCBTC"]}
                                       id={"market"}
                                       value={symbol}
                                       handleChange={(event) => setSymbol(event.target.value)}></SelectBox>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            {connected && <Button color={"bg-danger"} click={disconnect} label={"Disconnect"}></Button>}
                            {!connected && <Button color={"bg-success"} label={"Connect"}></Button>}
                        </Column>
                    </Row>
                </CardBody>
                <p></p>
            </Card>
            <p></p>
            <Card>
                <CardHeader title={"Chart"}/>
                <CardBody>
                    <Line data={chartData}
                          width={1080}
                          height={640}
                          options={options}></Line>
                </CardBody>
            </Card>
            <p></p>
            <Card>
                <CardHeader title={"Trades"}/>
                <CardBody>
                    <Table>
                        <TableHead columns={["symbol", "price", "quantity", "timestamp"]}></TableHead>
                        <TableBody values={trades} fields={["symbol", "price", "quantity", "timestamp"]}></TableBody>
                    </Table>
                </CardBody>
            </Card>

        </Container>
    )
        ;
}

export default App;
