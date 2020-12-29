import React, { Component } from 'react';
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constants';

export default class Success extends Component {
    
    componentDidMount() {
        axios.get(API_URL + "keranjangs")
      .then(res => {
        const keranjangs = res.data;
        keranjangs.map(function(item) {
            return axios.delete(API_URL+"keranjangs/"+item.id)
            .then((res) => console.log(res))
            .catch((error) => console.log(error))
        })
      })
      .catch(error => {
        console.log("Error ya", error);
      });
    }

    render() {
        return (
            <div className="mt-4 text-center">
                <Image src="assets/images/success.png" width="500" />
                <h2>Pesanan Sukses</h2>
                <p>Terima kasih Sudah Memesan!</p>
                <Button className="primary" as={Link} to="/">
                    Kembali
                </Button>
            </div>
        )
    }
}

