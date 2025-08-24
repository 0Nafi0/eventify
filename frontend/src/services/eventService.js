const API_BASE_URL = "http://localhost:3001/api";

class EventService {
  // Get upcoming events
  async getUpcomingEvents(params = {}) {
    try {
      const queryParams = new URLSearchParams();

      if (params.category) queryParams.append("category", params.category);
      if (params.search) queryParams.append("search", params.search);
      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.sort) {
        const [field, order] = params.sort.split("-");
        queryParams.append("sortField", field);
        queryParams.append("sortOrder", order);
      }

      const response = await fetch(`${API_BASE_URL}/events?${queryParams}`);
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || "Failed to fetch events");
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get event by ID
  async getEventById(eventId) {
    try {
      const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || "Failed to fetch event");
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Register for an event
  async registerForEvent(eventId) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/events/${eventId}/register`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || "Failed to register for event");
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Unregister from an event
  async unregisterFromEvent(eventId) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/events/${eventId}/register`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(
          data.message || "Failed to unregister from event"
        );
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Get student's registered events
  async getStudentRegisteredEvents(params = {}) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const queryParams = new URLSearchParams();

      if (params.page) queryParams.append("page", params.page);
      if (params.limit) queryParams.append("limit", params.limit);
      if (params.status) queryParams.append("status", params.status);

      const response = await fetch(
        `${API_BASE_URL}/events/student/registered?${queryParams}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(
          data.message || "Failed to fetch registered events"
        );
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Admin: Create a new event
  async createEvent(eventData) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/events/admin`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        // MODIFIED: Include the full data object in the error
        const error = new Error(data.message || "Failed to create event");
        error.response = data; // Attach the full response data to the error object
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Admin: Update an event
  async updateEvent(eventId, eventData) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/events/admin/${eventId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        // MODIFIED: Include the full data object in the error
        const error = new Error(data.message || "Failed to update event");
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Admin: Delete an event (soft delete)
  async deleteEvent(eventId) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/events/admin/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // MODIFIED: Include the full data object in the error
        const error = new Error(data.message || "Failed to delete event");
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Admin: Get events created by the current admin
  async getAdminEvents() {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(`${API_BASE_URL}/events/admin/my-events`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || "Failed to fetch admin events");
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Admin: Get attendees for a specific event
  async getEventAttendees(eventId) {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error("No token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/events/admin/${eventId}/attendees`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(
          data.message || "Failed to fetch event attendees"
        );
        error.response = data;
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Token management
  getToken() {
    return localStorage.getItem("eventify_token");
  }

  // Format date for display
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Format time for display
  formatTime(timeString) {
    return timeString;
  }

  // Get category display name
  getCategoryDisplayName(category) {
    const categoryMap = {
      academic: "Academic",
      social: "Social",
      sports: "Sports",
      cultural: "Cultural",
      technical: "Technical",
      workshop: "Workshop",
      seminar: "Seminar",
      other: "Other",
    };
    return categoryMap[category] || category;
  }

  // Get category color
  getCategoryColor(category) {
    const colorMap = {
      academic: "#007bff",
      social: "#28a745",
      sports: "#ffc107",
      cultural: "#dc3545",
      technical: "#6f42c1",
      workshop: "#fd7e14",
      seminar: "#20c997",
      other: "#6c757d",
    };
    return colorMap[category] || "#6c757d";
  }
}

export default new EventService();
