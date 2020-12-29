import React, { Component } from 'react';
import { Col, ListGroup, Row, Badge, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import TotalBayar from './TotalBayar';
import ModalKeranjang from './ModalKeranjang';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            alamat: '',
            totalHarga: 0,
        };
    }

    // modal dikeranjang sebelum bayar
    handleShow = (barangKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: barangKeranjang,
            jumlah: barangKeranjang.jumlah,
            alamat: barangKeranjang.alamat,
            totalHarga: barangKeranjang.total_harga
        });
    };

    handleClose = () => {
        this.setState({
            showModal: false
        });
    };

    // User menambah jumlah barang dikeranjang
    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah + 1,
            totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah + 1)
        });
    };

    // User mengurangi jumlah barang dikeranjang
    kurang = () => {
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah - 1,
                totalHarga: this.state.keranjangDetail.product.harga * (this.state.jumlah - 1)
            });
        }
    };

    changeHandler = (event) => {
        this.setState({
            alamat: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.handleClose();

        const data = {
            jumlah: this.state.jumlah,
            total_harga: this.state.totalHarga,
            product: this.state.keranjangDetail.product,
            alamat: this.state.alamat
        };

        // User update pesanan dikeranjang
        axios.put(API_URL + "keranjangs/" + this.state.keranjangDetail.id, data)
            .then((res) => {
                this.props.getListKeranjang();
                swal({
                    title: "Pesanan Di Update!",
                    text: "Sukses Update Pesanan " + data.product.nama,
                    icon: "success",
                    button: false,
                    timer: 1500,
                });
            })
            .catch(error => {
                console.log("Error ya", error);
            });
    }

    // User menghapus pesanan dikeranjang
    hapusPesanan = (id) => {

        this.handleClose();

        axios.delete(API_URL + "keranjangs/" + id)
            .then((res) => {
                this.props.getListKeranjang();
                swal({
                    title: "Pesanan Dihapus !",
                    text: "Sukses Hapus Pesanan " + this.state.keranjangDetail.product.nama,
                    icon: "success",
                    button: false,
                    timer: 1500,
                });
            })
            .catch(error => {
                console.log("Error ya", error);
            });
    }

    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} className="mt-3">
                <h4>
                    <strong>Hasil</strong>
                </h4>
                <hr />
                {keranjangs.length !== 0 && (
                    <Card className="overflow-auto hasil">
                        <ListGroup variant="flush">
                            {keranjangs.map(((barangKeranjang) => (
                                <ListGroup.Item key={barangKeranjang.id} onClick={() => this.handleShow(barangKeranjang)}>
                                    <Row>
                                        <Col xs={2}>
                                            <h4>
                                                <Badge pill variant="success">
                                                    {barangKeranjang.jumlah}
                                                </Badge>
                                            </h4>
                                        </Col>
                                        <Col>
                                            <h5>{barangKeranjang.product.nama}</h5>
                                            <p>Rp. {numberWithCommas(barangKeranjang.product.harga)}</p>
                                        </Col>
                                        <Col>
                                            <strong className="float-right">Rp. {numberWithCommas(barangKeranjang.total_harga)} </strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )))}

                        </ListGroup>
                    </Card>
                )}
                <TotalBayar keranjangs={keranjangs} {...this.props} />

                <ModalKeranjang
                    handleClose={this.handleClose}
                    {...this.state}
                    tambah={this.tambah}
                    kurang={this.kurang}
                    changeHandler={this.changeHandler}
                    handleSubmit={this.handleSubmit}
                    hapusPesanan={this.hapusPesanan}
                />
            </Col>
        )
    }
}
