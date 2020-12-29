import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Hasil, ListCategories, Barangs } from '../components';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      barangs: [],
      categoriYangDipilih: 'Totebag',
      keranjangs: []
    };
  };

  componentDidMount() {
    axios.get(API_URL + "products?category.nama=" + this.state.categoriYangDipilih)
      .then(res => {
        const barangs = res.data;
        this.setState({barangs});
      })
      .catch(error => {
        console.log("Error ya", error);
      });

      this.getListKeranjang();
  }

  getListKeranjang = () => {
    axios.get(API_URL + "keranjangs")
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(error => {
        console.log("Error ya", error);
      });
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      barangs: []
    })

    axios.get(API_URL + "products?category.nama=" + value)
      .then(res => {
        const barangs = res.data;
        this.setState({ barangs });
      })
      .catch(error => {
        console.log("Error ya", error);
      })

  }

  masukKeranjang = (value) => {

    axios.get(API_URL + "keranjangs?product.id=" + value.id)
      .then(res => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };

          axios.post(API_URL + "keranjangs", keranjang)
            .then((res) => {
              this.getListKeranjang();
              swal({
                title: "Sukses Masuk Keranjang !",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch(error => {
              console.log("Error ya", error);
            });
        } else {

          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };

          axios.put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
              swal({
                title: "Sukses Masuk Keranjang !",
                text: "Sukses Masuk Keranjang " + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error ya", error);
            });

        }
      })
      .catch((error) => {
        console.log("Error ya", error);
      });
  };


  render() {
    const { barangs, categoriYangDipilih, keranjangs } = this.state
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} categoriYangDipilih={categoriYangDipilih} />
              <Col className="mt-3">
                <h4><strong>Daftar Produk</strong></h4>
                <hr />
                <Row className="overflow-auto barang">
                  {barangs && barangs.map((barang) => (
                    <Barangs
                      key={barang.id}
                      barang={barang}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil 
              keranjangs={keranjangs} 
              {...this.props}
              getListKeranjang={this.getListKeranjang}
              />
            </Row>
          </Container>
        </div>
    )
  }
}

