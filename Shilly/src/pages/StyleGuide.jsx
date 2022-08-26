import Button from "../components/Button";
import styled from "styled-components";

function StyleGuide() {
    const printSomething = () => console.log("Something");

    const mb = { marginBottom: '20px' }
    const mt = { marginTop: '20px' }

    const m = { margin: '10px' }

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '60px 20px' }}>
            <div className="fs-display">Shilly Styleguide</div>

{/* COLORS */}
            <Section>
                <h2 style={mb}>Colors</h2>
                <h3 style={mb}>Pink Accent</h3>
                <Flexbox>
                    <ColorSwatch color='var(--accent-pink)'></ColorSwatch>
                    <ColorSwatch color='var(--accent-pink-darker)'></ColorSwatch>
                    <ColorSwatch color='var(--accent-pink-lighter)'></ColorSwatch>
                    <ColorSwatch color='var(--accent-pink-a10)'></ColorSwatch>
                </Flexbox>
                
                <h3 style={{...mb, ...mt}}>Base</h3>
                <Flexbox>
                    <ColorSwatch color='var(--base-100)'></ColorSwatch>
                    <ColorSwatch color='var(--base-90)'></ColorSwatch>
                    <ColorSwatch color='var(--base-80)'></ColorSwatch>
                    <ColorSwatch color='var(--base-70)'></ColorSwatch>
                    <ColorSwatch color='var(--base-60)'></ColorSwatch>
                    <ColorSwatch color='var(--base-50)'></ColorSwatch>
                    <ColorSwatch color='var(--base-40)'></ColorSwatch>
                    <ColorSwatch color='var(--base-30)'></ColorSwatch>
                    <ColorSwatch color='var(--base-20)'></ColorSwatch>
                    <ColorSwatch color='var(--base-10)'></ColorSwatch>
                </Flexbox>

                <h3 style={{...mb, ...mt}}>Success</h3>
                <Flexbox>
                <ColorSwatch color='var(--accent-success)'></ColorSwatch>
                <ColorSwatch color='var(--accent-success-darker)'></ColorSwatch>
                <ColorSwatch color='var(--accent-success-lighter)'></ColorSwatch>
                <ColorSwatch color='var(--accent-success-a10)'></ColorSwatch>
                </Flexbox>

                <h3 style={{...mb, ...mt}}>Warning</h3>
                <Flexbox>
                <ColorSwatch color='var(--accent-warning)'></ColorSwatch>
                <ColorSwatch color='var(--accent-warning-darker)'></ColorSwatch>
                <ColorSwatch color='var(--accent-warning-lighter)'></ColorSwatch>
                <ColorSwatch color='var(--accent-warning-a10)'></ColorSwatch>
                </Flexbox>

                <h3 style={{...mb, ...mt}}>Error</h3>
                <Flexbox>
                <ColorSwatch color='var(--accent-error)'></ColorSwatch>
                <ColorSwatch color='var(--accent-error-darker)'></ColorSwatch>
                <ColorSwatch color='var(--accent-error-lighter)'></ColorSwatch>
                <ColorSwatch color='var(--accent-error-a10)'></ColorSwatch>
                </Flexbox>
            </Section>

{/* TYPOGRAPHY */}
            <Section>
                <h2 style={mb}>Typography</h2>
                <div className="fs-display">Display</div>
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <p className="fs-b1" style={mt}>Body 1</p>
                <p className="fs-b2">Body 2</p>
                <p className="fs-b3">Body 3</p>
                <p className="fs-b4">Body 4 (Annotation)</p>
            </Section>

{/* BUTTONS */}
            <Section>
                <h2 style={mb}>Buttons</h2>
                <h3>Big Buttons</h3>
                {/* Adding size='big' is optional. Buttons are big by default */}
                <Button variant='primary' onClick={printSomething} style={m}>Primary</Button>
                <Button variant='secondary' onClick={printSomething} size='big' style={m}>Secondary</Button>
                <Button variant='tertiary' onClick={printSomething} size='big' style={m}>Tertiary</Button>
                <Button variant='destructive' style={m}>Destructive</Button>
                <Button variant='destructive' disabled style={m}>Disabled Destructive</Button>

                <h3 style={{...mb, ...mt}}>Small Buttons</h3>
                {/* Add size='small' */}
                <Button variant='primary' onClick={printSomething} size='small' style={m}>Primary</Button>
                <Button variant='secondary' onClick={printSomething} size='small' style={m}>Secondary</Button>
                <Button variant='tertiary' onClick={printSomething} size='small' style={m}>Tertiary</Button>
                <Button variant='destructive' size='small' style={m}>Destructive</Button>
                <Button variant='destructive' size='small' disabled style={m}>Disabled Destructive</Button>
            </Section>
        </div>
    );
}

const Section = styled.section`
    margin: 60px 0;
`;

const Flexbox = styled.section`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

function ColorSwatch(props) {
    return <div style={{display: 'flex', flexDirection: 'column', fontFamily: 'monospace', margin: '16px', fontSize: '14px'}}>
            <div style={{backgroundColor: props.color, height: '80px', width: '150px', borderRadius: '10px'}}></div>
            {props.color}
        </div>;
}


export default StyleGuide;