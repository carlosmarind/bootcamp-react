function Header() {
    return (
        <>
            <header style={{
                backgroundColor: '#888',
                color: 'white',
                padding: '20px',
                borderRadius: '10px 10px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h1 style={{ fontSize: '2em', fontWeight: 'normal', margin: 0 }} >Header</h1>
                <button style={{
                    backgroundColor: '#ffa500',
                    color: 'white',
                    padding: '15px 30px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1.2em',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}>Login</button>
            </header>
        </>
    )
}

export { Header };