
export default function ClientRandom() {
    return (
        <div>
                 {(Math.random() * 1000).toFixed(0)} 
        </div>
    );
}