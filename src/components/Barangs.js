import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';

const Barangs = ({ barang, masukKeranjang }) => {
    return (
        <Col md={4} xs={6} className="mb-4">
            <Card className="shadow" onClick={() => masukKeranjang(barang)}>
                <Card.Img 
                variant="top" 
                src={
                    "assets/images/" + 
                    barang.category.nama.toLowerCase() + 
                    "/" + 
                    barang.gambar
                    }/>
                <Card.Body>
                    <Card.Title>{barang.nama} <strong>({barang.kode})</strong></Card.Title>
                    <Card.Text>
                        Rp. {numberWithCommas(barang.harga)}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Barangs
