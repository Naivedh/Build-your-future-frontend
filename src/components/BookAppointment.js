import { useRef, useState } from "react";
import { httpPost } from "../utils/api";

export const BookAppointment = ({ tutorId }) => {

    const closeButtonRef = useRef();

    const [timeSlot, setTimeSlot] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitAppointmentRequest = async () => {
        try {
            if (error) {
                setError(null);
            }
            setIsLoading(true);
            const data = await httpPost('/appointmentapi/appointment', { tutorId, timeSlot });
            closeButtonRef.current.click();
        } catch (err) {
            setError(err);
        }
        setIsLoading(false);
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-secondary m-4"
                data-dismiss="modal"
                data-toggle="modal"
                data-target="#appointmentModal"
            >
                Book appointment
            </button>

            <div className="modal fade" id="appointmentModal" tabindex="-1" role="dialog" aria-labelledby="appointmentModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="appointmentModalLabel">Add Appointment</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-dismiss="modal"
                                aria-label="Close"
                                ref={closeButtonRef}
                            >
                            </button>
                        </div>
                        <div className="modal-body">
                        {error ? <div className="alert alert-danger p-2" role="alert">
                        {error.response?.data?.message || error.message}
                        </div> : null }
                            <div className="form-group">
                                <label htmlFor="starthr">Starting Time</label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    // min="0" max="23"
                                    name="Starting hr"
                                    id="starthr"
                                    placeholder="Please enter appointment start time"
                                    value={timeSlot.startTime}
                                    onChange={(e) => {
                                        setTimeSlot({ ...timeSlot, startTime: e.target.value, start: new Date(e.target.value).getTime() })
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endhr">Ending Time</label>
                                <input
                                    className="form-control"
                                    type="datetime-local"
                                    name="Ending hr"
                                    id="endhr"
                                    placeholder="Please enter appointment end time"
                                    value={timeSlot.endTime}
                                    onChange={(e) =>  {
                                        setTimeSlot({ ...timeSlot, endTime: e.target.value, end: new Date(e.target.value).getTime() })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" disabled={isLoading} data-dismiss="modal">Close</button>
                            <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={submitAppointmentRequest}
                            disabled={isLoading}
                            >
                                
                                {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" /> : 'Save changes'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

