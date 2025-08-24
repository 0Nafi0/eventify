import React, { useState, useEffect } from "react";
import { Modal, Button, ListGroup, Alert, Spinner } from "react-bootstrap";
import { Users } from "lucide-react";
import clubService from "../services/clubService";

function ClubModal({ show, onHide }) {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userClubs, setUserClubs] = useState([]);

  useEffect(() => {
    if (show) {
      fetchClubs();
      fetchUserClubs();
    }
  }, [show]);

  const fetchClubs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await clubService.getAvailableClubs();
      setClubs(response.clubs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserClubs = async () => {
    try {
      const response = await clubService.getUserClubs();
      setUserClubs(response.clubs.map((club) => club._id));
    } catch (error) {
      console.error("Error fetching user clubs:", error);
    }
  };

  const handleJoinClub = async (clubId) => {
    try {
      setLoading(true);
      setError(null);
      await clubService.joinClub(clubId);
      setUserClubs([...userClubs, clubId]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveClub = async (clubId) => {
    try {
      setLoading(true);
      setError(null);
      await clubService.leaveClub(clubId);
      setUserClubs(userClubs.filter((id) => id !== clubId));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Join a Club</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <ListGroup>
            {clubs.map((club) => (
              <ListGroup.Item
                key={club._id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <h6 className="mb-1">{club.name}</h6>
                  <small className="text-muted">
                    <Users size={14} className="me-1" />
                    {club.memberCount} members
                  </small>
                </div>
                <Button
                  variant={
                    userClubs.includes(club._id)
                      ? "outline-danger"
                      : "outline-primary"
                  }
                  size="sm"
                  onClick={() =>
                    userClubs.includes(club._id)
                      ? handleLeaveClub(club._id)
                      : handleJoinClub(club._id)
                  }
                  disabled={loading}
                >
                  {userClubs.includes(club._id) ? "Leave" : "Join"}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ClubModal;
