import { useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import PaymentService from "../../services/PaymentService";

export default function PointPurchasePage() {
  var IMP = window.IMP;
  IMP.init("imp44005021"); // merchantID

  useEffect(() => {}, []);

  function handlePay(points) {
    PaymentService.initPayment(points).then((resp) => {
      if (resp.status === 201) {
        const { orderId, amount } = resp.data;

        IMP.request_pay(
          {
            pg: "html5_inicis",
            pay_method: "card",
            merchant_uid: orderId,
            name: "Norway swivel chair",
            amount: amount,
            buyer_email: "johndoe@gmail.com",
            buyer_name: "John Doe",
            buyer_tel: "010-4242-4242",
            buyer_addr: "Shinsa-dong, Gangnam-gu, Seoul",
            buyer_postcode: "01181",
          },
          (rsp) => {
            if (rsp.success) {
              PaymentService.finishPayment({}).then((resp) => {
                if (resp.status === 200) {
                  console.log("Purchase is completed.");
                }
              });
            } else {
              console.log("payment failed");
            }
          }
        );
      }
    });
  }

  return (
    <Container>
      보유 포인트 10000P aaaaa
      <ul>
        <li>견적서 전달 시 건당 300P 차감</li>
        <li>업체 메뉴 30일 이용 100,000P 차감</li>
      </ul>
      <hr />
      <Button variant="outline-primary" onClick={() => handlePay(5000)}>
        {" "}
        5000 Point | 5000원
      </Button>
      <Button variant="outline-primary"> 10000 Point | 10000원</Button>
      <Button variant="outline-primary"> 30000 Point | 30000원</Button>
      <Button variant="outline-primary"> 50000 Point | 50000원</Button>
      <Button variant="outline-primary"> 100000 Point | 100000원</Button>
    </Container>
  );
}
