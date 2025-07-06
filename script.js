document.addEventListener('DOMContentLoaded', function() {
    
    const performanceCtx = document.getElementById('performanceChart').getContext('2d');
    new Chart(performanceCtx, {
        type: 'bar',
        data: {
            labels: ['Increased Revenue', 'Increased Shareholder Returns', 'S&P 500 Outperformance'],
            datasets: [{
                label: 'Design-Led Companies', data: [32, 56, 211], backgroundColor: '#14B8A6',
                borderColor: '#0F766E', borderWidth: 1, borderRadius: 5
            }, {
                label: 'Industry Peers', data: [16, 28, 100], backgroundColor: '#A7D7C5',
                borderColor: '#82B4A1', borderWidth: 1, borderRadius: 5
            }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed.y !== null) { label += context.parsed.y + '%'; }
                            return label;
                        }
                    }
                }
            },
            scales: { y: { beginAtZero: true, ticks: { callback: value => value + '%' } } }
        }
    });

    const curriculumDisplay = document.getElementById('curriculum-display');
    const bfaBtn = document.getElementById('bfa-btn');
    const bsBtn = document.getElementById('bs-btn');
    const curriculumData = {
        bfa: {
            title: "BFA (Art Dept. Focus)", degreeName: "Bachelor of Fine Arts in Graphic Design",
            foundationalCore: "Drawing, 3D Form, Color Theory, Art History",
            majorCore: "Typography, History of Graphic Design, Studio I & II",
            electives: "Painting, Sculpture, Printmaking, Photography",
            capstone: "Senior Thesis & Gallery Exhibition",
            outcome: "Aesthetic & formal mastery; visual self-expression."
        },
        bs: {
            title: "BS (Business College Focus)", degreeName: "Bachelor of Science in Business (Design Strategy)",
            foundationalCore: "Economics, Accounting, Marketing, Business Comms",
            majorCore: "Design Thinking, Brand Strategy, UX/UI, Data Viz",
            electives: "Business Law, Finance, Org. Behavior, Statistics",
            capstone: "Corporate Partner Project & ROI Analysis",
            outcome: "Strategic problem-solving; data-driven decision making."
        }
    };

    function renderCurriculum(type) {
        const data = curriculumData[type];
        const otherData = curriculumData[type === 'bfa' ? 'bs' : 'bfa'];
        curriculumDisplay.innerHTML = `
            <div class="p-4 bg-gray-50 rounded-lg">
                <h4 class="font-bold text-lg mb-4 text-center">${data.title}</h4>
                <ul class="space-y-3 text-gray-700">
                    <li><strong>Degree:</strong> ${data.degreeName}</li><li><strong>Foundations:</strong> ${data.foundationalCore}</li>
                    <li><strong>Core Design:</strong> ${data.majorCore}</li><li><strong>Electives:</strong> ${data.electives}</li>
                    <li><strong>Capstone:</strong> ${data.capstone}</li>
                    <li class="pt-2 mt-2 border-t border-gray-200"><strong>Primary Outcome:</strong> ${data.outcome}</li>
                </ul>
            </div>
            <div class="hidden md:block p-4 bg-gray-50/50 rounded-lg opacity-60">
                <h4 class="font-bold text-lg mb-4 text-center text-gray-500">${otherData.title}</h4>
                <ul class="space-y-3 text-gray-500">
                    <li><strong>Degree:</strong> ${otherData.degreeName}</li><li><strong>Foundations:</strong> ${otherData.foundationalCore}</li>
                    <li><strong>Core Design:</strong> ${otherData.majorCore}</li><li><strong>Electives:</strong> ${otherData.electives}</li>
                    <li><strong>Capstone:</strong> ${otherData.capstone}</li>
                    <li class="pt-2 mt-2 border-t border-gray-200"><strong>Primary Outcome:</strong> ${otherData.outcome}</li>
                </ul>
            </div>`;
        if(type === 'bs') {
            const firstChild = curriculumDisplay.firstElementChild;
            curriculumDisplay.insertBefore(curriculumDisplay.lastElementChild, firstChild);
        }
    }
    bfaBtn.addEventListener('click', () => { renderCurriculum('bfa'); bfaBtn.classList.add('active'); bsBtn.classList.remove('active'); });
    bsBtn.addEventListener('click', () => { renderCurriculum('bs'); bsBtn.classList.add('active'); bfaBtn.classList.remove('active'); });
    renderCurriculum('bfa');

    const timelineContainer = document.getElementById('timeline-container');
    const timelineData = [
        { year: '1919', title: 'The Bauhaus Founded', content: 'Walter Gropius establishes the Bauhaus in Germany, founded on the principle of uniting art and industrial design. The motto "Art into Industry" makes its commercial purpose explicit.' },
        { year: '1950s', title: 'Paul Rand & IBM', content: 'Paul Rand begins his legendary collaboration with IBM, elevating the role of the designer to corporate strategist and proving that "good design is good business."' },
        { year: '1983', title: 'Saul Bass & AT&T', content: 'Amidst a corporate crisis, Saul Bass is hired to create a new identity for AT&T. His iconic "Globe" logo is a masterful piece of strategic visual communication.' },
        { year: '2000s', title: 'Design Thinking Goes Mainstream', content: 'Elite business schools like Stanford\'s d.school and Harvard Business School formally integrate Design Thinking into their core curricula, teaching its methodologies to future business leaders.' }
    ];
    timelineData.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`;
        timelineItem.innerHTML = `
            <div class="${isLeft ? 'pl-8 md:pl-12' : 'pr-8 md:pr-12'} w-1/2 ${isLeft ? '' : 'text-right'}">
                <div class="p-4 bg-teal-50 rounded-lg shadow-sm cursor-pointer" data-index="${index}">
                    <p class="font-bold text-teal-800">${item.year}: ${item.title}</p>
                    <p class="timeline-content text-sm text-teal-700 mt-2">${item.content}</p>
                </div>
            </div>
            <div class="absolute w-4 h-4 bg-teal-500 rounded-full left-1/2 -translate-x-1/2 border-4 border-white"></div>`;
        timelineContainer.appendChild(timelineItem);
    });
    timelineContainer.addEventListener('click', e => {
        const card = e.target.closest('[data-index]');
        if (card) { card.parentElement.parentElement.classList.toggle('active'); }
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) { link.classList.add('active'); }
                });
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.5 });
    sections.forEach(section => observer.observe(section));

    // --- Gemini API Integration ---
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    async function callGemini(prompt) {
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const result = await response.json();
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
            return result.candidates[0].content.parts[0].text;
        }
        return "Sorry, I couldn't generate a response. Please try again.";
    }

    function setButtonLoadingState(btnId, loaderId, textId, isLoading) {
        document.getElementById(btnId).disabled = isLoading;
        document.getElementById(loaderId).classList.toggle('hidden', !isLoading);
        document.getElementById(textId).classList.toggle('hidden', isLoading);
    }

    // Feature 1: AI Case Study Generator
    const generateCaseStudyBtn = document.getElementById('generate-case-study-btn');
    const caseStudyInput = document.getElementById('case-study-input');
    const caseStudyOutput = document.getElementById('ai-case-study-output');

    generateCaseStudyBtn.addEventListener('click', async () => {
        const problem = caseStudyInput.value.trim();
        if (!problem) {
            caseStudyOutput.innerHTML = `<p class="text-red-500 text-center">Please enter a business problem.</p>`;
            return;
        }

        setButtonLoadingState('generate-case-study-btn', 'case-study-loader', 'case-study-btn-text', true);
        caseStudyOutput.innerHTML = '';

        const prompt = `Generate a short business case study in three paragraphs using the Design Thinking framework for the following problem: "${problem}". The case study should have three distinct sections with these exact titles: "**Problem:**", "**Design Solution:**", and "**Business Result:**". The tone should be professional and concise.`;

        try {
            const responseText = await callGemini(prompt);
            const formattedHtml = responseText
                .replace(/\*\*(.*?):\*\*/g, '<strong class="text-gray-800">$1:</strong>')
                .replace(/\n\n/g, '</p><p class="text-gray-600 mt-2">')
                .replace(/\n/g, '<br>');
            
            caseStudyOutput.innerHTML = `
                <div class="card bg-teal-50 p-6 rounded-xl shadow-sm border border-teal-200">
                    <h4 class="text-xl font-bold mb-2 text-teal-800">Generated Case Study</h4>
                    <p class="text-gray-600 mt-2">${formattedHtml}</p>
                </div>`;
        } catch (error) {
            console.error("Case Study Generation Error:", error);
            caseStudyOutput.innerHTML = `<p class="text-red-500 text-center">An error occurred. Please check the console and try again.</p>`;
        } finally {
            setButtonLoadingState('generate-case-study-btn', 'case-study-loader', 'case-study-btn-text', false);
        }
    });

    // Feature 2: AI Curriculum Advisor
    const generateCurriculumBtn = document.getElementById('generate-curriculum-btn');
    const careerRoleSelect = document.getElementById('career-role-select');
    const curriculumOutput = document.getElementById('ai-curriculum-output');

    generateCurriculumBtn.addEventListener('click', async () => {
        const role = careerRoleSelect.value;
        setButtonLoadingState('generate-curriculum-btn', 'curriculum-loader', 'curriculum-btn-text', true);
        curriculumOutput.innerHTML = '';

        const prompt = `For the career role of a "${role}", generate a list of 8 essential elective courses that blend design and business skills. Present the list in two columns. The first column should be titled "**Core Design Electives**" and have 4 courses. The second column should be titled "**Core Business Electives**" and have 4 courses. For each course, provide a one-sentence description. Do not add any introductory or concluding text, just the two lists.`;

        try {
            const responseText = await callGemini(prompt);
            const formattedHtml = responseText
                .replace(/\*\*(.*?)\*\*/g, '<h4 class="font-bold text-lg mb-2 text-gray-800">$1</h4>')
                .replace(/\n\n/g, '</div><div class="mt-4 md:mt-0">')
                .replace(/\n/g, '</p><p class="text-gray-600 mb-2">');

            curriculumOutput.innerHTML = `
                <div class="p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>${formattedHtml}</div>
                    </div>
                </div>`;
        } catch (error) {
            console.error("Curriculum Generation Error:", error);
            curriculumOutput.innerHTML = `<p class="text-red-500 text-center">An error occurred. Please check the console and try again.</p>`;
        } finally {
            setButtonLoadingState('generate-curriculum-btn', 'curriculum-loader', 'curriculum-btn-text', false);
        }
    });
});
