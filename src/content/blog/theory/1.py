
import pypandoc

pypandoc.convert_text(
    open("langchain.md", encoding="utf-8").read(),
    'pdf',
    format='md',
    outputfile='langchain-agent.pdf',
    extra_args=['--standalone']
)
