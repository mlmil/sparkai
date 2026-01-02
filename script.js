// GSAP ScrollSmoother setup (assuming GSAP is loaded)
gsap.registerPlugin(ScrollTrigger);

// ScrollSmoother logic removed as the plugin is not loaded. 
// If you have the premium ScrollSmoother.min.js, make sure to include it in index.html and uncomment the code below.
/*
ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    effects: true
});
*/


// Fade-in text animation on scroll
const fadeElements = document.querySelectorAll('.fade-in-text');

fadeElements.forEach(element => {
    gsap.to(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%", // Animation starts when top of element hits 80% of viewport
            toggleClass: "visible",
            once: true // Animation happens only once
        }
    });
});

// Modal Logic
const modal = document.getElementById('infoModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const closeButton = document.querySelector('.close-button');
const listItems = document.querySelectorAll('.industry-list li');

// Content for each industry
const industryContent = {
    'industrial': `
        <ul>
            <li><strong>Equipment maintenance scheduling and alerts</strong> - Tracks preventive maintenance intervals, schedules service windows during downtime, dispatches technicians, logs completed work, predicts failure patterns</li>
            <li><strong>Shift communication and handoff documentation</strong> - Collects end-of-shift reports from operators, compiles handoff notes, flags unresolved issues, ensures continuity between crews</li>
            <li><strong>Safety incident reporting and compliance tracking</strong> - Takes incident reports, logs near-misses, tracks required training certifications, sends expiration alerts, generates OSHA documentation</li>
            <li><strong>Vendor and supplier coordination</strong> - Manages delivery scheduling, confirms material arrivals, tracks purchase orders, handles delays, coordinates with receiving dock</li>
            <li><strong>Work order management and dispatch</strong> - Receives requests from floor supervisors, prioritizes by urgency, assigns to appropriate trades, tracks completion, escalates overdue items</li>
        </ul>`,
    'hvac': `
        <h4>HVAC</h4>
        <ul>
            <li><strong>After-hours emergency call triage</strong> - AI qualifies urgency (no heat in winter vs. minor thermostat issue), dispatches on-call tech or schedules next-day</li>
            <li><strong>Seasonal maintenance reminders</strong> - Automated outreach for filter changes, tune-ups, triggers booking flow</li>
            <li><strong>Warranty lookup</strong> - Customer calls about failed compressor, AI pulls install date, warranty status, schedules covered repair</li>
            <li><strong>Parts availability check</strong> - Tech in field texts system, gets instant inventory status across warehouse and supplier network</li>
            <li><strong>Permit status tracking</strong> - AI monitors city portal, alerts office when inspection ready, auto-schedules with customer</li>
            <li><strong>Energy rebate qualification</strong> - AI walks customer through utility rebate requirements, pre-fills application</li>
        </ul>
        <h4>PLUMBING</h4>
        <ul>
            <li><strong>Emergency severity assessment</strong> - AI determines water main break vs. dripping faucet, prioritizes dispatch accordingly</li>
            <li><strong>Appointment confirmation and prep</strong> - Reminds customer to clear under-sink access, confirm someone 18+ home</li>
            <li><strong>Quote follow-up</strong> - AI contacts customers who received estimates but didn't book, answers objections, schedules work</li>
            <li><strong>Backflow certification reminders</strong> - Tracks annual testing requirements, automates scheduling for commercial accounts</li>
            <li><strong>Water heater age alerts</strong> - Cross-references install records, proactively contacts customers approaching equipment end-of-life</li>
            <li><strong>After-hours drain clearing dispatch</strong> - Takes call, collects address and symptoms, confirms pricing, dispatches tech</li>
        </ul>
        <h4>CONSTRUCTION</h4>
        <ul>
            <li><strong>Subcontractor scheduling coordination</strong> - AI manages multi-trade calendars, resolves conflicts, sends confirmations</li>
            <li><strong>RFI response drafting</strong> - Pulls relevant specs and drawings, drafts initial response for PM review</li>
            <li><strong>Daily log compilation</strong> - Collects voice reports from site supervisors, formats into standardized daily reports</li>
            <li><strong>Material delivery tracking</strong> - Monitors supplier ETAs, alerts site when trucks 30 minutes out</li>
            <li><strong>Change order documentation</strong> - Records scope changes in real-time, calculates cost impact, generates approval requests</li>
            <li><strong>Safety compliance reminders</strong> - Tracks certifications, toolbox talks, sends alerts before expirations</li>
        </ul>`,
    'medical': `
        <h4>MEDICAL</h4>
        <ul>
            <li><strong>Appointment scheduling with insurance verification</strong> - AI books appointment, verifies coverage in real-time, quotes copay</li>
            <li><strong>Prescription refill requests</strong> - Patient calls, AI confirms identity, checks refill eligibility, routes to provider for approval</li>
            <li><strong>Lab result delivery</strong> - AI calls patient with normal results, schedules follow-up for abnormal findings</li>
            <li><strong>Pre-visit intake completion</strong> - Collects symptoms, updates medications, confirms allergies before arrival</li>
            <li><strong>Post-procedure check-ins</strong> - Automated calls 24/48 hours after procedures, escalates concerning symptoms to nurse line</li>
            <li><strong>Referral coordination</strong> - Tracks referral status, confirms specialist received records, helps patient schedule</li>
        </ul>
        <h4>DENTAL</h4>
        <ul>
            <li><strong>Hygiene recall scheduling</strong> - AI contacts patients due for cleaning, offers available times, confirms booking</li>
            <li><strong>Insurance benefits explanation</strong> - Explains remaining annual benefits, suggests treatment timing to maximize coverage</li>
            <li><strong>Treatment plan follow-up</strong> - Contacts patients who received treatment plans but didn't schedule, answers questions</li>
            <li><strong>Emergency triage</strong> - Assesses tooth pain severity, determines same-day need vs. next available appointment</li>
            <li><strong>Post-extraction care</strong> - Automated check-in calls, answers common recovery questions, escalates complications</li>
            <li><strong>New patient onboarding</strong> - Collects insurance info, medical history, sends forms, confirms first appointment</li>
            <li><strong>New Staff Training, Temp Training</strong></li>
        </ul>`,
    'health': `
        <ul>
            <li><strong>Class booking and waitlist management</strong> - AI handles reservations, manages cancellations, fills spots from waitlist automatically</li>
            <li><strong>Membership inquiry conversion</strong> - Answers pricing questions, explains options, books facility tours</li>
            <li><strong>Personal training scheduling</strong> - Coordinates trainer availability with member preferences, handles reschedules</li>
            <li><strong>Billing inquiry resolution</strong> - Explains charges, processes updates to payment methods, handles freeze requests</li>
            <li><strong>Attendance tracking follow-up</strong> - Contacts members who haven't visited in 30 days, offers incentives to return</li>
            <li><strong>Group challenge coordination</strong> - Manages sign-ups, tracks progress, sends daily motivation, announces results</li>
        </ul>`,
    'real-estate': `
        <ul>
            <li><strong>Lead qualification</strong> - AI engages website inquiries, determines timeline, budget, pre-approval status, routes hot leads</li>
            <li><strong>Showing scheduling</strong> - Coordinates buyer availability with listing access, confirms appointments, sends reminders</li>
            <li><strong>Listing inquiry response</strong> - Answers property-specific questions (square footage, HOA fees, school district) instantly</li>
            <li><strong>Open house follow-up</strong> - Contacts attendees within 24 hours, gauges interest level, schedules private showings</li>
            <li><strong>Transaction milestone updates</strong> - Keeps buyers/sellers informed on inspection, appraisal, loan status automatically</li>
            <li><strong>Rental application processing</strong> - Collects applications, runs initial screening criteria, schedules property viewings</li>
        </ul>`,
    'law': `
        <ul>
            <li><strong>Client intake and conflict check</strong> - Collects case details, runs conflict search, schedules consultation if clear</li>
            <li><strong>Document request management</strong> - Sends secure links for document upload, tracks what's received, follows up on missing items</li>
            <li><strong>Appointment reminders with prep instructions</strong> - Confirms meetings, tells clients what to bring, sends directions</li>
            <li><strong>Case status updates</strong> - Clients call anytime, AI provides current status, next steps, upcoming deadlines</li>
            <li><strong>Billing inquiry handling</strong> - Explains invoice line items, provides balance, processes payments, sets up plans</li>
            <li><strong>Court date and deadline tracking</strong> - Monitors calendar, sends advance alerts to attorneys and clients</li>
        </ul>`,
    'auto': `
        <h4>AUTO REPAIR</h4>
        <ul>
            <li><strong>Service appointment scheduling</strong> - AI books based on job type, estimates duration, assigns appropriate tech</li>
            <li><strong>Repair authorization</strong> - Calls customer with diagnostic findings, explains needed work, captures verbal approval</li>
            <li><strong>Vehicle status updates</strong> - Customer texts for update, AI checks job board, responds with current status and ETA</li>
            <li><strong>Parts availability and ETA</strong> - Tracks incoming parts, updates customer on delays, reschedules if needed</li>
            <li><strong>Service reminder outreach</strong> - Monitors mileage-based maintenance intervals, contacts customers when due</li>
            <li><strong>Warranty claim assistance</strong> - Pulls service history, determines warranty coverage, initiates claim process</li>
        </ul>
        <h4>RESTORATION</h4>
        <ul>
            <li><strong>Project milestone updates</strong> - Regular progress reports with photos to owners of long-term restoration projects</li>
            <li><strong>Parts sourcing assistance</strong> - Searches supplier networks for rare parts, alerts when matches found</li>
            <li><strong>Budget tracking communication</strong> - Keeps owners informed as project costs approach or exceed estimates</li>
            <li><strong>Documentation compilation</strong> - Assembles service records, provenance documents, concours judging sheets</li>
            <li><strong>Storage and maintenance scheduling</strong> - Manages periodic start-ups, fluid checks for vehicles in storage</li>
        </ul>`,
    'education': `
        <ul>
            <li><strong>Enrollment inquiry handling</strong> - Answers program questions, explains tuition, schedules campus tours</li>
            <li><strong>Tutor/student matching</strong> - Collects learning needs, matches with appropriate tutor, schedules first session</li>
            <li><strong>Session scheduling and rescheduling</strong> - Manages bookings, handles cancellations, processes late fees</li>
            <li><strong>Progress report delivery</strong> - Compiles session notes, sends regular updates to parents</li>
            <li><strong>Assignment and deadline reminders</strong> - Tracks upcoming tests, project due dates, sends study reminders</li>
            <li><strong>Payment processing and reminders</strong> - Handles tuition payments, sends reminders before due dates, manages payment plans</li>
        </ul>`,
    'wineries': `
        <ul>
            <li><strong>Tasting room reservations</strong> - Books tastings, collects party size and preferences, sends confirmation with directions</li>
            <li><strong>Wine club member management</strong> - Processes shipments, handles address updates, manages hold requests, processes reorders</li>
            <li><strong>Event booking coordination</strong> - Manages private event inquiries, checks availability, sends contracts</li>
            <li><strong>Allocation release notifications</strong> - Alerts club members when new releases available, processes orders</li>
            <li><strong>Post-visit follow-up</strong> - Thanks guests, captures feedback, offers club membership to qualified visitors</li>
            <li><strong>Harvest and release updates</strong> - Sends seasonal communications about vineyard progress, upcoming releases</li>
        </ul>`,
    'music': `
        <ul>
            <li><strong>Lesson scheduling and rescheduling</strong> - Manages instructor availability, handles cancellations, enforces policies</li>
            <li><strong>Practice room booking</strong> - Handles hourly rentals, processes payments, sends access codes</li>
            <li><strong>Instrument rental management</strong> - Tracks rental inventory, processes agreements, schedules returns</li>
            <li><strong>Recital coordination</strong> - Manages registration, collects song selections, sends rehearsal schedules</li>
            <li><strong>Tuition payment processing</strong> - Handles monthly payments, sends reminders, manages makeups for missed lessons</li>
            <li><strong>New student placement</strong> - Assesses skill level, matches with appropriate instructor, schedules trial lesson</li>
        </ul>`,
    'agriculture': `
        <h4>AGRICULTURE</h4>
        <ul>
            <li><strong>Harvest crew scheduling</strong> - Coordinates labor availability with crop readiness, handles day-of confirmations</li>
            <li><strong>Buyer order management</strong> - Takes orders from distributors, confirms quantities, schedules deliveries</li>
            <li><strong>Irrigation system alerts</strong> - Monitors sensors, notifies of failures, dispatches repair crews</li>
            <li><strong>Compliance documentation</strong> - Tracks pesticide applications, worker certifications, generates required reports</li>
            <li><strong>Weather-triggered communications</strong> - Alerts crews to frost conditions, heat events, wind delays</li>
            <li><strong>Equipment maintenance scheduling</strong> - Tracks service intervals, schedules during non-critical periods</li>
        </ul>
        <h4>MARINE</h4>
        <ul>
            <li><strong>Charter booking and confirmation</strong> - Handles trip reservations, collects deposits, sends preparation instructions</li>
            <li><strong>Weather cancellation management</strong> - Monitors conditions, proactively contacts customers, reschedules trips</li>
            <li><strong>Catch reporting automation</strong> - Collects data from captains, formats and submits required regulatory reports</li>
            <li><strong>Slip rental management</strong> - Handles inquiries, availability, contracts, payment processing</li>
            <li><strong>Vessel maintenance tracking</strong> - Monitors service schedules, coordinates haul-outs, tracks compliance</li>
            <li><strong>Crew scheduling and credentials</strong> - Manages certifications, schedules crew, ensures compliance</li>
        </ul>`,
    'retail': `
        <ul>
            <li><strong>Inventory availability inquiries</strong> - Customer calls about specific product, AI checks stock, reserves item</li>
            <li><strong>Order status updates</strong> - Tracks shipments, provides delivery estimates, handles delay communications</li>
            <li><strong>Return and exchange processing</strong> - Initiates returns, generates labels, processes refunds or exchanges</li>
            <li><strong>Product recommendation</strong> - Asks about needs, suggests appropriate products, upsells complementary items</li>
            <li><strong>Loyalty program management</strong> - Tracks points, explains rewards, processes redemptions</li>
            <li><strong>Special order tracking</strong> - Monitors custom orders, updates customers on production and shipping status</li>
        </ul>`,
    'insurance': `
        <ul>
            <li><strong>Quote request intake</strong> - Collects coverage needs, basic info, generates preliminary quotes, schedules agent follow-up</li>
            <li><strong>Policy change processing</strong> - Handles address updates, vehicle additions, coverage adjustments</li>
            <li><strong>Claims first notice of loss</strong> - Collects incident details, submits to carrier, provides claim number and next steps</li>
            <li><strong>Renewal reminders and processing</strong> - Contacts clients before expiration, explains changes, processes renewals</li>
            <li><strong>Certificate of insurance requests</strong> - Generates standard COIs instantly, handles special requirements</li>
            <li><strong>Payment processing and billing inquiries</strong> - Takes payments, explains billing, sets up autopay</li>
        </ul>`,
    'venues': `
        <ul>
            <li><strong>Ticket inquiry and sales</strong> - Answers event questions, processes purchases, handles accessible seating requests</li>
            <li><strong>Event information hotline</strong> - Provides show times, parking info, venue policies, age restrictions</li>
            <li><strong>Group sales coordination</strong> - Handles bulk ticket requests, applies discounts, manages payment</li>
            <li><strong>Artist/promoter load-in coordination</strong> - Schedules arrivals, confirms technical requirements, manages credentials</li>
            <li><strong>Private event booking</strong> - Handles rental inquiries, checks availability, sends contracts, collects deposits</li>
            <li><strong>Post-event feedback collection</strong> - Contacts attendees, captures reviews, addresses complaints</li>
        </ul>`,
    'hospitality': `
        <h4>RESTAURANT</h4>
        <ul>
            <li><strong>Reservation booking and management</strong> - Handles bookings, manages waitlists, sends confirmations and reminders</li>
            <li><strong>Takeout and delivery orders</strong> - Processes orders, quotes wait times, handles modifications</li>
            <li><strong>Large party and event coordination</strong> - Manages private dining inquiries, collects details, sends contracts</li>
            <li><strong>Guest feedback follow-up</strong> - Contacts diners post-visit, addresses issues before they hit review sites</li>
            <li><strong>Waitlist management</strong> - Texts guests when table ready, manages no-shows, fills cancellations</li>
            <li><strong>Gift card sales and balance inquiries</strong> - Processes purchases, checks balances, handles redemptions</li>
        </ul>
        <h4>HOSPITALITY</h4>
        <ul>
            <li><strong>Room reservations and modifications</strong> - Books rooms, handles changes, processes cancellations per policy</li>
            <li><strong>Concierge requests</strong> - Recommends restaurants, books activities, arranges transportation</li>
            <li><strong>Maintenance request routing</strong> - Takes guest reports, dispatches appropriate staff, follows up on resolution</li>
            <li><strong>Checkout and billing inquiries</strong> - Explains charges, processes disputes, handles late checkout requests</li>
            <li><strong>Loyalty program management</strong> - Enrolls members, explains benefits, applies points and rewards</li>
            <li><strong>Pre-arrival communication</strong> - Confirms reservations, collects preferences, upsells amenities</li>
        </ul>`,
    'car-dealerships': `
        <ul>
            <li><strong>Sales inquiry response</strong> - Answers inventory questions, provides pricing, schedules test drives</li>
            <li><strong>Service appointment scheduling</strong> - Books based on service type, estimates duration, arranges loaner if needed</li>
            <li><strong>Vehicle status updates</strong> - Customer texts for update, AI checks service board, responds with current status and ETA</li>
            <li><strong>Trade-in value inquiries</strong> - Collects vehicle details, provides preliminary estimate, schedules appraisal</li>
            <li><strong>Finance application pre-qualification</strong> - Collects basic info, runs soft credit check, prepares customer for F&I</li>
            <li><strong>Post-sale follow-up</strong> - Checks in after purchase, schedules first service, requests reviews</li>
            <li><strong>Recall notification and scheduling</strong> - Identifies affected vehicles, contacts owners, schedules appointments</li>
            <li><strong>Lease-end management</strong> - Contacts customers approaching maturity, explains options, schedules inspections</li>
        </ul>`,
    'municipal-gov': `
        <ul>
            <li><strong>Permit and license status inquiries</strong> - Resident calls about building permit, business license, or inspection, AI pulls status, explains next steps, provides timeline and contact info</li>
            <li><strong>Utility billing and payment processing</strong> - Handles water/sewer/trash bill questions, explains charges, processes payments, sets up autopay, reports service issues</li>
            <li><strong>Public works reporting</strong> - Takes reports for potholes, streetlight outages, missed trash pickup, fallen trees, creates work orders, provides case numbers for tracking</li>
            <li><strong>Parks and recreation registration</strong> - Enrolls residents in classes, sports leagues, camps, books facility rentals, manages waitlists, processes payments</li>
            <li><strong>General information hotline</strong> - Answers questions about meeting schedules, office hours, document requirements, directs callers to correct departments, reduces front desk burden</li>
        </ul>`,
    'non-profit': `
        <ul>
            <li><strong>Donor communication and processing</strong> - Takes donations by phone, sends immediate acknowledgments, answers giving history questions, manages recurring gift updates, schedules major donor calls</li>
            <li><strong>Volunteer coordination</strong> - Handles registration, schedules shifts, sends reminders, tracks hours, manages cancellations, generates verification letters</li>
            <li><strong>Client intake and eligibility screening</strong> - Assesses initial eligibility for services, collects preliminary information, schedules appointments, explains program requirements</li>
            <li><strong>Event and program registration</strong> - Signs up participants for fundraisers, classes, distributions, community events, collects required forms, sends confirmations</li>
            <li><strong>Resource and referral navigation</strong> - Assesses caller needs, provides information on available services, connects to partner agencies, follows up on referral outcomes</li>
        </ul>`,
    'commercial-property': `
        <ul>
            <li><strong>Tenant maintenance requests</strong> - Takes repair reports 24/7, assesses urgency, dispatches appropriate vendors, provides work order tracking, follows up on completion</li>
            <li><strong>Lease inquiry and showing scheduling</strong> - Answers availability questions, provides suite details and pricing, schedules property tours, qualifies prospects, routes hot leads to brokers</li>
            <li><strong>After-hours emergency response</strong> - Handles HVAC failures, water leaks, security issues, elevator outages, dispatches emergency contractors, notifies property managers</li>
            <li><strong>Rent and CAM billing inquiries</strong> - Explains common area maintenance charges, provides payment history, processes payments, sets up ACH, handles late fee disputes</li>
            <li><strong>Vendor and contractor coordination</strong> - Schedules routine maintenance, manages access requests, confirms insurance certificates, coordinates multi-tenant service interruptions</li>
        </ul>`
};

listItems.forEach(item => {
    item.addEventListener('click', () => {
        const industry = item.getAttribute('data-industry');
        const content = industryContent[industry];
        const title = item.textContent;

        if (content) {
            modalTitle.textContent = title;
            modalBody.innerHTML = content;
            modal.style.display = 'flex';
            // slight delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
    });
});

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        modalTitle.textContent = '';
        modalBody.innerHTML = '';
    }, 400); // Match transition duration
}

