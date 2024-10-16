import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ClassList } from './ClassList';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export const SideOverlay = ({classes, show, setShow}) => {
  const [loading, setLoading] = useState(false);
  const handleShow = () => {
    setLoading(true); // Set loading to true when triggered
    setTimeout(() => {
      setShow(true);    // Show the offcanvas
    }, 100);
  };

  const handleHide = () => {
    setShow(false); // Hide the offcanvas
  };

  const handleEntered = () => {
    setLoading(false); // Stop loading after offcanvas is fully visible
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        課程
      </Button>

      {/* Loading Indicator */}
      {loading && (
        <div className="loading-overlay">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      <Offcanvas show={show} onHide={handleHide} onEntered={handleEntered} placement='end' backdrop={false} style={{width: "90%"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>課程</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ClassList classes={classes} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
