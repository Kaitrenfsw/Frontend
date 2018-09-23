import React, { Component } from 'react'




class Modal extends Component{



  render(){

    return (
      <div className="modal fade" id={this.props.modal_id} tabIndex="-1" role="dialog" >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h3>{this.props.modal_content}</h3>
            </div>
            <div className="modal-footer">
              <a   className="gradient-button gradient-button-3 boton_cancelar" data-dismiss="modal"  >Cancelar</a>
              <a   className="gradient-button gradient-button-1 boton_confirmar" data-dismiss="modal" onClick={ (event) => this.props.HandleModalConfirm(event,this.props.action)}>Confirmar</a>
            </div>
          </div>
        </div>
      </div>
      );
    }
}

export default Modal;