closeButton.addEventListener('click', closeModal);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Chat Interface Logic
const chatInput = document.getElementById('chat-input');
const sendBtn = document.querySelector('.send-btn');
const chatContent = document.getElementById('chat-content');

if (chatInput && sendBtn && chatContent) {
    function addMessage(text, sender = 'user') {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add(sender === 'user' ? 'user-message' : 'system-message');

        if (sender === 'user') {
            msgDiv.textContent = text;
        } else {
            msgDiv.innerHTML = `
                <div class="msg-avatar">
                    <img src="assets/images/spark_plug_transparent.png" alt="AI Avatar">
                </div>
                <div class="msg-body">
                    <div class="msg-sender">SPARK_AI</div>
                    <div class="msg-text">${text}</div>
                </div>
            `;
        }

        chatContent.appendChild(msgDiv);
        chatContent.scrollTop = chatContent.scrollHeight;
    }

    function handleUserInput() {
        const text = chatInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            chatInput.value = '';

            // Simulate AI response
            setTimeout(() => {
                const responses = [
                    "Directive received. Analyzing parameters...",
                    "Processing request. Optimization algorithms engaged.",
                    "Input acknowledged. Initiating protocol.",
                    "System operational. Awaiting further data."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'ai');
            }, 1000);
        }
    }

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });

    sendBtn.addEventListener('click', handleUserInput);
}
