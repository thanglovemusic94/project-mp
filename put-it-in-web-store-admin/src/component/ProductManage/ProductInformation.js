import { useEffect, useState } from 'react';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { ListImage, ImageItem } from '../common/ListImageSection';
import { ProductService } from "./../../services/product.service";
import StorageSize from "./../common/StorageSize";
import Currency from "./../common/Currency";

var style = { image : {width:"120px"}}

export default function ProductInformation(props) {

    const [data, setData] = useState(undefined)
    const history = useHistory();

    useEffect(() => {
        var { id } = props.match.params
        if (id) {
            ProductService.detail(id).then((response) => {
                setData(response.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [props.match.params])

    function handleDelete() {
        swal({
            // title: "Are you sure?",
            text: "Are you sure you want to delete this item? Data cannot be recovered when deleted.",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    history.push("/product/management" + data.id)
                }
            });
    }

    function handleEdit() {
        var { id } = props.match.params
        history.push("/product/edit/" + id)
    }

    return (
        <main>
            <div className="container-fluid">
                <h4 className="mt-5 mb-3">Product information</h4>
                <div>
                    <Form>
                        {(data) &&
                            <div className="table-form table">
                                <Table bordered>
                                    <thead>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td width='220px'>Brand Name</td>
                                            <td>{data.brandName}</td>
                                        </tr>
                                        <tr>
                                            <td>Branch Name</td>
                                            <td>{data.branchName}</td>
                                        </tr>
                                        <tr>
                                            <td>Product Code</td>
                                            <td>{data.code}</td>
                                        </tr>
                                        <tr>
                                            <td>Product Name</td>
                                            <td>{data.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Product Pictogram</td>
                                            <td>
                                                <ImageItem src={data.pictogram.url} style={style.image}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Product Representative Photo</td>
                                            <td>
                                                <ImageItem src={data.mainPhoto} style={style.image}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Product Additional Photos</td>
                                            <td>
                                                <ListImage data={data.subPhoto} style={style.image}/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Product Size</td>
                                            <td><StorageSize size={data.size}></StorageSize></td>
                                        </tr>
                                        <tr>
                                            <td>Product Price</td>
                                            <td><Currency amount={data.price}></Currency></td>
                                        </tr>
                                        <tr>
                                            <td>Product discount by usage</td>
                                            <td><SectionPeriodDiscount periodDiscount={data.periodDiscount} /></td>
                                        </tr>
                                        <tr>
                                            <td>Product deposit</td>
                                            <td><Currency amount={data.deposit}></Currency></td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        }
                        <Row>
                            <Col>
                                <div className="float-left">
                                    <Link to="/product/management"><Button variant="secondary" size="sm">To the list</Button></Link>
                                </div>
                            </Col>
                            <Col>
                                {(data) &&
                                    <div className="float-right">
                                        <Button variant="danger" size="sm" onClick={handleDelete}>Delete</Button>
                                        &nbsp;
                                        <Button variant="secondary" size="sm" onClick={handleEdit}>Edit</Button>
                                    </div>
                                }
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </main>
    )
}

function SectionPeriodDiscount(props) {
    var { periodDiscount } = props
    return (
        <div>
            {
                (periodDiscount) &&
                <table>
                    <tbody>
                        <tr>
                            <td>Usage period</td>
                            <td>Discount rate</td>
                        </tr>
                        {periodDiscount.map((item, index) =>
                        (<tr key={index}>
                            <td>{item.monthAmount} &nbsp; {(item.monthAmount === 1) ? 'month' : 'months'} or more</td>
                            <td>{item.discountPercentage} &nbsp; %</td>
                        </tr>)
                        )}
                    </tbody>
                </table>
            }
        </div>
    )
}